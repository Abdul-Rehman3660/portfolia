'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

interface Service {
  title: string
  timeline: string
  idealFor: string
  popular: boolean
  outcomes: string[]
  includes: string[]
}

interface FloatingServiceCardsProps {
  services: Service[]
}

// Each card gets a unique float: amplitude 4–12px, period 3–6s, phase offset
const FLOAT_CONFIGS = [
  { amplitude: 8,  period: 4.2, phase: 0.0 },
  { amplitude: 12, period: 3.4, phase: 1.1 },
  { amplitude: 6,  period: 5.6, phase: 2.3 },
  { amplitude: 10, period: 4.8, phase: 0.7 },
  { amplitude: 7,  period: 3.9, phase: 1.8 },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const prefersReduced = useReducedMotion()
  const fc = FLOAT_CONFIGS[index % FLOAT_CONFIGS.length]

  const floatAnimation = prefersReduced ? {} : {
    y: [`${-fc.amplitude / 2}px`, `${fc.amplitude / 2}px`, `${-fc.amplitude / 2}px`],
    transition: {
      duration: fc.period,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: fc.phase,
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.1,
        duration: 0.65,
        type: 'spring',
        stiffness: 80,
        damping: 14,
      }}
    >
      <motion.div
        animate={floatAnimation}
        whileHover={prefersReduced ? {} : {
          y: -16,
          scale: 1.02,
          rotateX: 3,
          rotateY: -3,
          transition: { type: 'spring', stiffness: 260, damping: 20 },
        }}
        className={`
          relative rounded-2xl border p-6 h-full cursor-default
          backdrop-blur-xl bg-card/60
          transition-shadow duration-500
          ${service.popular
            ? 'border-gold/40 shadow-[0_0_40px_-8px_rgba(212,175,55,0.2)]'
            : 'border-border/50'
          }
          hover:shadow-[0_20px_60px_-12px_rgba(212,175,55,0.15)]
        `}
        style={{ perspective: 800, transformStyle: 'preserve-3d' } as any}
      >
        {/* Popular badge with breathing pulse */}
        {service.popular && (
          <motion.div
            className="absolute -top-3 left-5"
            animate={prefersReduced ? {} : {
              scale: [1, 1.06, 1],
              transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Badge className="bg-gold text-black text-xs font-semibold px-3 py-0.5 shadow-lg shadow-gold/30">
              Most Popular
            </Badge>
          </motion.div>
        )}

        {/* Title + timeline */}
        <div className="mb-4 mt-2">
          <h3 className="font-serif text-lg font-bold text-foreground tracking-tight">{service.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground font-mono">⏱ {service.timeline}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.idealFor}</p>

        {/* Outcomes */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gold/80 mb-2">Outcomes</p>
          <ul className="space-y-1.5">
            {service.outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="h-3.5 w-3.5 shrink-0 text-gold mt-0.5" />
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* Includes */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2">Includes</p>
          <ul className="space-y-1">
            {service.includes.map((inc, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-gold/50 shrink-0" />
                {inc}
              </li>
            ))}
          </ul>
        </div>

        {/* Gold border glow on hover (via box-shadow handled in className) */}
        {service.popular && (
          <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/20 pointer-events-none" />
        )}
      </motion.div>
    </motion.div>
  )
}

export function FloatingServiceCards({ services }: FloatingServiceCardsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <ServiceCard key={service.title} service={service} index={i} />
      ))}
    </div>
  )
}
