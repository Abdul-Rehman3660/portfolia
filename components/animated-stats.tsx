'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { TrendingUp, Zap, Users, Award } from 'lucide-react'

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, { duration: 2000, bounce: 0 })
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString() + suffix)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [isInView, value, spring, hasAnimated])

  return <motion.span ref={ref}>{display}</motion.span>
}

const STATS = [
  {
    icon: Zap,
    value: 24,
    suffix: '+',
    label: 'Projects Shipped',
    description: 'From MVPs to enterprise platforms',
    trend: '+40% YoY',
  },
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Founders, agencies, and startups',
    trend: '100% retention',
  },
  {
    icon: TrendingUp,
    value: 10,
    suffix: 'M+',
    label: 'Revenue Generated',
    description: 'For clients through better UX',
    trend: 'Trackable ROI',
  },
  {
    icon: Award,
    value: 99,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Based on post-project surveys',
    trend: '5.0/5.0 rating',
  },
]

export function AnimatedStats() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-sky/5" />

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-gold/30 hover:shadow-lg"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 transition-transform group-hover:scale-110">
                <stat.icon className="h-6 w-6 text-gold" />
              </div>

              <div className="mt-4">
                <p className="font-serif text-4xl font-bold tracking-tight">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 font-medium">{stat.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
              </div>

              <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </div>

              {/* Decorative corner */}
              <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden rounded-tr-2xl">
                <div className="absolute -right-8 -top-8 h-16 w-16 rotate-45 bg-gradient-to-br from-gold/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
