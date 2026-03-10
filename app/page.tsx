"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ParticleBackground, TiltCard } from "@/components/hero-3d"
import { CharacterScene } from "@/components/character-scene"
import { Advanced3DScene } from "@/components/advanced-3d-scene"
import { TechStackBubbles } from "@/components/tech-stack-bubbles"
import { CareerTimeline } from "@/components/career-timeline"
import { WorkSection } from "@/components/work-section"
import { ContactCinematic } from "@/components/contact-cinematic"
import { CinematicTitle } from "@/components/cinematic-title"
import { FloatingOrbScene } from "@/components/floating-orb"

// Lazy load heavy components for better initial load performance
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials").then((mod) => ({ default: mod.TestimonialsSection })),
  { loading: () => <div className="h-96 w-full animate-pulse bg-secondary/50" /> }
)
const ProjectShowcase = dynamic(
  () => import("@/components/project-showcase").then((mod) => ({ default: mod.ProjectShowcase })),
  { loading: () => <div className="h-96 w-full animate-pulse bg-secondary/50" /> }
)
const AnimatedStats = dynamic(
  () => import("@/components/animated-stats").then((mod) => ({ default: mod.AnimatedStats })),
  { loading: () => <div className="h-48 w-full animate-pulse bg-secondary/50" /> }
)
const PricingSection = dynamic(
  () => import("@/components/pricing-section").then((mod) => ({ default: mod.PricingSection })),
  { loading: () => <div className="h-96 w-full animate-pulse bg-secondary/50" /> }
)
const ContactEnhanced = dynamic(
  () => import("@/components/contact-enhanced").then((mod) => ({ default: mod.ContactEnhanced })),
  { ssr: false, loading: () => <div className="h-96 w-full animate-pulse bg-secondary/50" /> }
)
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock,
  Code2,
  FileText,
  Globe,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Rocket,
  Search,
  Send,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  User,
  X,
  Zap,
  Lightbulb,
  Palette,
  Wrench,
  Package,
} from "lucide-react"

/* ───────────────────────── DATA ───────────────────────── */

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "who-i-help", label: "Clients" },
  { id: "proof", label: "Proof" },
  { id: "projects", label: "Projects" },
  { id: "career", label: "Career" },
  { id: "techstack", label: "Tech Stack" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
]

const AUDIENCES = [
  {
    title: "AI Startups",
    pain: "Need RAG chatbots or agentic AI systems built fast.",
    outcome: "Production-ready AI features with vector databases.",
    chips: ["RAG Pipeline", "LLM Integration", "AI Agents"],
    wins: "Built 5+ AI chatbots with 95% accuracy.",
    icon: Sparkles,
  },
  {
    title: "E-Commerce Brands",
    pain: "Losing sales due to poor UX or slow site.",
    outcome: "High-converting store with seamless Stripe checkout.",
    chips: ["Stripe Integration", "SEO", "Performance"],
    wins: "Increased conversions 45% for online retailer.",
    icon: Zap,
  },
  {
    title: "SaaS Companies",
    pain: "Need full-stack features shipped quickly.",
    outcome: "Scalable web apps with React, FastAPI, NestJS.",
    chips: ["Full-Stack", "PostgreSQL", "MongoDB"],
    wins: "Delivered 8+ SaaS products on time.",
    icon: Rocket,
  },
  {
    title: "Agencies",
    pain: "Need reliable dev partner for overflow work.",
    outcome: "White-label development with clean, documented code.",
    chips: ["White-label", "REST APIs", "GraphQL"],
    wins: "Partnered with 5 agencies as trusted dev.",
    icon: Layers,
  },
]

const PROOF_ITEMS = [
  {
    metric: "4.2s to 0.8s",
    label: "Largest Contentful Paint",
    how: "Measured via Lighthouse + CrUX field data",
    change: "Rebuilt frontend with Next.js SSR + image optimization pipeline.",
    link: "#",
  },
  {
    metric: "37% more leads",
    label: "Contact form submissions",
    how: "Tracked in GA4 over 90 days post-launch",
    change: "Redesigned funnel: new landing page, CTA placement, load speed.",
    link: "#",
  },
  {
    metric: "0 to launch in 19 days",
    label: "MVP delivery timeline",
    how: "Git commits + deployment logs",
    change: "Full-stack app with auth, dashboard, and Stripe integration.",
    link: "#",
  },
]

