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
    const style = document.createElement('style')
    style.textContent = ' '
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-[#030712]">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0f1729] via-[#0f1729]/80 to-[#030712] opacity-80" />
        
        {/* Soft grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                             linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Subtle accent gradients */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#3b82f6]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#3b82f6]/5 to-transparent" />
      </div>

      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
} 