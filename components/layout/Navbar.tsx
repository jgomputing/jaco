'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaBlog, FaEnvelope, FaBars, FaTimes, FaYoutube, FaSpotify, FaInstagram, FaHeart, FaVideo, FaStore, FaHome } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

// Navigation Links
const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Media', path: '/#media' },
  { name: 'Blog', path: '/#blog' },
  { name: 'Contact', path: '/#contact' }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      e.preventDefault()
      const targetId = path.replace('/#', '')
      const targetElement = document.getElementById(targetId)
      
      if (targetElement && pathname === '/') {
        const navbarHeight = 80 // Height of your fixed navbar
        const targetPosition = targetElement.offsetTop - navbarHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
        
        setIsMobileMenuOpen(false)
      } else if (pathname !== '/') {
        // If we're not on the homepage, first navigate to home then scroll
        window.location.href = path
      }
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl shadow-xl' : 'bg-transparent'
        }`}
      >
        <nav className="container py-4 flex items-center justify-between">
          <Link href="/" className="block">
            <div className={`relative transition-all duration-500 hover:scale-105 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}>
              <Image
                src="/images/logo/main_logo.png"
                alt="JACO MUSICAL"
                width={100}
                height={100}
                className="rounded-full"
                priority
              />
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link 
                href="/" 
                className="relative text-white/80 hover:text-white transition-colors group"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#3b82f6] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
            <li>
              <Link 
                href="/#about" 
                className="relative text-white/80 hover:text-white transition-colors group"
              >
                <span className="relative z-10">About</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#3b82f6] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
            <li>
              <Link 
                href="/#media" 
                className="relative text-white/80 hover:text-white transition-colors group"
              >
                <span className="relative z-10">Media</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#3b82f6] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
            <li>
              <Link 
                href="/#blog" 
                className="relative text-white/80 hover:text-white transition-colors group"
              >
                <span className="relative z-10">Blog</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#3b82f6] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
            <li>
              <Link 
                href="/#contact" 
                className="relative text-white/80 hover:text-white transition-colors group"
              >
                <span className="relative z-10">Contact</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#3b82f6] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </li>
          </ul>

          <div className="md:hidden">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <FaBars size={24} className="text-white" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-4 right-4 w-[240px] bg-gradient-to-b from-[#3b82f6]/95 to-[#2563eb]/95 backdrop-blur-md z-50 md:hidden rounded-2xl shadow-xl border border-white/10"
            >
              <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-end p-3 border-b border-white/10">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="p-2">
                  {NAVIGATION_LINKS.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.path}
                        onClick={(e) => {
                          handleNavClick(e, link.path)
                          setIsMobileMenuOpen(false)
                        }}
                        className="py-2 px-3 text-sm text-white/90 hover:text-white flex items-center gap-3 group rounded-lg hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          {link.name === 'Home' && <FaHome size={12} />}
                          {link.name === 'About' && <FaHeart size={12} />}
                          {link.name === 'Media' && <FaVideo size={12} />}
                          {link.name === 'Blog' && <FaBlog size={12} />}
                          {link.name === 'Contact' && <FaEnvelope size={12} />}
                        </span>
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="p-3 border-t border-white/10">
                  <div className="flex gap-2 justify-center">
                    <a href="https://www.youtube.com/@jacoosijaye" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors">
                      <FaYoutube size={14} />
                    </a>
                    <a href="https://www.instagram.com/jacomusicals/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors">
                      <FaInstagram size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 