const PROJECTS = [
  {
    title: "SaaS Onboarding Overhaul",
    outcome: "Cut onboarding drop-off by 42%",
    audience: "saas",
    type: "app",
    role: "Lead Developer",
    year: "2025",
    highlights: [
      "Multi-step wizard with progress tracking",
      "A/B tested 3 variants",
      "Reduced time-to-value by 60%",
    ],
    tech: ["Next.js", "TypeScript", "Supabase"],
    link: "#",
  },
  {
    title: "Agency Client Portal",
    outcome: "Saved 15 hours/week on client comms",
    audience: "agency",
    type: "app",
    role: "Full-Stack Developer",
    year: "2024",
    highlights: [
      "Real-time project status dashboard",
      "Automated invoice generation",
      "Role-based access control",
    ],
    tech: ["React", "Node.js", "PostgreSQL"],
    link: "#",
  },
  {
    title: "E-commerce Landing Page",
    outcome: "Conversion rate up 28% in 30 days",
    audience: "startup",
    type: "landing",
    role: "Designer & Developer",
    year: "2025",
    highlights: [
      "Mobile-first responsive design",
      "Optimized Core Web Vitals",
      "Integrated analytics tracking",
    ],
    tech: ["Next.js", "Tailwind", "Vercel"],
    link: "#",
  },
  {
    title: "Local Business Website",
    outcome: "3x increase in qualified leads",
    audience: "local",
    type: "landing",
    role: "Full-Stack Developer",
    year: "2024",
    highlights: [
      "SEO-optimized content structure",
      "Google Business integration",
      "Sub-1s page load times",
    ],
    tech: ["Next.js", "Tailwind", "Netlify"],
    link: "#",
  },
]

const SERVICES = [
  {
    title: "RAG AI Chatbot",
    timeline: "2-4 weeks",
    idealFor: "Businesses wanting AI chatbots trained on their data.",
    popular: true,
    outcomes: [
      "Custom chatbot with your knowledge base",
      "95%+ accurate responses",
      "24/7 automated customer support",
    ],
    includes: [
      "Vector database setup",
      "LLM integration (Claude/GPT)",
      "Custom data pipeline",
      "Dashboard & analytics",
    ],
  },
  {
    title: "Agentic AI System",
    timeline: "3-5 weeks",
    idealFor: "Companies automating complex workflows with AI agents.",
    popular: true,
    outcomes: [
      "Autonomous AI agents",
      "Multi-step task automation",
      "Human oversight controls",
    ],
    includes: [
      "Agent architecture design",
      "Tool & API integration",
      "Memory management",
      "Monitoring & logging",
    ],
  },
  {
    title: "Full-Stack Web App",
    timeline: "4-8 weeks",
    idealFor: "Startups building MVP or production products.",
    popular: false,
    outcomes: [
      "Production-ready application",
      "Scalable architecture",
      "Fast & secure deployment",
    ],
    includes: [
      "React/Next.js frontend",
      "FastAPI/NestJS backend",
      "PostgreSQL/MongoDB database",
      "Authentication & APIs",
    ],
  },
  {
    title: "E-Commerce Platform",
    timeline: "4-6 weeks",
    idealFor: "Businesses launching online stores.",
    popular: false,
    outcomes: [
      "Complete online store",
      "Secure payment processing",
      "SEO optimized",
    ],
    includes: [
      "Product catalog",
      "Stripe payment integration",
      "Order management",
      "Mobile-responsive design",
    ],
  },
  {
    title: "Performance Audit & Fix",
    timeline: "3-5 days",
    idealFor: "Teams with slow sites hurting conversions.",
    popular: false,
    outcomes: [
      "Lighthouse 90+ scores",
      "Reduced bounce rate",
      "Faster time-to-interactive",
    ],
    includes: [
      "Performance audit report",
      "Critical fixes implementation",
      "Before/after benchmarks",
      "Optimization playbook",
    ],
  },
]

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Discovery",
    duration: "Day 1-2",
    icon: Search,
    output: "Project brief & scope document",
    bullets: [
      "Understand your goals and constraints",
      "Audit existing assets and tech",
      "Define success metrics",
    ],
  },
  {
    step: 2,
    title: "Design",
    duration: "Day 3-5",
    icon: Palette,
    output: "Wireframes & design direction",
    bullets: [
      "Information architecture",
      "Visual design concepts",
      "Mobile-first layouts",
    ],
  },
  {
    step: 3,
    title: "Build",
    duration: "Day 5-12",
    icon: Code2,
    output: "Functional prototype or MVP",
    bullets: [
      "Component-driven development",
      "Responsive implementation",
      "Performance optimization",
    ],
  },
  {
    step: 4,
    title: "Ship",
    duration: "Day 12-14",
    icon: Rocket,
    output: "Live, production-ready site",
    bullets: [
      "QA & cross-browser testing",
      "Deployment & DNS setup",
      "Handoff & documentation",
    ],
  },
]

