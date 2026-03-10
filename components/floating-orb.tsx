'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.5
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.z = time * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <MeshDistortMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

export function FloatingOrbScene() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="absolute top-20 right-10 w-32 h-32" />
  }

  return (
    <div className="absolute top-20 right-10 w-32 h-32 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ec4899" />
        <FloatingOrb />
      </Canvas>
    </div>
  )
}
