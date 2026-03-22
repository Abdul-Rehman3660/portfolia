'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const PROJECTS = [
  {
    id: 1,
    title: 'AI Dashboard Platform',
    category: 'SaaS',
    description: 'Real-time analytics dashboard processing 10M+ events daily',
    image: '/projects/dashboard.jpg',
    color: '#d4af37',
    stats: { users: '50K+', uptime: '99.9%', loadTime: '0.4s' },
    tech: ['Next.js', 'PostgreSQL', 'Redis', 'WebSocket'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'E-commerce Conversion Engine',
    category: 'E-commerce',
    description: 'Headless commerce solution with 40% conversion lift',
    image: '/projects/ecommerce.jpg',
    color: '#60a5fa',
    stats: { revenue: '+$2M', conversion: '+40%', aov: '+25%' },
    tech: ['Next.js', 'Shopify', 'Tailwind', 'Vercel'],
    link: '#',
    github: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Agency Portal System',
    category: 'Internal Tools',
    description: 'Client management platform saving 20hrs/week',
    image: '/projects/portal.jpg',
    color: '#a78bfa',
    stats: { efficiency: '+300%', clients: '150+', satisfaction: '98%' },
    tech: ['React', 'Node.js', 'MongoDB', 'Docker'],
    link: '#',
    github: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Performance Audit Tool',
    category: 'DevTools',
    description: 'Automated web performance monitoring suite',
    image: '/projects/audit.jpg',
    color: '#34d399',
    stats: { audits: '10K+', issues: '50K+', savings: '$500K' },
    tech: ['TypeScript', 'Puppeteer', 'AWS', 'Lambda'],
    link: '#',
    github: '#',
    featured: false,
  },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl glass border border-border/50 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(212,175,55,0.2)]">
        {/* Image container with parallax */}
        <div className="relative aspect-16/10 overflow-hidden">
          <motion.div
            style={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="h-full w-full bg-linear-to-br from-secondary to-muted"
          >
            {/* Placeholder gradient - replace with actual image */}
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: `${project.color}15` }}
            >
              <span className="text-6xl font-bold opacity-20" style={{ color: project.color }}>
                {project.title[0]}
              </span>
            </div>
          </motion.div>

          {/* Overlay with stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"
          >
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex gap-4">
                {Object.entries(project.stats).map(([key, value]) => (
                  <div key={key} className="text-white">
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs uppercase tracking-wider opacity-70">{key}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute left-4 top-4">
              <Badge className="bg-gold text-gold-foreground">Featured</Badge>
            </div>
          )}

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
            className="absolute right-4 top-4 flex gap-2"
          >
            <button className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              <Eye className="h-4 w-4" />
            </button>
            {project.github && (
              <button className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                <Github className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gold uppercase tracking-wider">
                {project.category}
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold group-hover:text-gold transition-all duration-300 tracking-tight">
                {project.title}
              </h3>
            </div>
            <a
              href={project.link}
              className="rounded-full p-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-secondary"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gold"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  )
}

export function ProjectShowcase() {
  const [filter, setFilter] = useState('all')

  const filtered =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category.toLowerCase() === filter.toLowerCase())

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge variant="outline" className="mb-4 rounded-full border-gold/20 bg-gold/5 text-gold/80">
              Portfolio
            </Badge>
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Selected <span className="text-gold">Work</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl text-lg">
              High-impact solutions combining AI, automation, and premium design.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'saas', 'e-commerce', 'internal tools', 'devtools'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  filter === f ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline">
            View all projects
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
