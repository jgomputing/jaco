'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85',
    title: "Spreading God's Love Through Music",
    subtitle: "Join JACO MUSICAL's spiritual journey through gospel music"
  },
  {
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85',
    title: "Worship With Us",
    subtitle: "Experience the power of praise and worship"
  },
  {
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85',
    title: "Latest Releases",
    subtitle: "Discover our newest gospel songs and performances"
  }
]

const slideVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-screen w-full overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            priority
            className="object-cover object-center transform-gpu"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-[2]" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/20 backdrop-blur-sm rounded-full">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              index === currentSlide 
                ? 'w-3 sm:w-4 h-3 sm:h-4 bg-[#3b82f6]' 
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
} 