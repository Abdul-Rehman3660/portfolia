'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Badge } from '@/components/ui/badge'

gsap.registerPlugin(ScrollTrigger)

const CAREER_TIMELINE = [
  {
    year: '2024',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Company',
    description: 'Leading development of scalable web applications',
    achievements: ['Led team of 5 developers', 'Reduced load time by 60%', 'Implemented CI/CD pipeline'],
  },
  {
    year: '2023',
    title: 'Full-Stack Developer',
    company: 'Startup Inc',
    description: 'Built MVP from scratch using Next.js and Node.js',
    achievements: ['Shipped product in 3 weeks', 'Integrated payment systems', 'Built admin dashboard'],
  },
  {
    year: '2022',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    description: 'Created responsive websites for clients',
    achievements: ['Delivered 15+ projects', 'Improved UX scores by 40%', 'Mentored junior developers'],
  },
  {
    year: '2021',
    title: 'Junior Developer',
    company: 'Web Studio',
    description: 'Started professional coding journey',
    achievements: ['Learned React & TypeScript', 'Built 10+ landing pages', 'Mastered Git workflow'],
  },
]

export function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      })

      gsap.utils.toArray('.timeline-item').forEach((item: any, i) => {
        gsap.from(item, {
          opacity: 0,
          x: i % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="timeline-section relative py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4 rounded-full border-gold/50 text-gold">
            Career Path
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            My Career & Experience
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A journey of continuous learning and growth in tech
          </p>
        </motion.div>

        <div className="relative">
          <div className="timeline-line absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold via-sky to-gold/20" />

          {CAREER_TIMELINE.map((item, index) => (
            <div
              key={item.year}
              className={`timeline-item relative mb-12 flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm"
                >
                  <Badge className="mb-2 bg-gold/10 text-gold hover:bg-gold/20">
                    {item.year}
                  </Badge>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.company}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  <ul className="mt-3 space-y-1">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-2 justify-end">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              <div className="absolute left-1/2 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-gold bg-background shadow-lg shadow-gold/50" />
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
