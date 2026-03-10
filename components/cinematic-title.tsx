'use client'

import { motion } from 'framer-motion'

export function CinematicTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
    >
      <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-foreground via-gold/80 to-foreground bg-clip-text text-transparent drop-shadow-lg">
        Best Portfolio Ever
      </h1>
    </motion.div>
  )
}
