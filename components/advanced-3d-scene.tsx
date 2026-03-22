'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Text, ContactShadows, RoundedBox, Torus, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingText({ text, position, size = 0.3, color = '#ffffff', delay = 0 }: { 
  text: string, 
  position: [number, number, number], 
  size?: number,
  color?: string,
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime + delay
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {text}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.3} metalness={0.8} />
      </Text>
    </Float>
  )
}

function OrbitRing({ position, rotation, scale, color = '#06b6d4' }: {
  position: [number, number, number],
  rotation: [number, number, number],
  scale: number,
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z += 0.002
  })

  return (
    <Torus args={[scale, 0.02, 16, 100]} position={position} rotation={rotation}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.9} />
    </Torus>
  )
}

function FloatingIcon({ position, shape = 'box', color = '#f472b6' }: {
  position: [number, number, number],
  shape?: 'box' | 'sphere' | 'cone',
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.15
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
      {shape === 'box' && (
        <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} metalness={0.7} />
        </RoundedBox>
      )}
      {shape === 'sphere' && (
        <Sphere args={[0.15, 32, 32]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.9} />
        </Sphere>
      )}
      {shape === 'cone' && (
        <mesh>
          <coneGeometry args={[0.2, 0.4, 4]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} metalness={0.8} />
        </mesh>
      )}
    </Float>
  )
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.005
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
      <Sphere args={[0.8, 32, 32]} position={[2.5, 0.5, -1]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} roughness={0.4} metalness={0.6} wireframe />
      </Sphere>
    </Float>
  )
}

function Character() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.02
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#f5d0b0" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 0.7, 32]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      <mesh position={[0.35, 0.7, 0.3]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      <mesh position={[-0.35, 0.7, 0.3]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.3, 0.5]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>
      <mesh position={[-0.9, -0.8, 0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      <mesh position={[0.9, -0.8, 0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.1, 0.5]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.5, 0.02, 0.35]} />
        <meshStandardMaterial color="#1a202c" roughness={0.3} emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.4, 0.35]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.02]} />
        <meshStandardMaterial color="#1a202c" roughness={0.2} emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <pointLight position={[0, 0.3, 0.2]} intensity={2} color="#3b82f6" distance={3} />
      <mesh position={[0, 0.3, -0.5]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.6, -0.5]}>
        <cylinderGeometry args={[0.25, 0.25, 0.5, 32]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
    </group>
  )
}

export function Advanced3DScene() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Prevent hydration mismatch by not rendering Canvas on server
  if (!isClient) {
    return <div className="relative h-[600px] w-full" />
  }

  return (
    <div className="relative h-[600px] w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} className="bg-transparent" dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#fbbf24" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#ec4899" />
        <pointLight position={[0, 3, 2]} intensity={1.5} color="#3b82f6" />
        <Character />
        <FloatingText text="CREATIVE PORTFOLIO" position={[-3, 2.5, 0]} size={0.4} color="#fbbf24" delay={0} />
        <FloatingText text="AI ARCHITECT" position={[-2.5, 1.8, 0.5]} size={0.3} color="#3b82f6" delay={0.5} />
        <FloatingText text="FULL STACK ENGINEER" position={[2.8, 2.2, 0]} size={0.25} color="#10b981" delay={1} />
        <FloatingText text="WEB DEVELOPER" position={[2.5, 1.6, 0.5]} size={0.25} color="#ec4899" delay={1.5} />
        <OrbitRing position={[0, 1, 0]} rotation={[Math.PI / 4, 0, 0]} scale={1.5} color="#06b6d4" />
        <OrbitRing position={[0, 1.2, 0]} rotation={[Math.PI / 3, Math.PI / 6, 0]} scale={2} color="#8b5cf6" />
        <FloatingIcon position={[-2, 0.5, 1]} shape="box" color="#f472b6" />
        <FloatingIcon position={[2.5, 0.8, 1]} shape="sphere" color="#3b82f6" />
        <FloatingIcon position={[-1.5, 1.2, -1]} shape="cone" color="#10b981" />
        <FloatingIcon position={[1.8, 1.5, -1]} shape="box" color="#fbbf24" />
        <Globe />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={3} far={5} />
        <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 pointer-events-none">
        {isHovered ? 'DRAG TO ROTATE' : ''}
      </div>
      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent" />
      </div>
    </div>
  )
}
