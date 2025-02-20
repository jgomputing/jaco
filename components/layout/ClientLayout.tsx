'use client'

import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import BackgroundEffects from '@/components/layout/BackgroundEffects'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Force a re-render of styles
    const style = document.createElement('style')
    style.textContent = ' '
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black via-black/95 to-black">
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
} 