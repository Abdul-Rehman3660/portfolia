'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
}

export function MagneticButton({
  children,
  className = '',
  strength = 12,
  radius = 80,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  const rotXSpring = useSpring(rotateX, { stiffness: 300, damping: 25 })
  const rotYSpring = useSpring(rotateY, { stiffness: 300, damping: 25 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || shouldReduceMotion) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < radius) {
      const pull = (1 - dist / radius)
      x.set(dx * pull * (strength / 80))
      y.set(dy * pull * (strength / 80))
      rotateX.set(-(dy / rect.height) * 15)
      rotateY.set((dx / rect.width) * 15)
    } else {
      x.set(0)
      y.set(0)
      rotateX.set(0)
      rotateY.set(0)
    }
  }, [x, y, rotateX, rotateY, radius, strength, shouldReduceMotion])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }, [x, y, rotateX, rotateY])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return

    const parent = el.closest('section') ?? document
    ;(parent as HTMLElement).addEventListener('mousemove', handleMouseMove as EventListener)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      ;(parent as HTMLElement).removeEventListener('mousemove', handleMouseMove as EventListener)
      el?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mounted, handleMouseMove, handleMouseLeave])

  if (!mounted || shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        x: xSpring,
        y: ySpring,
        rotateX: rotXSpring,
        rotateY: rotYSpring,
        perspective: 600,
      } as any}
      whileTap={{
        scale: [1, 0.92, 1.08, 1],
        transition: { duration: 0.35, times: [0, 0.2, 0.6, 1], type: 'spring', stiffness: 400 }
      }}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  )
}
