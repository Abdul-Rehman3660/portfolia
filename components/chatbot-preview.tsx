'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── CONVERSATION SCRIPTS — shows what you actually build ──
const CONVERSATIONS = [
  {
    user: 'What are your refund policy terms?',
    thinking: 1800,
    bot: 'Based on your policy document: Full refund within 30 days of purchase. After 30 days, store credit only. Digital products are non-refundable once downloaded.',
    source: 'refund-policy.pdf',
  },
  {
    user: 'Summarise last quarter sales report',
    thinking: 2200,
    bot: 'Q3 2025 summary: Total revenue $842K (+18% YoY). Top product: Plan Pro at 43% of sales. Churn rate dropped to 3.2%. See full breakdown in the dashboard.',
    source: 'Q3-report.xlsx',
  },
  {
    user: 'Schedule a follow-up with Acme Corp',
    thinking: 1500,
    bot: 'Done. Follow-up call booked for Friday 2 PM with Acme Corp. Calendar invite sent to sarah@acme.com. CRM updated with status "In negotiation".',
    source: 'CRM + Calendar',
  },
]

type Stage = 'idle' | 'user' | 'thinking' | 'bot' | 'source'

export function ChatbotPreview() {
  const [convIdx, setConvIdx] = useState(0)
  const [stage, setStage] = useState<Stage>('idle')

  const conv = CONVERSATIONS[convIdx]

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>
    let t3: ReturnType<typeof setTimeout>
    let t4: ReturnType<typeof setTimeout>
    let t5: ReturnType<typeof setTimeout>

    // Sequence: idle → user msg → thinking → bot reply → source badge → next conv
    t1 = setTimeout(() => setStage('user'),    400)
    t2 = setTimeout(() => setStage('thinking'), 1600)
    t3 = setTimeout(() => setStage('bot'),      1600 + conv.thinking)
    t4 = setTimeout(() => setStage('source'),   1600 + conv.thinking + 600)
    t5 = setTimeout(() => {
      setStage('idle')
      setTimeout(() => {
        setConvIdx(i => (i + 1) % CONVERSATIONS.length)
        setStage('user')
      }, 500)
    }, 1600 + conv.thinking + 3800)

    return () => { [t1,t2,t3,t4,t5].forEach(clearTimeout) }
  }, [convIdx, conv.thinking])

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">

      {/* Phone / chat window frame */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">

        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/40">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-gold">AI</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-card" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Business Assistant</p>
            <p className="text-xs text-muted-foreground">Powered by your data</p>
          </div>
        </div>

        {/* Messages area */}
        <div className="px-4 py-4 space-y-3 min-h-[220px] flex flex-col justify-end">

          {/* User message */}
          <AnimatePresence mode="wait">
            {(stage === 'user' || stage === 'thinking' || stage === 'bot' || stage === 'source') && (
              <motion.div
                key={`user-${convIdx}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex justify-end"
              >
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-3.5 py-2.5">
                  <p className="text-sm text-background leading-relaxed">{conv.user}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thinking dots */}
          <AnimatePresence>
            {stage === 'thinking' && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-end gap-2"
              >
                <div className="h-7 w-7 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-gold">AI</span>
                </div>
                <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bot reply */}
          <AnimatePresence>
            {(stage === 'bot' || stage === 'source') && (
              <motion.div
                key={`bot-${convIdx}`}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex items-end gap-2"
              >
                <div className="h-7 w-7 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-gold">AI</span>
                </div>
                <div className="max-w-[82%]">
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                    <p className="text-sm text-foreground leading-relaxed">{conv.bot}</p>
                  </div>

                  {/* Source badge */}
                  <AnimatePresence>
                    {stage === 'source' && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <span className="text-[10px] text-gold font-medium">Source: {conv.source}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Input bar */}
        <div className="px-4 py-3 border-t border-border bg-secondary/20">
          <div className="flex items-center gap-2 rounded-xl bg-background border border-border px-3 py-2">
            <span className="flex-1 text-xs text-muted-foreground/50">Ask anything about your business...</span>
            <div className="h-6 w-6 rounded-lg bg-gold/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold rotate-90">
                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5,12 12,5 19,12"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-center"
      >
        <span className="text-xs text-muted-foreground">
          Live demo · answers from <span className="text-foreground font-medium">your data</span>
        </span>
      </motion.div>

    </div>
  )
}
