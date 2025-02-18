import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { NAVIGATION_LINKS } from '@/constants'
import { IMAGES } from '@/constants/images'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full py-3 sm:py-4 px-4 sm:px-8 shadow-md backdrop-blur-md bg-black/80 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center relative z-20">
          <div className="relative w-[120px] sm:w-[150px] h-[40px] sm:h-[50px]">
            <Image
              src={IMAGES.logo}
              alt="Website Logo"
              fill
              sizes="(max-width: 640px) 120px, 150px"
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden relative z-20 p-2 text-white hover:text-[#3b82f6] transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex gap-6">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  className="text-white hover:text-[#3b82f6] transition-colors text-sm sm:text-base"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.nav
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 w-[280px] bg-black/95 backdrop-blur-md z-10 p-8 pt-24"
              >
                <ul className="flex flex-col gap-4">
                  {NAVIGATION_LINKS.map((link) => (
                    <li key={link.path}>
                      <Link 
                        href={link.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white hover:text-[#3b82f6] transition-colors block py-2 text-lg"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 