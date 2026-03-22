'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

type Variant = 'hero' | 'section' | 'card'

interface TextRevealCinematicProps {
  text: string
  variant?: Variant
  className?: string
  /** Whether to draw a gold underline after words appear */
  underline?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const CONFIG: Record<Variant, { duration: number; stagger: number; fontSize: string }> = {
  hero:    { duration: 0.70, stagger: 0.045, fontSize: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl' },
  section: { duration: 0.55, stagger: 0.035, fontSize: 'text-3xl sm:text-4xl' },
  card:    { duration: 0.30, stagger: 0.025, fontSize: 'text-lg sm:text-xl' },
}

export function TextRevealCinematic({
  text,
  variant = 'section',
  className = '',
  underline = false,
  as: Tag = 'h2',
}: TextRevealCinematicProps) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [underlineVisible, setUnderlineVisible] = useState(false)
  const prefersReduced = useReducedMotion()
  const cfg = CONFIG[variant]

  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced) { setInView(true); return }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [prefersReduced])

  useEffect(() => {
    if (!inView || !underline) return
    const totalTime = (words.length * cfg.stagger + cfg.duration) * 1000
    const t = setTimeout(() => setUnderlineVisible(true), totalTime)
    return () => clearTimeout(t)
  }, [inView, underline, words.length, cfg])

  const wordVariants = {
    hidden: { y: '110%', opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: cfg.duration, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <Tag
      ref={ref as any}
      className={`font-serif font-bold tracking-tight text-foreground ${cfg.fontSize} ${className}`}
    >
      <span className="relative inline-block w-full">
        <span className="flex flex-wrap gap-x-[0.3em] gap-y-1">
          {words.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block"
                variants={wordVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: i * cfg.stagger }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>

        {underline && (
          <span className="absolute -bottom-2 left-0 w-full h-[3px] overflow-hidden">
            <motion.span
              className="block h-full origin-left"
              style={{ backgroundColor: 'var(--gold, #D4AF37)' } as any}
              initial={{ scaleX: 0 }}
              animate={underlineVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        )}
      </span>
    </Tag>
  )
}
