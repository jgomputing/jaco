'use client'

import React from 'react'
import HeroSlider from '@/components/common/HeroSlider'
import Button from '@/components/common/Button'
import SocialLinks from '@/components/common/SocialLinks'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaPlay, FaMusic, FaVideo, FaChevronDown } from 'react-icons/fa'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24">
      <HeroSlider />
      
      {/* Main Content */}
      <div className="absolute inset-0 z-10 flex flex-col pt-24">
        {/* Hero Content */}
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
            <div className="max-w-6xl pt-4 md:pt-6">
              <div className="space-y-6 md:space-y-8">
                {/* Main Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl">
                    <span className="inline-block">Spreading</span>{" "}
                    <span className="inline-block text-[#3b82f6]">
                      God's Love
                    </span>{" "}
                    <span className="inline-block">Through Music</span>
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <p className="text-xl text-white/80 font-light leading-relaxed">
                    Join JACO MUSICAL on a spiritual journey through gospel music. Available for church events, gospel concerts, and special occasions. Let's create an unforgettable worship experience together.
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link 
                    href="/videos"
                    className="inline-flex items-center gap-3 px-8 py-4 text-lg bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                  >
                    <FaVideo className="text-xl" />
                    Watch Our Videos
                  </Link>
                  <Link 
                    href="/#music"
                    className="inline-flex items-center gap-3 px-8 py-4 text-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300 rounded-full"
                  >
                    <FaMusic className="text-xl" />
                    Listen Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ 
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-1"
          >
            <FaChevronDown className="text-white/60 text-xl" />
            <FaChevronDown className="text-white/40 text-xl -mt-3" />
          </motion.div>
          <span className="text-white/60 text-sm">Scroll Down</span>
        </motion.div>
      </div>
    </section>
  )
} 