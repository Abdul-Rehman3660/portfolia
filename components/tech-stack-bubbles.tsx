'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const TECH_STACK = [
  // AI & LLM (Top Center - Premium)
  { name: 'LLM Integration', color: '#F59E0B', position: [0, 4, 0] as [number, number, number] },
  { name: 'RAG Chatbot', color: '#8B5CF6', position: [-3, 3.5, 1] as [number, number, number] },
  { name: 'Agentic Model', color: '#EC4899', position: [3, 3.5, 1] as [number, number, number] },
  { name: 'Vector Database', color: '#10B981', position: [0, 3, -1] as [number, number, number] },

  // Languages (Upper Middle)
  { name: 'Python', color: '#3776AB', position: [-2, 2, -1] as [number, number, number] },
  { name: 'SQL', color: '#003B57', position: [2, 2, -1] as [number, number, number] },
  { name: 'TypeScript', color: '#3178C6', position: [0, 2.5, 0.5] as [number, number, number] },
  { name: 'JavaScript', color: '#F7DF1E', position: [-1, 2.3, 0.5] as [number, number, number] },

  // Frontend (Left Side)
  { name: 'React', color: '#61DAFB', position: [-3, 1, 0] as [number, number, number] },
  { name: 'Next.js', color: '#000000', position: [-4, 1.5, 0.3] as [number, number, number] },
  { name: 'HTML5', color: '#E34F26', position: [-4, 0.5, 0.5] as [number, number, number] },
  { name: 'CSS3', color: '#1572B6', position: [-4, -0.5, 0.5] as [number, number, number] },
  { name: 'Tailwind CSS', color: '#06B6D4', position: [-3, -1, 0] as [number, number, number] },
  { name: 'Bootstrap', color: '#7952B3', position: [-4, -1.5, 0.5] as [number, number, number] },
  { name: 'Three.js', color: '#000000', position: [-4.5, 0, 0.8] as [number, number, number] },
  { name: 'Framer Motion', color: '#0055FF', position: [-4.5, -0.8, 0.8] as [number, number, number] },

  // Backend (Right Side)
  { name: 'FastAPI', color: '#009688', position: [3, 1, 0] as [number, number, number] },
  { name: 'NestJS', color: '#E0234E', position: [4, 0.5, 0.5] as [number, number, number] },
  { name: 'Node.js', color: '#339933', position: [4, 1.5, 0.3] as [number, number, number] },
  { name: 'Express', color: '#000000', position: [4.5, 0.8, 0.8] as [number, number, number] },

  // Databases (Bottom Middle)
  { name: 'PostgreSQL', color: '#4169E1', position: [-2, -2, 0] as [number, number, number] },
  { name: 'MongoDB', color: '#47A248', position: [2, -2, 0] as [number, number, number] },
  { name: 'Supabase', color: '#3ECF8E', position: [0, -2.5, 0.5] as [number, number, number] },
  { name: 'Redis', color: '#DC382D', position: [-1, -3, 0.3] as [number, number, number] },

  // APIs (Middle)
  { name: 'REST APIs', color: '#0091EA', position: [-1, 0, -1] as [number, number, number] },
  { name: 'GraphQL', color: '#E535AB', position: [1, 0, -1] as [number, number, number] },

  // Auth & Payment (Lower)
  { name: 'JWT', color: '#000000', position: [-1, -2.5, 0.5] as [number, number, number] },
  { name: 'OAuth', color: '#4285F4', position: [1, -2.5, 0.5] as [number, number, number] },
  { name: 'Stripe API', color: '#635BFF', position: [0, -3, 0] as [number, number, number] },

  // Tools & Other (Outer Ring)
  { name: 'Git', color: '#F05032', position: [-3.5, 2, -0.5] as [number, number, number] },
  { name: 'GitHub', color: '#181717', position: [3.5, 2, -0.5] as [number, number, number] },
  { name: 'Postman', color: '#FF6C37', position: [-3.5, -2, -0.5] as [number, number, number] },
  { name: 'SEO', color: '#FACC15', position: [3.5, -2, -0.5] as [number, number, number] },
  { name: 'E-Commerce', color: '#10B981', position: [0, 1.5, 1.5] as [number, number, number] },
  { name: 'Vercel', color: '#000000', position: [4.5, -0.5, 0.5] as [number, number, number] },
  { name: 'Docker', color: '#2496ED', position: [4.5, -1.3, 0.5] as [number, number, number] },
  { name: 'AWS', color: '#FF9900', position: [4.5, 2, 0.5] as [number, number, number] },
  { name: 'Figma', color: '#F24E1E', position: [-4.5, 2, 0.5] as [number, number, number] },
]

interface BubbleProps {
  tech: typeof TECH_STACK[0]
  index: number
}

function Bubble({ tech, index }: BubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    meshRef.current.position.y = tech.position[1] + Math.sin(time * 0.8 + offset) * 0.3
    meshRef.current.position.x = tech.position[0] + Math.cos(time * 0.5 + offset) * 0.2
    meshRef.current.position.z = tech.position[2] + Math.sin(time * 0.6 + offset) * 0.2
    meshRef.current.rotation.y = Math.sin(time * 0.3 + offset) * 0.3
    meshRef.current.rotation.x = Math.cos(time * 0.2 + offset) * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={tech.position}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        <Text
          position={[0, 0, 0.7]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {tech.name}
        </Text>
      </mesh>
    </Float>
  )
}

function TechStackScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      {TECH_STACK.map((tech, index) => (
        <Bubble key={tech.name} tech={tech} index={index} />
      ))}
      <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={20} blur={2} far={4} />
    </>
  )
}

export function TechStackBubbles() {
  return (
    <div className="relative h-[500px] w-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <TechStackScene />
      </Canvas>
    </div>
  )
}
