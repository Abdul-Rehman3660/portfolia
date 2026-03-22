'use client'

import { useEffect, useState, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useTransform,
} from 'framer-motion'

interface NavItem {
  id: string
  label: string
}

interface ScrollProgressCinematicProps {
  navItems: NavItem[]
}

export function ScrollProgressCinematic({ navItems }: ScrollProgressCinematicProps) {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState(navItems[0]?.id ?? '')
  const [completed, setCompleted] = useState(false)
  const prefersReduced = useReducedMotion()

  const rawProgress = useMotionValue(0)
  const progress = useSpring(rawProgress, { stiffness: 80, damping: 20 })
  const dotTop = useTransform(rawProgress, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? scrollTop / docHeight : 0
      rawProgress.set(pct)
      if (pct >= 0.98 && !completed) setCompleted(true)
      if (pct < 0.98) setCompleted(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mounted, rawProgress, completed])

  useEffect(() => {
    if (!mounted) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    )

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [mounted, navItems])

  if (!mounted || prefersReduced) return null

  return (
    <div
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex xl:flex-col xl:items-center xl:gap-0"
      role="navigation"
      aria-label="Page progress"
    >
      {/* Track line */}
      <div className="relative w-px h-[280px] bg-border/30 rounded-full overflow-hidden">
        {/* Filled progress line */}
        <motion.div
          className="absolute top-0 left-0 w-full origin-top rounded-full"
          style={{
            scaleY: progress,
            height: '100%',
            backgroundColor: 'var(--gold, #D4AF37)',
            boxShadow: '0 0 8px 1px var(--gold, #D4AF37)',
          } as any}
        />

        {/* Dot traveller */}
        <motion.div
          className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-background shadow-[0_0_12px_2px_var(--gold,#D4AF37)]"
          style={{ top: dotTop }}
        />
      </div>

      {/* Section labels */}
      <div className="absolute left-5 top-0 h-full flex flex-col justify-between py-1 pointer-events-none">
        {navItems.map(({ id, label }) => (
          <motion.a
            key={id}
            href={`#${id}`}
            className="text-[10px] font-mono uppercase tracking-widest cursor-pointer pointer-events-auto"
            animate={{
              opacity: activeSection === id ? 0.9 : 0.25,
              x: activeSection === id ? 2 : 0,
              color: activeSection === id ? 'var(--gold, #D4AF37)' : 'var(--muted-foreground)',
            }}
            transition={{ duration: 0.35 }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      {/* Completion pulse */}
      {completed && (
        <motion.div
          className="mt-3 w-2 h-2 rounded-full bg-gold"
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: 3 }}
        />
      )}
    </div>
  )
}
