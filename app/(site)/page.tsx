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
    <main className="min-h-screen bg-black">
      <HeroSection />
      <div className="mt-16 md:mt-24 lg:mt-34">
        <div className="space-y-16 md:space-y-24 lg:space-y-34">
          <AboutSection />
          <MediaSection />
          <BlogSection />
          <ContactSection />
        </div>
      </div>
      <div className="mt-16 md:mt-24 lg:mt-34">
        <FooterSection />
      </div>
    </main>
  )
} 