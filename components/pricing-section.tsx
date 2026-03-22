'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, ArrowRight, Clock, Zap, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const SERVICES = [
  {
    id: 'landing',
    name: 'Landing Page Sprint',
    description: 'High-converting page in record time',
    price: { standard: 2500, retainer: 2000 },
    timeline: '5-7 days',
    icon: Zap,
    popular: true,
    features: [
      'Conversion-optimized design',
      'Mobile-first responsive',
      'Core Web Vitals 90+',
      'SEO fundamentals',
      'Analytics setup',
      '2 revision rounds',
    ],
    deliverables: ['Figma design', 'Next.js codebase', 'Vercel deployment'],
    guarantee: "If conversion doesn't improve, free optimization",
  },
  {
    id: 'mvp',
    name: 'MVP Development',
    description: 'Full-stack product from scratch',
    price: { standard: 8000, retainer: 6500 },
    timeline: '3-4 weeks',
    icon: Sparkles,
    popular: false,
    features: [
      'Full-stack architecture',
      'Auth & database setup',
      'Payment integration',
      'Admin dashboard',
      'API development',
      'Testing suite',
    ],
    deliverables: ['Production app', 'Documentation', '30-day support'],
    guarantee: 'Ship on time or 20% discount',
  },
  {
    id: 'audit',
    name: 'Performance Audit',
    description: 'Find and fix speed issues',
    price: { standard: 1500, retainer: 1200 },
    timeline: '3-5 days',
    icon: Shield,
    popular: false,
    features: [
      'Lighthouse analysis',
      'Core Web Vitals report',
      'Bundle optimization',
      'Image optimization',
      'Caching strategy',
      'Priority fixes',
    ],
    deliverables: ['Detailed report', 'Fixed codebase', 'Monitoring setup'],
    guarantee: '90+ scores or money back',
  },
]

export function PricingSection() {
  const [isRetainer, setIsRetainer] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="text-center">
          <Badge variant="outline" className="mb-4 rounded-full">
            Investment
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Transparent pricing, no surprises
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Fixed-scope packages with clear deliverables. Choose one-time project or ongoing partnership.
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isRetainer ? 'text-foreground' : 'text-muted-foreground'}`}>
            One-time project
          </span>
          <Switch checked={isRetainer} onCheckedChange={setIsRetainer} />
          <span className={`text-sm font-medium ${isRetainer ? 'text-foreground' : 'text-muted-foreground'}`}>
            Ongoing retainer
          </span>
          {isRetainer && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Save 20%
            </Badge>
          )}
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative rounded-2xl border bg-card p-6 transition-all ${
                service.popular
                  ? 'border-gold/50 shadow-lg lg:scale-105'
                  : 'border-border/50 hover:border-gold/30'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gold text-gold-foreground">Most Popular</Badge>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  service.popular ? 'bg-gold/10' : 'bg-secondary'
                }`}>
                  <service.icon className={`h-5 w-5 ${service.popular ? 'text-gold' : ''}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold">
                    ${isRetainer ? service.price.retainer : service.price.standard}
                  </span>
                  <span className="text-muted-foreground">/project</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {service.timeline}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${
                      service.popular ? 'text-gold' : 'text-muted-foreground'
                    }`} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-secondary/50 p-3">
                <p className="text-xs font-medium text-muted-foreground">Deliverables:</p>
                <p className="mt-1 text-xs">{service.deliverables.join(' • ')}</p>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-gold">
                <Shield className="mt-0.5 h-3 w-3 shrink-0" />
                <span>{service.guarantee}</span>
              </div>

              <Button
                className={`mt-6 w-full rounded-full ${
                  service.popular
                    ? 'bg-foreground text-background hover:bg-foreground/90'
                    : ''
                }`}
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Hover effect */}
              <AnimatePresence>
                {hoveredId === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-gold/5 to-sky/5"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          All projects include source code ownership, documentation, and 30-day support.
          <br />
          Need something custom? <a href="#contact" className="text-gold hover:underline">Let&apos;s talk</a>.
        </p>
      </div>
    </section>
  )
}
