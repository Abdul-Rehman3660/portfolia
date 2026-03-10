/**
 * Performance Optimization Utilities
 */

// Preconnect to external domains
export function preloadExternalResources() {
  if (typeof document === 'undefined') return

  const preconnects = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cacuguwczoezvuqilvvl.supabase.co',
  ]

  preconnects.forEach((href) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  // Preload critical fonts
  const fontLinks = [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&display=swap',
      rel: 'stylesheet',
    },
  ]

  fontLinks.forEach(({ href, rel }) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    document.head.appendChild(link)
  })
}

// Lazy load images with Intersection Observer
export function setupLazyLoading() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

  const images = document.querySelectorAll('img[data-src]')
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.dataset.src
        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      }
    })
  }, { rootMargin: '50px' })

  images.forEach((img) => imageObserver.observe(img))
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Request Idle Callback wrapper
export function runOnIdle(callback: () => void) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => callback())
  } else {
    setTimeout(callback, 1)
  }
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check if user prefers dark mode
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Get connection info for adaptive loading
export function getConnectionInfo(): { effectiveType?: string; saveData?: boolean } {
  if (typeof navigator === 'undefined') return {}
  
  const connection = (navigator as any).connection
  if (!connection) return {}

  return {
    effectiveType: connection.effectiveType,
    saveData: connection.saveData,
  }
}

// Adaptive image quality based on connection
export function getImageQuality(): number {
  const { effectiveType, saveData } = getConnectionInfo()
  
  if (saveData) return 50
  if (effectiveType === '4g') return 90
  if (effectiveType === '3g') return 70
  if (effectiveType === '2g') return 50
  
  return 80
}
