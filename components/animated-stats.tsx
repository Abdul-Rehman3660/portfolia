'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── HONEST STATS — update as you grow ───────────────────
const STATS = [
  {
    value: 3,
    display: '3',
    label: 'AI chatbots built',
    sub: 'RAG-based, production deployed',
  },
  {
    value: 95,
    display: '95%+',
    label: 'Answer accuracy',
    sub: 'On domain-specific documents',
  },
  {
    value: 14,
    display: '2–4 wks',
    label: 'Delivery time',
    sub: 'Kickoff to deployed chatbot',
  },
  {
    value: 100,
    display: '100%',
    label: 'Code ownership',
    sub: 'Full repo handoff, no lock-in',
  },
]

function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group text-center px-4"
    >
      <div className="font-serif text-4xl font-bold text-foreground lg:text-5xl tabular-nums">
        {stat.display}
      </div>
      <div className="mt-2 text-sm font-semibold text-foreground">{stat.label}</div>
      <div className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{stat.sub}</div>
    </motion.div>
  )
}

export function AnimatedStats() {
  return (
    <section className="border-y border-border bg-secondary/30 py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
          {STATS.map((s, i) => (
            <div key={s.label} className="py-8 first:pl-0 lg:py-0">
              <StatCard stat={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
