'use client'

import { useEffect } from 'react'
import { preloadExternalResources, setupLazyLoading } from '@/lib/performance'

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload external resources
    preloadExternalResources()

    // Setup lazy loading for images
    setupLazyLoading()

    // Add resource hints for critical resources
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://*.supabase.co', crossOrigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://vercel.live', crossOrigin: 'anonymous' },
      ]

      hints.forEach(({ rel, href, crossOrigin }) => {
        const link = document.createElement('link')
        link.rel = rel
        link.href = href
        if (crossOrigin) link.crossOrigin = crossOrigin
        document.head.appendChild(link)
      })
    }

    // Optimize loading by deferring non-critical work
    const optimizeLoading = () => {
      // Defer non-critical CSS
      const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])')
      nonCriticalCSS.forEach((link) => {
        const linkElement = link as HTMLLinkElement
        linkElement.media = 'print'
        linkElement.onload = () => {
          linkElement.media = 'all'
        }
      })

      // Preload critical images
      const criticalImages = document.querySelectorAll('img[data-critical]')
      criticalImages.forEach((img) => {
        const imgElement = img as HTMLImageElement
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = imgElement.src
        link.as = 'image'
        document.head.appendChild(link)
      })
    }

    // Run optimizations after initial load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        addResourceHints()
        optimizeLoading()
      })
    } else {
      addResourceHints()
      optimizeLoading()
    }

    // Monitor performance
    if ('PerformanceObserver' in window) {
      try {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.log('LCP:', lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // Monitor First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Monitor Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          })
          console.log('CLS:', clsValue)
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.warn('Performance monitoring not fully supported')
      }
    }
  }, [])

  return null
}