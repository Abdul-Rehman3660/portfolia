'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO, TechStart',
    company: 'TechStart Inc.',
    image: '/testimonials/sarah.jpg',
    content:
      "Dani delivered our MVP in 18 days. We raised $2M seed round 3 weeks after launch. The attention to performance detail was incredible - our Lighthouse scores are all 95+.",
    rating: 5,
    project: 'SaaS MVP',
    metrics: { label: 'Load time', value: '0.8s' },
    videoUrl: '#',
    hasVideo: true,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Founder',
    company: 'AgencyFlow',
    image: '/testimonials/marcus.jpg',
    content:
      "Finally a developer who understands business impact. Our landing page conversion went from 2.1% to 5.7%. Dani doesn't just write code - he thinks about the full funnel.",
    rating: 5,
    project: 'Landing Page',
    metrics: { label: 'Conversion lift', value: '+171%' },
    hasVideo: false,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'CTO',
    company: 'ScaleUp Labs',
    image: '/testimonials/elena.jpg',
    content:
      "We've worked with 12+ agencies. Dani is the first solo developer who outperformed entire teams. Architecture decisions were spot-on, code is maintainable, documentation is gold.",
    rating: 5,
    project: 'Platform Migration',
    metrics: { label: 'Dev velocity', value: '3x faster' },
    hasVideo: true,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Product Lead',
    company: 'CommercePro',
    image: '/testimonials/david.jpg',
    content:
      'The performance audit paid for itself in week 1. Bounce rate dropped 40%, pages per session up 60%. Dani\'s systematic approach to optimization is rare.',
    rating: 5,
    project: 'Performance Audit',
    metrics: { label: 'Revenue impact', value: '+$50K/mo' },
    hasVideo: false,
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setActiveIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return TESTIMONIALS.length - 1
      if (next >= TESTIMONIALS.length) return 0
      return next
    })
  }

  const active = TESTIMONIALS[activeIndex]

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 rounded-full">
            Testimonials
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Client results that speak for themselves
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real feedback from real projects. No fake testimonials.
          </p>
        </div>

        {/* Main testimonial card */}
        <div className="relative mx-auto max-w-4xl">
          <div className="relative h-[400px] overflow-hidden rounded-3xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <div className="flex h-full flex-col md:flex-row">
                  {/* Image side */}
                  <div className="relative w-full bg-gradient-to-br from-gold/20 to-sky/20 p-8 md:w-2/5">
                    <div className="flex h-full flex-col items-center justify-center">
                      <div className="relative">
                        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-xl md:h-32 md:w-32">
                          <div className="flex h-full w-full items-center justify-center bg-secondary text-2xl font-bold">
                            {active.name[0]}
                          </div>
                        </div>
                        {active.hasVideo && (
                          <button
                            onClick={() => setShowVideo(active.id)}
                            className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-lg transition-transform hover:scale-110"
                          >
                            <Play className="h-4 w-4 fill-current" />
                          </button>
                        )}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="font-semibold">{active.name}</p>
                        <p className="text-sm text-muted-foreground">{active.role}</p>
                        <p className="text-xs text-gold">{active.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex flex-1 flex-col justify-center bg-card p-8 md:p-12">
                    <Quote className="h-8 w-8 text-gold/30" />
                    <p className="mt-4 text-lg leading-relaxed text-foreground">
                      &quot;{active.content}&quot;
                    </p>

                    <div className="mt-6 flex items-center gap-1">
                      {Array.from({ length: active.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                      <div className="rounded-lg bg-secondary px-4 py-2">
                        <p className="text-xs text-muted-foreground">Project</p>
                        <p className="text-sm font-medium">{active.project}</p>
                      </div>
                      <div className="rounded-lg bg-gold/10 px-4 py-2">
                        <p className="text-xs text-gold/70">Result</p>
                        <p className="text-sm font-bold text-gold">{active.metrics.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1)
                    setActiveIndex(i)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-8 bg-gold' : 'w-2 bg-border hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0">
          {['TechStart', 'AgencyFlow', 'ScaleUp', 'CommercePro', 'DataSync'].map((company) => (
            <div key={company} className="text-xl font-bold tracking-tight">
              {company}
            </div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setShowVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Video testimonial placeholder - Add your video embed here
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
