'use client'

import { useState, useEffect } from 'react'
import { Titillium_Web } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-titillium-web',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <html lang="en" className={titilliumWeb.className}>
      <head>
        <title>JACO MUSICAL - Gospel Music & Worship</title>
        <meta name="description" content="Experience powerful gospel music and worship with JACO MUSICAL. Join us in our journey of faith through music, live performances, and ministry." />
        <meta name="keywords" content="gospel music, worship, christian music, live performances, ministry, JACO MUSICAL" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="JACO MUSICAL - Gospel Music & Worship" />
        <meta property="og:description" content="Experience powerful gospel music and worship with JACO MUSICAL. Join us in our journey of faith through music, live performances, and ministry." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Background Decorative Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Top-right orb */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3b82f6] rounded-full opacity-10 blur-3xl animate-pulse" />
          
          {/* Bottom-left orb */}
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse" />
          
          {/* Center orb */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full opacity-5 blur-3xl" />
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full opacity-5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full opacity-5 blur-3xl animate-pulse" />
        </div>

        {/* Main Content Wrapper */}
        <div className="relative min-h-screen bg-gradient-to-b from-black via-black/95 to-black">
          <Navbar isScrolled={isScrolled} />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 