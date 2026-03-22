'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, Loader2, Calendar, MessageSquare, Mail, User, Rocket, Layout, Gauge, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const PROJECT_TYPES = [
  { id: 'mvp', label: 'MVP Development', icon: Rocket, desc: 'Build v1 fast' },
  { id: 'landing', label: 'Landing Page', icon: Layout, desc: 'High-converting page' },
  { id: 'audit', label: 'Performance Audit', icon: Gauge, desc: 'Speed optimization' },
  { id: 'redesign', label: 'Full Redesign', icon: Palette, desc: 'Complete overhaul' },
  { id: 'consulting', label: 'Consulting', icon: MessageSquare, desc: 'Technical advice' },
]

const BUDGET_RANGES = [
  { label: '< $3K', value: 'small' },
  { label: '$3K - $8K', value: 'medium' },
  { label: '$8K - $15K', value: 'large' },
  { label: '$15K+', value: 'enterprise' },
]

const STEPS = [
  {
    title: "What's your name?",
    field: 'name',
    type: 'text',
    placeholder: 'John Doe',
    icon: User as any,
  },
  {
    title: 'Best email to reach you?',
    field: 'email',
    type: 'email',
    placeholder: 'john@company.com',
    icon: Mail as any,
  },
  {
    title: 'What type of project?',
    field: 'projectType',
    type: 'select',
    options: PROJECT_TYPES,
  },
  {
    title: 'Budget range?',
    field: 'budget',
    type: 'budget',
    options: BUDGET_RANGES,
  },
  {
    title: 'Tell me more',
    field: 'details',
    type: 'textarea',
    placeholder: 'Describe your project, goals, and any specific requirements...',
  },
]

export function ContactEnhanced() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    details: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.details,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      toast.success('Message sent! I\'ll get back to you soon.')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
      toast.error('Failed to send message. Please try again.')
    }
  }

  const currentStepData = STEPS[step - 1]

  return (
    <section className="py-24" id="contact">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="text-center">
          <Badge variant="outline" className="mb-4 rounded-full">
            Start a project
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something great
          </h2>
          <p className="mt-3 text-muted-foreground">Quick 2-minute form. I&apos;ll respond within 2 hours.</p>
        </div>

        {/* Progress */}
        <div className="mt-8 flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i + 1 <= step ? 'w-8 bg-gold' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border/50 bg-card p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold">Message sent!</h3>
                <p className="mt-2 text-muted-foreground">
                  I&apos;ll review your project and get back to you within 2 hours.
                </p>
                <Button
                  className="mt-6 rounded-full"
                  variant="outline"
                  onClick={() => {
                    setStatus('idle')
                    setStep(1)
                    setFormData({ name: '', email: '', projectType: '', budget: '', timeline: '', details: '' })
                  }}
                >
                  Send another
                </Button>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <Send className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold">Something went wrong</h3>
                <p className="mt-2 text-muted-foreground">{errorMessage}</p>
                <Button
                  className="mt-6 rounded-full"
                  onClick={() => {
                    setStatus('idle')
                    setErrorMessage('')
                  }}
                >
                  Try again
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={(e) => {
                  e.preventDefault()
                  if (step < STEPS.length) {
                    setStep(step + 1)
                  } else {
                    handleSubmit(e)
                  }
                }}
              >
                <div className="mb-6">
                  <h3 className="font-serif text-xl font-semibold">{currentStepData.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Step {step} of {STEPS.length}
                  </p>
                </div>

                {/* Input based on type */}
                {currentStepData.type === 'text' || currentStepData.type === 'email' ? (
                  <div className="relative">
                    <currentStepData.icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={currentStepData.type}
                      required
                      value={formData[currentStepData.field as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [currentStepData.field]: e.target.value })
                      }
                      placeholder={currentStepData.placeholder || ''}
                      className="w-full rounded-xl border border-input bg-background py-4 pl-12 pr-4 text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      autoFocus
                    />
                  </div>
                ) : currentStepData.type === 'select' ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {currentStepData.options?.map((opt: any) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: opt.id })}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                          formData.projectType === opt.id
                            ? 'border-gold bg-gold/5'
                            : 'border-border hover:border-gold/30'
                        }`}
                      >
                        <opt.icon className={`h-5 w-5 ${formData.projectType === opt.id ? 'text-gold' : ''}`} />
                        <div>
                          <p className="font-medium">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : currentStepData.type === 'budget' ? (
                  <div className="flex flex-wrap gap-3">
                    {currentStepData.options?.map((opt: any) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: opt.value })}
                        className={`rounded-full px-6 py-3 text-sm font-medium transition-all ${
                          formData.budget === opt.value
                            ? 'bg-foreground text-background'
                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    required
                    rows={5}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder={currentStepData.placeholder || ''}
                    className="w-full resize-none rounded-xl border border-input bg-background p-4 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    autoFocus
                  />
                )}

                {/* Navigation */}
                <div className="mt-6 flex justify-between">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`ml-auto rounded-full ${step === 1 ? 'w-full' : ''}`}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : step === STEPS.length ? (
                      <>
                        Send message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      'Continue'
                    )}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Quick contact options */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Calendar, label: 'Schedule a call', value: 'cal.com/dani' },
            { icon: Mail, label: 'Email directly', value: 'hello@dani.dev' },
            { icon: MessageSquare, label: 'Quick question?', value: 'Twitter DM' },
          ].map((opt) => (
            <a
              key={opt.label}
              href="#"
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 transition-colors hover:border-gold/30"
            >
              <opt.icon className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs text-muted-foreground">{opt.label}</p>
                <p className="text-sm font-medium">{opt.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
