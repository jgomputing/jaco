import React from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import { IMAGES } from '@/constants/images'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 relative">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            About JACO MUSICAL
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Discover our journey of spreading God's love through music and worship
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">Our Mission</h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                To spread the message of God's love through powerful gospel music and create unforgettable worship experiences that touch hearts and transform lives.
              </p>
            </div>

            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">Our Vision</h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                To be a leading voice in contemporary gospel music, reaching souls worldwide through innovative musical expressions of faith and worship.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="glass-card aspect-square sm:aspect-auto sm:p-4 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-300">
                <div className="w-8 h-8 mb-2 text-[#3b82f6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                  </svg>
                </div>
                <span className="block text-xl sm:text-2xl font-bold text-[#3b82f6] mb-1">10+</span>
                <span className="text-[10px] sm:text-xs text-white/60">Years Experience</span>
              </div>
              <div className="glass-card aspect-square sm:aspect-auto sm:p-4 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-300">
                <div className="w-8 h-8 mb-2 text-[#3b82f6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"/>
                  </svg>
                </div>
                <span className="block text-xl sm:text-2xl font-bold text-[#3b82f6] mb-1">50+</span>
                <span className="text-[10px] sm:text-xs text-white/60">Live Events</span>
              </div>
              <div className="glass-card aspect-square sm:aspect-auto sm:p-4 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-300">
                <div className="w-8 h-8 mb-2 text-[#3b82f6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <span className="block text-xl sm:text-2xl font-bold text-[#3b82f6] mb-1">100+</span>
                <span className="text-[10px] sm:text-xs text-white/60">Songs Written</span>
              </div>
              <div className="glass-card aspect-square sm:aspect-auto sm:p-4 flex flex-col items-center justify-center group hover:bg-white/10 transition-all duration-300">
                <div className="w-8 h-8 mb-2 text-[#3b82f6]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <span className="block text-xl sm:text-2xl font-bold text-[#3b82f6] mb-1">20K+</span>
                <span className="text-[10px] sm:text-xs text-white/60">Lives Touched</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 h-fit"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="aspect-square sm:aspect-[4/3] relative rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85"
                  alt="Worship moment"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <div className="aspect-square sm:aspect-[4/3] relative rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85"
                  alt="Performance"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-12">
              <div className="aspect-square sm:aspect-[4/3] relative rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85"
                  alt="Studio session"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <div className="aspect-square sm:aspect-[4/3] relative rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=85"
                  alt="Concert"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 