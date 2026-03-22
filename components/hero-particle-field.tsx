'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 800
const GOLD_FRACTION = 0.05
const CONNECTION_DISTANCE = 1.8
const REPEL_RADIUS = 1.2
const REPEL_STRENGTH = 0.06
const FIELD_SIZE = 10
const FLOAT_SPEED = 0.008

interface MouseState {
  x: number
  y: number
  active: boolean
}

function ParticleSystem({ mouse }: { mouse: React.MutableRefObject<MouseState> }) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const { viewport } = useThree()

  const { positions, velocities, isGold, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    const gold = new Uint8Array(PARTICLE_COUNT)
    const col = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * FIELD_SIZE
      pos[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SIZE
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3

      vel[i * 3]     = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = Math.random() * FLOAT_SPEED + 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001

      const isGoldParticle = Math.random() < GOLD_FRACTION
      gold[i] = isGoldParticle ? 1 : 0

      if (isGoldParticle) {
        col[i * 3] = 0.83; col[i * 3 + 1] = 0.69; col[i * 3 + 2] = 0.22
      } else {
        const v = 0.55 + Math.random() * 0.15
        col[i * 3] = v; col[i * 3 + 1] = v; col[i * 3 + 2] = v
      }
    }
    return { positions: pos, velocities: vel, isGold: gold, colors: col }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors.slice(), 3))
    return geo
  }, [positions, colors])

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), [])

  const time = useRef(0)
  const rotationY = useRef(0)

  useFrame((_, delta) => {
    if (!pointsRef.current || !linesRef.current) return
    time.current += delta

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const colAttr = pointsRef.current.geometry.attributes.color as THREE.BufferAttribute
    const posArr = posAttr.array as Float32Array
    const colArr = colAttr.array as Float32Array

    // Rotate entire field slowly (360° over 60s)
    rotationY.current += delta * (Math.PI * 2 / 60)
    pointsRef.current.rotation.y = rotationY.current
    linesRef.current.rotation.y = rotationY.current

    // Mouse position in world space
    const mx = mouse.current.active ? (mouse.current.x / window.innerWidth - 0.5) * viewport.width * 1.2 : 9999
    const my = mouse.current.active ? -(mouse.current.y / window.innerHeight - 0.5) * viewport.height * 1.2 : 9999

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2

      // Float upward
      posArr[ix]     += velocities[ix]
      posArr[iy]     += velocities[iy]
      posArr[iz]     += velocities[iz]

      // Loop particles that drift off screen
      if (posArr[iy] > FIELD_SIZE / 2) {
        posArr[iy] = -FIELD_SIZE / 2
        posArr[ix] = (Math.random() - 0.5) * FIELD_SIZE
      }
      if (posArr[ix] > FIELD_SIZE / 2) posArr[ix] = -FIELD_SIZE / 2
      if (posArr[ix] < -FIELD_SIZE / 2) posArr[ix] = FIELD_SIZE / 2

      // Mouse repel
      const dx = posArr[ix] - mx
      const dy = posArr[iy] - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < REPEL_RADIUS && dist > 0.001) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
        posArr[ix] += (dx / dist) * force
        posArr[iy] += (dy / dist) * force
      }

      // Pulse gold particles
      if (isGold[i]) {
        const pulse = 0.75 + Math.sin(time.current * 2.5 + i) * 0.25
        colArr[ix] = 0.83 * pulse
        colArr[iy] = 0.69 * pulse
        colArr[iz] = 0.22 * pulse
      }
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true

    // Draw connection lines between nearby particles (sample subset for perf)
    const lineVerts: number[] = []
    const lineColors: number[] = []
    const SAMPLE = 200
    for (let i = 0; i < SAMPLE; i++) {
      const a = Math.floor(Math.random() * PARTICLE_COUNT)
      for (let j = i + 1; j < Math.min(i + 8, SAMPLE); j++) {
        const b = Math.floor(Math.random() * PARTICLE_COUNT)
        const ax = posArr[a * 3], ay = posArr[a * 3 + 1], az = posArr[a * 3 + 2]
        const bx = posArr[b * 3], by = posArr[b * 3 + 1], bz = posArr[b * 3 + 2]
        const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2)
        if (d < CONNECTION_DISTANCE) {
          const alpha = (1 - d / CONNECTION_DISTANCE) * 0.4
          lineVerts.push(ax, ay, az, bx, by, bz)
          lineColors.push(alpha, alpha, alpha, alpha, alpha, alpha)
        }
      }
    }

    if (lineVerts.length > 0) {
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3))
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3))
      lineGeometry.attributes.position.needsUpdate = true
    }
  })

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    depthWrite: false,
  }), [])

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  return (
    <>
      <points ref={pointsRef} geometry={geometry} material={material} />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </>
  )
}

export function HeroParticleField() {
  const [mounted, setMounted] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)
  const mouse = useRef<MouseState>({ x: 0, y: 0, active: false })

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onLeave = () => { mouse.current.active = false }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (!mounted || prefersReduced) return null

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 65 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="bg-transparent"
      >
        <ParticleSystem mouse={mouse} />
      </Canvas>
    </div>
  )
}
