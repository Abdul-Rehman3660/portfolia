'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { TechStackBubbles } from './tech-stack-bubbles'

export function ContactCinematic() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 opacity-30">
        <TechStackBubbles />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/85 to-background" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4 rounded-full border-gold/40 bg-gold/5 text-xs text-gold">
            Get in touch
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start a conversation
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
            Share your goals and timeline — I typically reply within one business day.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 md:grid-cols-3"
        >
          {/* Email */}
          <motion.div
            whileHover={prefersReduced ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="group rounded-2xl border border-border/50 bg-card/60 p-8 shadow-sm backdrop-blur-sm transition-colors hover:border-gold/40 hover:shadow-md hover:shadow-gold/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
              <Mail className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Email</h3>
            <p className="mt-2 text-muted-foreground">abdulrehmanabd3660@gmail.com</p>
            <a href="mailto:abdulrehmanabd3660@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">
              Send Email
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div
            whileHover={prefersReduced ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="group rounded-2xl border border-border/50 bg-card/60 p-8 shadow-sm backdrop-blur-sm transition-colors hover:border-gold/40 hover:shadow-md hover:shadow-gold/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
              <Phone className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Phone</h3>
            <p className="mt-2 text-muted-foreground">+92 303 2972477</p>
            <a href="tel:+923032972477" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">
              Call Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            whileHover={prefersReduced ? undefined : { y: -4 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="group rounded-2xl border border-border/50 bg-card/60 p-8 shadow-sm backdrop-blur-sm transition-colors hover:border-gold/40 hover:shadow-md hover:shadow-gold/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 transition-colors group-hover:bg-gold/20">
              <MapPin className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Location</h3>
            <p className="mt-2 text-muted-foreground">Vehari, Session Court</p>
            <a href="https://maps.google.com/?q=Session+Court,Vehari" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">
              Get Directions
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <Button asChild size="lg" className="rounded-full px-8">
            <a href="mailto:abdulrehmanabd3660@gmail.com?subject=Project%20inquiry">
              Schedule a call
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