const WRITING = [
  {
    title: "Why Your Landing Page Loads in 6 Seconds",
    hook: "And what to do about it before you lose another lead.",
    tag: "Performance",
    date: "2025-01-15",
    readTime: "8 min read",
    featured: true,
    link: "#",
  },
  {
    title: "The MVP Trap: Building Too Much, Too Soon",
    hook: "How to scope a v1 that actually ships.",
    tag: "Strategy",
    date: "2024-11-20",
    readTime: "6 min read",
    featured: false,
    link: "#",
  },
  {
    title: "Tailwind vs. CSS Modules in 2025",
    hook: "A practical comparison for production apps.",
    tag: "Engineering",
    date: "2024-10-05",
    readTime: "5 min read",
    featured: false,
    link: "#",
  },
  {
    title: "Free-Tier Stack, Production-Grade Output",
    hook: "How I ship real products without enterprise budgets.",
    tag: "Process",
    date: "2024-09-12",
    readTime: "4 min read",
    featured: false,
    link: "#",
  },
]

const QUICK_BRIEFS = [
  "I need a landing page",
  "I need an MVP built",
  "My site is too slow",
  "I need a redesign",
]

const FAQ_ITEMS = [
  {
    q: "What does a typical timeline look like?",
    a: "Landing pages ship in 5-7 days. Full-stack apps take 3-6 weeks depending on scope. I always define timelines before we start.",
  },
  {
    q: "How do you handle pricing?",
    a: "I offer fixed-price packages for defined scopes. No hourly billing surprises. We agree on deliverables and cost upfront.",
  },
  {
    q: "What about revisions?",
    a: "Each package includes a defined revision round. Additional revisions are available at a fair rate, agreed in advance.",
  },
  {
    q: "How does handoff work?",
    a: "You get a clean Git repo, deployment configured, and documentation. I ensure you or your team can maintain the code.",
  },
  {
    q: "Do you offer maintenance?",
    a: "Yes, optional monthly retainers for ongoing updates, monitoring, and support. We can discuss after the initial project.",
  },
  {
    q: "Can you work with legacy code?",
    a: "Absolutely. I regularly refactor and modernize existing codebases. I will audit first and recommend the most efficient path.",
  },
]

/* ───────────────────── SIGNATURE ARTIFACT ─────────────── */

