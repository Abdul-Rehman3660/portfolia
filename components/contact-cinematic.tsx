'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { TechStackBubbles } from './tech-stack-bubbles'

export function ContactCinematic() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 opacity-30">
        <TechStackBubbles />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4 rounded-full border-gold/50 text-gold">
            Get In Touch
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            CONTACT
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Let's build something amazing together
          </p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {/* Email */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="group rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10"
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
            whileHover={{ y: -5, scale: 1.02 }}
            className="group rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10"
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
            whileHover={{ y: -5, scale: 1.02 }}
            className="group rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="rounded-full bg-foreground text-background px-8 hover:bg-foreground/90"
          >
            Schedule a Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
