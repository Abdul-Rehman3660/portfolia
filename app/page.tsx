"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useAnimationControls,
} from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { TechStackBubbles } from "@/components/tech-stack-bubbles"
import { CareerTimeline } from "@/components/career-timeline"
import { WorkSection } from "@/components/work-section"
import { ContactCinematic } from "@/components/contact-cinematic"
import { ChatbotPreview } from "@/components/chatbot-preview"
import { HeroParticleField } from "@/components/hero-particle-field"
import { MagneticButton } from "@/components/magnetic-button"
import { TextRevealCinematic } from "@/components/text-reveal-cinematic"
import { FloatingServiceCards } from "@/components/floating-service-cards"
import { ScrollProgressCinematic } from "@/components/scroll-progress-cinematic"

// Lazy load heavy components for better initial load performance
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
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock,
  Code2,
  FileText,
  Layers,
  MapPin,
  Menu,
  Rocket,
  Search,
  Shield,
  Sparkles,
  X,
  Zap,
  Lightbulb,
  Package,
} from "lucide-react"

/* ───────────────────────── DATA ───────────────────────── */

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "proof", label: "Results" },
  { id: "career", label: "Career" },
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
    duration: "Day 1–2",
    icon: Search,
    output: "Scope doc + data requirements",
    bullets: [
      "Understand your use case and goals",
      "Map data sources and integrations",
      "Define success metrics upfront",
    ],
  },
  {
    step: 2,
    title: "Architecture",
    duration: "Day 2–4",
    icon: Lightbulb,
    output: "Technical blueprint",
    bullets: [
      "Choose right LLM and retrieval strategy",
      "Design data pipeline and vector store",
      "Plan API connections and deployment",
    ],
  },
  {
    step: 3,
    title: "Build",
    duration: "Day 4–18",
    icon: Code2,
    output: "Working AI system",
    bullets: [
      "Iterative development with daily updates",
      "Testing on your real data",
      "Accuracy tuning and edge case handling",
    ],
  },
  {
    step: 4,
    title: "Deploy & Handoff",
    duration: "Day 18–21",
    icon: Rocket,
    output: "Live system + full documentation",
    bullets: [
      "Deploy to your environment or cloud",
      "Full codebase handoff via GitHub",
      "30-minute walkthrough + written docs",
    ],
  },
]

