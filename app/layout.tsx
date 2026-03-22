import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { PageLoader } from '@/components/page-loader'
import { ServiceWorker } from '@/components/service-worker'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

// ─── FONTS ────────────────────────────────────────────────
// Inter for body — clean, readable, professional
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

// Sora for headings — geometric, distinctive, modern
// TO UPGRADE: Replace with Cabinet Grotesk from fontshare.com for a rarer feel
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

// ─── SEO META ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Abdul R. — AI Chatbot & Automation Developer | Python | LangChain',
  description:
    'AI developer building custom chatbots, autonomous agents, and workflow automation. Python · LangChain · OpenAI · n8n · FastAPI. Based in Pakistan, working worldwide.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)'  },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Abdul R. — AI Chatbot & Automation Developer',
    description: 'Custom AI chatbots, agents & automation workflows. Python · LangChain · OpenAI · n8n',
    type: 'website',
    url: 'https://abdulr.vercel.app', // ← replace with your live URL
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul R. — AI Chatbot & Automation Developer',
    description: 'Custom AI chatbots, agents & automation workflows. Python · LangChain · OpenAI · n8n',
  },
  keywords: [
    'AI chatbot developer', 'LangChain developer', 'OpenAI integration',
    'Python automation', 'n8n automation', 'RAG chatbot', 'AI agent developer',
    'Pakistan freelancer', 'Upwork AI developer',
  ],
}

export const viewport: Viewport = {
  themeColor: '#0b0f17',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <ServiceWorker />
        <PageLoader />
        {/* Lenis smooth scroll wraps everything */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
