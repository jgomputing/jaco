import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCross, FaHeart, FaMusic, FaUsers } from 'react-icons/fa'

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-20 relative">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About JACO MUSICAL
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Discover our journey of spreading God's love through music and worship
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-lg sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Our Mission</h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                To spread the message of God's love through powerful gospel music and create unforgettable worship experiences that touch hearts and transform lives.
              </p>
            </div>

            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-lg sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Our Vision</h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                To be a leading voice in contemporary gospel music, reaching souls worldwide through innovative musical expressions of faith and worship.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-3 aspect-square flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-300">
                <FaCross className="text-[#3b82f6] text-2xl mb-2" />
                <span className="text-lg sm:text-2xl font-bold text-[#3b82f6]">10+</span>
                <span className="text-[10px] sm:text-xs text-white/60 text-center">Years of Ministry</span>
              </div>
              <div className="glass-card p-3 aspect-square flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-300">
                <FaHeart className="text-[#3b82f6] text-2xl mb-2" />
                <span className="text-lg sm:text-2xl font-bold text-[#3b82f6]">1000+</span>
                <span className="text-[10px] sm:text-xs text-white/60 text-center">Lives Touched</span>
              </div>
              <div className="glass-card p-3 aspect-square flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-300">
                <FaMusic className="text-[#3b82f6] text-2xl mb-2" />
                <span className="text-lg sm:text-2xl font-bold text-[#3b82f6]">20+</span>
                <span className="text-[10px] sm:text-xs text-white/60 text-center">Original Songs</span>
              </div>
              <div className="glass-card p-3 aspect-square flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-300">
                <FaUsers className="text-[#3b82f6] text-2xl mb-2" />
                <span className="text-lg sm:text-2xl font-bold text-[#3b82f6]">50+</span>
                <span className="text-[10px] sm:text-xs text-white/60 text-center">Gospel Events</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-[300px] sm:h-[400px] lg:h-[600px] relative"
          >
            <div className="grid grid-cols-2 gap-1.5 h-full">
              <div className="grid gap-1.5">
                <div className="relative rounded-lg overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85"
                    alt="Worship moment"
                    fill
                    className="object-cover transform-gpu group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <div className="relative rounded-lg overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85"
                    alt="Performance"
                    fill
                    className="object-cover transform-gpu group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
              </div>
              <div className="grid gap-1.5 pt-2">
                <div className="relative rounded-lg overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85"
                    alt="Studio session"
                    fill
                    className="object-cover transform-gpu group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <div className="relative rounded-lg overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=85"
                    alt="Concert"
                    fill
                    className="object-cover transform-gpu group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 