const WRITING = [
  {
    title: "How RAG Actually Works (And Why Your Chatbot Needs It)",
    hook: "Most AI chatbots hallucinate. RAG fixes that. Here's how.",
    tag: "AI / LLM",
    date: "2025-03-01",
    readTime: "7 min read",
    featured: true,
    link: "#",
  },
  {
    title: "Building Your First LangChain Agent in Python",
    hook: "Step-by-step: from zero to a working autonomous agent.",
    tag: "Tutorial",
    date: "2025-02-10",
    readTime: "10 min read",
    featured: false,
    link: "#",
  },
  {
    title: "n8n vs Make: Which Should You Use for AI Workflows?",
    hook: "A practical comparison after building with both.",
    tag: "Automation",
    date: "2025-01-20",
    readTime: "5 min read",
    featured: false,
    link: "#",
  },
  {
    title: "Why I Use FastAPI Instead of Django for AI Backends",
    hook: "Speed, async support, and OpenAI compatibility explained.",
    tag: "Engineering",
    date: "2024-12-15",
    readTime: "6 min read",
    featured: false,
    link: "#",
  },
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

/* ───────────────────── MAIN PAGE ──────────────────────── */

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState<string>("all")
  const prefersReduced = useReducedMotion()
  const chatbotPreviewControls = useAnimationControls()

  useEffect(() => {
    setMounted(true)
  }, [])

  /* Hero ChatbotPreview: same initial styles on server + first client paint; animate only after mount */
  useEffect(() => {
    if (!mounted) return
    if (prefersReduced) {
      void chatbotPreviewControls.set({ opacity: 1, scale: 1 })
    } else {
      void chatbotPreviewControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
      })
    }
  }, [mounted, prefersReduced, chatbotPreviewControls])

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

  /* ── Filtered projects ── */
  const filteredProjects =
    projectFilter === "all"
      ? PROJECTS
      : PROJECTS.filter(
          (p) => p.audience === projectFilter || p.type === projectFilter
        )

  const fadeUp =
    !mounted || prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Cinematic Title - Persistent across all sections */}
      {/* CinematicTitle removed */}

      {/* Floating Orb Animation */}
      {/* FloatingOrbScene removed for performance */}

      {/* ────────── HEADER ────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl" suppressHydrationWarning>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
          <a href="#hero" className="font-serif text-lg font-bold tracking-tight text-foreground">
            AR<span className="text-gold">.</span>
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
        {/* Vertical scroll progress — fixed left side on desktop */}
        <ScrollProgressCinematic navItems={NAV_ITEMS} />

        {/* ────────── HERO ────────── */}
        <section
          id="hero"
          className="relative flex min-h-screen items-center pt-16"
          suppressHydrationWarning
        >
          {/* Neural network particle field — absolute behind content */}
          <HeroParticleField />
          <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left column */}
              <div className="lg:col-span-7">
                <motion.div {...fadeUp}>
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="rounded-full border-gold/30 bg-gold/10 text-gold text-xs backdrop-blur-sm">
                      <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                      Available for projects
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-sky/30 bg-sky/5 text-sky text-xs backdrop-blur-sm">
                      <Clock className="mr-1 h-3 w-3" />
                      {"Fast Delivery"}
                    </Badge>
                    <Badge variant="outline" className="group rounded-full border-border/50 bg-background/50 text-xs text-muted-foreground transition-colors hover:border-gold/50">
                      <MapPin className="mr-1 h-3 w-3 text-gold/60 transition-colors group-hover:text-gold" />
                      Pakistan → Worldwide
                    </Badge>
                  </div>

                  <TextRevealCinematic
                    text="Building Custom AI Agents that automate your growth."
                    variant="hero"
                    underline
                    as="h1"
                    className="leading-[1.1]"
                  />

                  <p className="mt-6 max-w-xl animate-fade-in text-lg leading-relaxed text-muted-foreground">
                    Expert AI developer specializing in autonomous chatbots, workflow automation,
                    and custom LLM integrations. Helping businesses ship products in weeks,
                    not months. Strategy, design, and code — optimized for AI.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <MagneticButton>
                      <Button asChild size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                        <a href="#contact">
                          Request a quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </MagneticButton>
                    <MagneticButton>
                      <Button asChild variant="outline" size="lg" className="rounded-full">
                        <a href="#proof">
                          View case studies
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </MagneticButton>
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
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={chatbotPreviewControls}
                >
                  <ChatbotPreview />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────── WHO I HELP ────────── */}
        <section id="who-i-help" className="py-12 lg:py-16">
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
        <section id="proof" className="bg-secondary/30 py-12 lg:py-16">
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
        <section id="projects" className="py-12 lg:py-16">
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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
        <section id="techstack" className="relative py-12 lg:py-16 overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Tech Stack"
                title="Tools I Build With"
                description="From LLMs to APIs to deployment — the full stack I use to ship AI products fast."
              />
            </motion.div>
            <motion.div {...fadeUp} className="mt-8">
              <TechStackBubbles />
            </motion.div>
          </div>
        </section>

        {/* ────────── SERVICES ────────── */}
        <section id="services" className="bg-secondary/30 py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp} className="mb-10">
              <SectionHeader
                label="Services"
                title="How we can work together"
                description="Fixed-scope AI packages with clear deliverables and timelines."
              />
            </motion.div>

            <FloatingServiceCards services={SERVICES} />

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
        {/* <TestimonialsSection /> */}

        {/* ────────── PRICING ────────── */}
        <PricingSection />

        {/* ────────── PROCESS ────────── */}
        <section id="process" className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <motion.div {...fadeUp}>
              <SectionHeader
                label="Process"
                title="How it works"
                description="A repeatable system for shipping quality work on time."
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Built with production-grade tools — optimized for reliability and speed from day one.
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
        <section id="writing" className="bg-secondary/30 py-12 lg:py-16">
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
                    className="group hover-lift glass flex h-full flex-col rounded-2xl border border-border/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/5"
                    aria-label={`Read article: ${w.title}`}
                  >
                    {/* Cover gradient */}
                    <div className="flex h-40 items-center justify-center rounded-t-2xl bg-linear-to-br from-gold/10 via-card to-sky/10">
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
                AR<span className="text-gold">.</span>
              </a>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                AI developer building chatbots, agents, and automation for businesses and startups
                worldwide.
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
                  href="mailto:contact@abdulr.me"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  contact@abdulr.me
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
              {"© 2025 Abdul R. All rights reserved."}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {"AI Developer · Python · LangChain · OpenAI · n8n"}
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
  const words = title.trim().split(/\s+/).filter(Boolean)
  const accent = words[0] ?? ''
  const rest = words.slice(1).join(' ')

  return (
    <div className="relative">
      <Badge variant="outline" className="mb-4 rounded-full border-gold/25 bg-gold/5 text-xs text-gold/90 backdrop-blur-sm">
        {label}
      </Badge>
      <h2 className="font-serif text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
        <span className="text-gold">{accent}</span>
        {rest ? <span className="text-foreground"> {rest}</span> : null}
      </h2>
      <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
