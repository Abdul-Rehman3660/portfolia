'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CAREER_TIMELINE = [
  {
    year: 'Jul 2025 – Present',
    title: 'Python Developer',
    company: 'Cyberify',
    type: 'Current',
    description: 'Building AI-powered applications and automation systems for business clients.',
    achievements: [
      'Developing AI chatbots with LangChain + OpenAI API',
      'Building automation workflows with Python + n8n',
      'Full-stack apps with React + FastAPI',
    ],
  },
  {
    year: 'Jun 2024 – Nov 2024',
    title: 'Software Engineer',
    company: 'Safasha Business Solutions',
    type: 'Previous',
    description: 'Full-stack web development and client delivery.',
    achievements: [
      'Delivered production web applications on time',
      'REST API development with Node.js',
      'Database design and query optimization',
    ],
  },
  {
    year: '2022 – 2025',
    title: 'Bachelor of Computer Science',
    company: 'COMSATS University Vehari',
    type: 'Education',
    description: 'BCompSc — Computer Science. Focus on AI and software engineering.',
    achievements: [
      'AI & Machine Learning coursework',
      'Data Structures and Algorithms',
      'Final year project: AI-powered web application',
    ],
  },
]

export function CareerTimeline() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="relative">
      {/* Animated vertical line */}
      <div
        ref={lineRef}
        className="absolute left-[11px] top-2 bottom-2 w-px bg-border"
      />

      <div className="space-y-10">
        {CAREER_TIMELINE.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ item, index }: { item: typeof CAREER_TIMELINE[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const dotColor =
    item.type === 'Current'   ? 'bg-gold border-gold/30' :
    item.type === 'Education' ? 'bg-sky border-sky/30'   :
                                'bg-muted-foreground border-muted-foreground/30'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8"
    >
      {/* Dot */}
      <div
        className={`absolute left-0 top-[6px] h-[22px] w-[22px] rounded-full border-2 border-background ring-2 flex items-center justify-center transition-all duration-300 ${inView ? 'scale-100' : 'scale-0'} ${dotColor} shadow-[0_0_15px_rgba(212,175,55,0.3)]`}
      />

      <div className="flex flex-wrap items-center gap-2 mb-1.5">
        <span className="text-xs text-muted-foreground font-mono">{item.year}</span>
        <Badge variant="outline" className="rounded-full text-[10px] py-0 h-4">
          {item.type}
        </Badge>
      </div>

      <h3 className="text-base font-semibold text-foreground leading-tight">{item.title}</h3>
      <p className="text-sm font-medium text-gold mt-0.5 mb-2">{item.company}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>

      <ul className="space-y-1.5">
        {item.achievements.map((a, j) => (
          <motion.li
            key={j}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.12 + j * 0.06 + 0.2 }}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
            {a}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
