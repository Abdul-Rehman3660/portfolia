'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function CharacterModel() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#f5d0b0" roughness={0.5} />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.8, 32]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      
      {/* Desk */}
      <mesh position={[0, -0.5, -0.5]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>
      
      {/* Monitor */}
      <mesh position={[0, 0.2, -0.8]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#1a202c" roughness={0.3} emissive="#ec4899" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Monitor glow */}
      <pointLight position={[0, 0.3, -0.6]} intensity={2} color="#ec4899" distance={3} />
    </group>
  )
}

export function CharacterScene() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative h-[400px] w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 1, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#fbbf24" />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ec4899" />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <CharacterModel />
        </Float>
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={3} far={5} />
      </Canvas>
      <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent" />
      </div>
    </div>
  )
}