function SignatureArtifact() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!mounted || prefersReduced) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
      setMousePos({ x, y })
    },
    [mounted, prefersReduced]
  )

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center"
      aria-hidden="true"
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-sky/15 blur-3xl" />

      {/* Main prism */}
      <div
        className="noise-overlay relative flex h-72 w-72 items-center justify-center rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-secondary shadow-2xl transition-transform duration-500 ease-out md:h-80 md:w-80"
        style={{
          transform: prefersReduced
            ? "none"
            : `perspective(600px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
        }}
      >
        {/* Inner layers */}
        <div className="absolute inset-4 rounded-2xl border border-border/30 bg-gradient-to-tr from-gold/5 to-sky/5" />
        <div className="absolute inset-8 rounded-xl border border-border/20 bg-gradient-to-bl from-gold/8 via-transparent to-sky/8" />

        {/* Central monolith SVG */}
        <svg
          viewBox="0 0 120 120"
          className="relative z-10 h-28 w-28 md:h-32 md:w-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Node graph lines */}
          <line x1="30" y1="30" x2="90" y2="45" className="stroke-gold/40" strokeWidth="1" />
          <line x1="90" y1="45" x2="60" y2="90" className="stroke-sky/40" strokeWidth="1" />
          <line x1="60" y1="90" x2="30" y2="30" className="stroke-gold/30" strokeWidth="1" />
          <line x1="60" y1="20" x2="60" y2="90" className="stroke-border" strokeWidth="0.5" />
          <line x1="20" y1="60" x2="100" y2="60" className="stroke-border" strokeWidth="0.5" />

          {/* Prism shape */}
          <polygon
            points="60,15 95,50 80,100 40,100 25,50"
            className="fill-gold/8 stroke-gold/50"
            strokeWidth="1.5"
          />
          <polygon
            points="60,25 85,52 73,92 47,92 35,52"
            className="fill-sky/5 stroke-sky/30"
            strokeWidth="0.75"
          />

          {/* Nodes */}
          <circle cx="60" cy="15" r="3" className="fill-gold" />
          <circle cx="95" cy="50" r="2.5" className="fill-gold/70" />
          <circle cx="80" cy="100" r="2" className="fill-sky/60" />
          <circle cx="40" cy="100" r="2" className="fill-sky/60" />
          <circle cx="25" cy="50" r="2.5" className="fill-gold/70" />
          <circle cx="60" cy="60" r="4" className="fill-gold" />

          {/* Small accent dots */}
          <circle cx="60" cy="60" r="8" className="stroke-gold/20" strokeWidth="0.5" fill="none" />
          <circle cx="60" cy="60" r="16" className="stroke-sky/15" strokeWidth="0.5" fill="none" />
        </svg>

        {/* Edge highlights */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-foreground/[0.02]" />
      </div>

      {/* Floating proof cards */}
      <div className="absolute -right-2 top-8 rounded-xl border border-border/50 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm md:right-0">
        <p className="text-xs font-medium text-muted-foreground">Projects shipped</p>
        <p className="font-serif text-xl font-bold text-foreground">24+</p>
      </div>
      <div className="absolute -left-2 bottom-16 rounded-xl border border-border/50 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm md:left-0">
        <p className="text-xs font-medium text-muted-foreground">Avg. delivery</p>
        <p className="font-serif text-xl font-bold text-foreground">12 days</p>
      </div>
      <div className="absolute -bottom-2 right-12 rounded-xl border border-border/50 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-xs font-medium text-muted-foreground">Client satisfaction</p>
        <p className="font-serif text-xl font-bold text-foreground">100%</p>
      </div>
    </div>
  )
}

/* ───────────────────── MAIN PAGE ──────────────────────── */

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState<string>("all")
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [mounted, setMounted] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  /* ── Scrollspy ── */
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const sorted = visible.sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )
          setActiveSection(sorted[0].target.id)
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  /* ── Form submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")
    await new Promise((r) => setTimeout(r, 1500))
    setFormState("sent")
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setFormState("idle"), 4000)
  }

  /* ── Filtered projects ── */
  const filteredProjects =
    projectFilter === "all"
      ? PROJECTS
      : PROJECTS.filter(
          (p) => p.audience === projectFilter || p.type === projectFilter
        )

  const fadeUp = !mounted || prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
      }

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Cinematic Title - Persistent across all sections */}
      <CinematicTitle />

      {/* Floating Orb Animation */}
      <FloatingOrbScene />

      {/* ────────── HEADER ────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl" suppressHydrationWarning>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
          <a href="#hero" className="font-serif text-lg font-bold tracking-tight text-foreground">
            DM<span className="text-gold">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
              <a href="#contact">Request a quote</a>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="overflow-x-hidden">
        {/* Particle Background */}
        <ParticleBackground />

        {/* ────────── HERO ────────── */}
        <section
          id="hero"
          className="relative flex min-h-screen items-center pt-16"
          suppressHydrationWarning
        >
          <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left column */}
              <div className="lg:col-span-7">
                <motion.div {...(mounted ? fadeUp : {})}>
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="rounded-full border-green-300/50 bg-green-50 text-green-700 text-xs">
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                      Available for projects
                    </Badge>
                    <Badge variant="outline" className="rounded-full text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {"Reply < 2h"}
                    </Badge>
                    <Badge variant="outline" className="rounded-full text-xs text-muted-foreground">
                      <Wrench className="mr-1 h-3 w-3" />
                      Free-tier stack
                    </Badge>
                  </div>

                  <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                    <span className="text-balance">I build web apps that{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10">ship fast</span>
                      <span className="absolute bottom-1 left-0 right-0 z-0 h-3 bg-gold/25 lg:h-4" aria-hidden="true" />
                    </span>{" "}
                    and convert.</span>
                  </h1>

                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                    Full-stack developer helping SaaS founders, agencies, and startups
                    go from idea to production in weeks, not months. Strategy, design,
                    and code — all under one roof.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button asChild size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                      <a href="#contact">
                        Request a quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full">
                      <a href="#proof">
                        View case studies
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  {/* Timeline cards */}
                  <div className="mt-10 flex flex-wrap gap-4">
                    <div className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/80 px-5 py-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                        <Zap className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">In 7 days</p>
                        <p className="text-sm text-muted-foreground">Landing page live & converting</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-border/50 bg-card/80 px-5 py-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky/10">
                        <Rocket className="h-5 w-5 text-sky" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">In 30 days</p>
                        <p className="text-sm text-muted-foreground">Full-stack MVP in production</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right column — Signature Visual */}
              <div className="hidden lg:col-span-5 lg:block">
                <motion.div
                  initial={!mounted || prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <TiltCard className="hidden lg:col-span-5 lg:block">
                    <Advanced3DScene />
                  </TiltCard>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────── WHO I HELP ────────── */}
        <section id="who-i-help" className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Clients"
                title="Who I help"
                description="I work best with teams who value speed, craft, and clear communication."
              />
            </motion.div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCES.map((a, i) => (
                <motion.div
                  key={a.title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="group relative flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-lg">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                      <a.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {a.pain}
                    </p>
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {a.outcome}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {a.chips.map((c) => (
                        <Badge key={c} variant="secondary" className="rounded-full text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                    {/* Hover reveal */}
                    <div className="mt-auto pt-4 text-sm text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                      {a.wins}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────── ANIMATED STATS ────────── */}
        <AnimatedStats />

        {/* ────────── PROOF ────────── */}
        <section id="proof" className="bg-secondary/50 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <div className="flex flex-wrap items-center gap-3">
                <SectionHeader
                  label="Results"
                  title="Proof, not promises"
                  description="Measurable outcomes from real projects. No fake testimonials."
                />
              </div>
              <Badge variant="outline" className="mt-4 rounded-full text-xs text-muted-foreground">
                <Shield className="mr-1 h-3 w-3" />
                Proof over quotes
              </Badge>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {PROOF_ITEMS.map((p, i) => (
                <motion.div
                  key={p.metric}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6 transition-shadow duration-300 hover:shadow-lg">
                    <p className="font-serif text-3xl font-bold text-foreground">
                      {p.metric}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gold">{p.label}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {p.change}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground/70">
                      <em>Measured: {p.how}</em>
                    </p>
                    <a
                      href={p.link}
                      className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      View case study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────── PROJECTS ────────── */}
        <section id="projects" className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Work"
                title="Selected projects"
                description="Outcome-first case studies from real client work."
              />
            </motion.div>

            {/* Filters */}
            <motion.div {...fadeUp} className="mt-8">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
                {[
                  { value: "all", label: "All" },
                  { value: "saas", label: "SaaS" },
                  { value: "agency", label: "Agency" },
                  { value: "startup", label: "Startup" },
                  { value: "landing", label: "Landing Pages" },
                  { value: "app", label: "Web Apps" },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setProjectFilter(f.value)}
                    aria-pressed={projectFilter === f.value}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      projectFilter === f.value
                        ? "bg-foreground text-background shadow-sm"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Project cards */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p) => (
                  <motion.div
                    key={p.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="rounded-full text-xs">
                          {p.role}
                        </Badge>
                        <Badge variant="secondary" className="rounded-full text-xs">
                          {p.year}
                        </Badge>
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-base font-medium text-gold">
                        {p.outcome}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
                        {p.tech.map((t) => (
                          <Badge key={t} variant="secondary" className="rounded-full text-xs">
                            {t}
                          </Badge>
                        ))}
                        <a
                          href={p.link}
                          className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                        >
                          Details
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ────────── PROJECT SHOWCASE ────────── */}
        <ProjectShowcase />

        {/* ────────── CAREER TIMELINE ────────── */}
        <CareerTimeline />

        {/* ────────── TECH STACK BUBBLES ────────── */}
        <section id="techstack" className="relative py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Tech Stack"
                title="My Tech Stack"
                description="Technologies I work with to build amazing products"
              />
            </motion.div>
            <motion.div {...fadeUp} className="mt-8">
              <TechStackBubbles />
            </motion.div>
          </div>
        </section>

        {/* ────────── SERVICES ────────── */}
        <section id="services" className="bg-secondary/50 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Services"
                title="How we can work together"
                description="Fixed-scope packages with clear deliverables and timelines."
              />
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-shadow duration-300 hover:shadow-lg ${
                      s.popular ? "border-gold/50 shadow-md" : "border-border/50"
                    }`}
                  >
                    {s.popular && (
                      <Badge className="absolute -top-2.5 left-5 rounded-full bg-gold text-gold-foreground text-xs">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Most popular
                      </Badge>
                    )}
                    <Badge variant="outline" className="mb-4 w-fit rounded-full text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {s.timeline}
                    </Badge>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.idealFor}</p>

                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        Outcomes
                      </p>
                      <ul className="mt-2 flex flex-col gap-2">
                        {s.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2 text-sm text-foreground">
                            <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        Includes
                      </p>
                      <ul className="mt-2 flex flex-col gap-2">
                        {s.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/40" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-6">
                      <Button
                        asChild
                        variant={s.popular ? "default" : "outline"}
                        className={`w-full rounded-full ${
                          s.popular
                            ? "bg-foreground text-background hover:bg-foreground/90"
                            : ""
                        }`}
                      >
                        <a href="#contact">
                          Get started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ */}
            <motion.div {...fadeUp} className="mt-16 mx-auto max-w-3xl">
              <h3 className="font-serif text-2xl font-semibold text-foreground text-center">
                Frequently asked questions
              </h3>
              <Accordion type="single" collapsible className="mt-8">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-foreground">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ────────── TESTIMONIALS ────────── */}
        <TestimonialsSection />

        {/* ────────── PRICING ────────── */}
        <PricingSection />

        {/* ────────── PROCESS ────────── */}
        <section id="process" className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Process"
                title="How it works"
                description="A repeatable system for shipping quality work on time."
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Shipped with a free-tier toolchain — optimized for performance and cost from day one.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="relative flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                        <step.icon className="h-5 w-5 text-gold" />
                      </div>
                      <Badge variant="secondary" className="rounded-full text-xs">
                        {step.duration}
                      </Badge>
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                      <span className="mr-2 text-muted-foreground/40">{`0${step.step}`}</span>
                      {step.title}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/40" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-4 text-xs font-medium text-gold">
                      <Package className="mr-1 inline h-3 w-3" />
                      {step.output}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What you receive */}
            <motion.div {...fadeUp} className="mt-10">
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <h4 className="font-serif text-lg font-semibold text-foreground">
                  What you receive
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    "Clean Git repository with docs",
                    "Deployment configured & live",
                    "Handoff checklist & walkthrough",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ────────── WRITING ────────── */}
        <section id="writing" className="bg-secondary/50 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Writing"
                title="Recent articles"
                description="Thoughts on building, shipping, and the craft of web development."
              />
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-12">
              {/* Featured */}
              {WRITING.filter((w) => w.featured).map((w) => (
                <motion.div key={w.title} {...fadeUp} className="lg:col-span-5">
                  <a
                    href={w.link}
                    className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card transition-shadow duration-300 hover:shadow-lg"
                    aria-label={`Read article: ${w.title}`}
                  >
                    {/* Cover gradient */}
                    <div className="flex h-40 items-center justify-center rounded-t-2xl bg-gradient-to-br from-gold/10 via-card to-sky/10">
                      <FileText className="h-12 w-12 text-gold/40" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <Badge variant="secondary" className="mb-3 w-fit rounded-full text-xs">
                        {w.tag}
                      </Badge>
                      <h3 className="font-serif text-xl font-semibold text-foreground group-hover:underline">
                        {w.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{w.hook}</p>
                      <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-muted-foreground/70">
                        <time dateTime={w.date}>
                          {new Date(w.date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                        <span>{"·"}</span>
                        <span>{w.readTime}</span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}

              {/* List */}
              <div className="flex flex-col gap-2 lg:col-span-7">
                {WRITING.filter((w) => !w.featured).map((w, i) => (
                  <motion.div key={w.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}>
                    <a
                      href={w.link}
                      className="group flex items-center gap-4 rounded-xl border border-transparent px-4 py-4 transition-all hover:border-border/50 hover:bg-card"
                      aria-label={`Read article: ${w.title}`}
                    >
                      <Badge variant="secondary" className="shrink-0 rounded-full text-xs">
                        {w.tag}
                      </Badge>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-foreground group-hover:underline">
                          {w.title}
                        </h3>
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                          {w.hook}
                        </p>
                      </div>
                      <div className="hidden shrink-0 text-xs text-muted-foreground/70 sm:flex sm:items-center sm:gap-2">
                        <time dateTime={w.date}>
                          {new Date(w.date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                        <span>{"·"}</span>
                        <span>{w.readTime}</span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ────────── WORK SECTION ────────── */}
        <WorkSection />

        {/* ────────── TECH STACK (repeated for video style) ────────── */}
        <section id="techstack" className="relative py-16 lg:py-24 overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Tech Stack"
                title="MY TECHSTACK"
                description="Technologies I work with to build amazing products"
              />
            </motion.div>
            <motion.div {...fadeUp} className="mt-8">
              <TechStackBubbles />
            </motion.div>
          </div>
        </section>

        {/* ────────── CONTACT ────────── */}
        <ContactCinematic />
      </main>

      {/* ────────── FOOTER ────────── */}
      <footer className="border-t border-border/40 bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <a href="#hero" className="font-serif text-lg font-bold text-foreground">
                DM<span className="text-gold">.</span>
              </a>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Full-stack developer building performant web apps for founders, agencies,
                and startups.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-foreground">Navigation</h4>
              <nav className="mt-3 flex flex-col gap-2" aria-label="Footer navigation">
                {NAV_ITEMS.slice(1).map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-foreground">Services</h4>
              <div className="mt-3 flex flex-col gap-2">
                {SERVICES.map((s) => (
                  <a
                    key={s.title}
                    href="#services"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-foreground">Contact</h4>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="mailto:hello@danimacro.dev"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  hello@danimacro.dev
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gold transition-colors hover:text-gold/80"
                >
                  {"Let's work together"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground/60">
              {"© 2025 Dani Macro. All rights reserved."}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {"Built entirely on free-tier tools · Next.js · Vercel"}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

/* ───────────────── SECTION HEADER COMPONENT ───────────── */

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description: string
}) {
  return (
    <div>
      <Badge variant="outline" className="mb-4 rounded-full text-xs text-muted-foreground">
        {label}
      </Badge>
      <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
        {description}
      </p>
    </div>
  )
}
