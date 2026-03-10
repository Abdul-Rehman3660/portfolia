import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PageLoader } from '@/components/page-loader'
import { CustomCursor } from '@/components/custom-cursor'
import { ServiceWorker } from '@/components/service-worker'
import { PerformanceOptimizer } from '@/components/performance-optimizer'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Abdul Rehman — Full-Stack Developer & AI Engineer',
  description:
    'Full-Stack Developer & AI Engineer specializing in modern web technologies, React, Next.js, and AI integration.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Abdul Rehman — Full-Stack Developer & AI Engineer',
    description: 'Full-Stack Developer & AI Engineer specializing in modern web technologies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Rehman — Full-Stack Developer & AI Engineer',
    description: 'Full-Stack Developer & AI Engineer specializing in modern web technologies',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <PerformanceOptimizer />
        <ServiceWorker />
        <PageLoader />
        <CustomCursor />
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
