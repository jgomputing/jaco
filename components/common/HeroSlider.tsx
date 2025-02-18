'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85',
    title: "Jaco Osijaye",
    subtitle: "Transforming Lives Through Gospel Music & Worship"
  },
  {
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85',
    title: "Worship With Us",
    subtitle: "Join us in experiencing God's presence through praise"
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
    <div className="absolute inset-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80 z-[2]" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators - Repositioned and Restyled */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-2 bg-[#3b82f6]' 
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
} 