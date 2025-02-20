'use client'

import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import MediaSection from '@/components/sections/MediaSection'
import BlogSection from '@/components/sections/BlogSection'
import ContactSection from '@/components/sections/ContactSection'
import FooterSection from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b82f6]/10 via-black/0 to-transparent" />
      </div>

      {/* Content Sections */}
      <div className="relative flex flex-col min-h-screen">
        {/* Hero - Full screen with video background */}
        <div className="relative min-h-screen">
          <HeroSection />
        </div>

        {/* About - Offset grid layout */}
        <div className="relative py-20">
          <AboutSection />
        </div>

        {/* Media - Full width with dynamic background */}
        <div className="relative">
          <MediaSection />
        </div>

        {/* Blog - Alternating layout */}
        <div className="relative py-20 bg-gradient-to-b from-black via-black/95 to-black">
          <BlogSection />
        </div>

        {/* Contact - Clean layout with map */}
        <div className="relative py-20">
          <ContactSection />
        </div>

        {/* Footer */}
        <FooterSection />
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white/60 text-sm font-medium">
        <div className="absolute inset-1 rounded-full border-2 border-[#3b82f6] border-r-transparent rotate-45" />
        <span className="rotate-45">↑</span>
      </div>
    </main>
  )
} 