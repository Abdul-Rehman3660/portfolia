'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    number: '01',
    title: 'SaaS Dashboard',
    description: 'Real-time analytics platform',
    image: '/Gemini_Generated_Image_113jyb113jyb113j.png',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    number: '02',
    title: 'E-commerce Platform',
    description: 'Headless commerce solution',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    tags: ['React', 'Shopify', 'Tailwind'],
  },
  {
    number: '03',
    title: 'AI Chat Application',
    description: 'Conversational AI interface',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
    tags: ['Python', 'TensorFlow', 'WebSocket'],
  },
]

export function WorkSection() {
  return (
    <section id="work" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Badge variant="outline" className="mb-4 rounded-full border-gold/50 text-gold">
            Portfolio
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            My Work
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Selected projects that showcase my skills and expertise
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative"
            >
              <span className="text-6xl font-bold text-gold/20 font-mono">
                {project.number}
              </span>

              <div className="mt-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">
                  View Project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
