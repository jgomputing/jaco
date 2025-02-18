import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaHeart, FaMusic, FaPrayingHands, FaChurch, FaMicrophone, FaGlobe, FaQuoteLeft } from 'react-icons/fa'

// Stats Data
const MINISTRY_STATS = [
  { label: 'Years in Ministry', value: '10+' },
  { label: 'Songs Released', value: '50+' },
  { label: 'Live Performances', value: '200+' },
  { label: 'Lives Touched', value: '10K+' }
]

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#3b82f6] rounded-full opacity-[0.07] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-[0.07] blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-4"
        >
          <span className="text-[#3b82f6] uppercase tracking-wider text-xs sm:text-sm font-medium">Our Story</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
            Transforming Lives Through 
            <span className="text-[#3b82f6]"> Gospel Music</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70">
            A journey of faith, music, and ministry dedicated to spreading God's love through powerful worship experiences.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 md:mb-20 px-4">
          {/* Left Column - Image & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-start"
          >
            {/* Main Image Container */}
            <div className="relative w-[280px] sm:w-[300px] aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=85"
                alt="Jaco Osijaye"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
            </div>

            {/* Quote Card - Repositioned for mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="sm:absolute sm:-bottom-8 sm:-right-8 bg-[#3b82f6] p-4 rounded-2xl shadow-xl w-[280px] sm:w-auto sm:max-w-[250px]"
            >
              <FaQuoteLeft className="text-white/20 text-2xl sm:text-4xl absolute top-4 left-4" />
              <p className="text-white text-base sm:text-lg font-medium relative z-10 mt-6 sm:mt-0">
                "Music is more than sound—it's a divine connection that brings hearts closer to God."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="text-white">
                  <div className="font-semibold text-sm sm:text-base">Jaco Osijaye</div>
                  <div className="text-xs sm:text-sm text-white/80">Gospel Artist & Minister</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {MINISTRY_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#3b82f6] mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-[#3b82f6]/10 to-transparent p-4 sm:p-6 rounded-2xl border border-[#3b82f6]/20">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                To create transformative worship experiences that bridge hearts to heaven, fostering genuine encounters with God's presence through music and ministry.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ministry Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
          {[
            { icon: FaMicrophone, title: 'Gospel Artist', desc: 'Creating spirit-filled music that touches hearts and transforms lives.' },
            { icon: FaChurch, title: 'Worship Leader', desc: 'Leading congregations into God\'s presence through anointed worship.' },
            { icon: FaPrayingHands, title: 'Minister', desc: 'Sharing God\'s message of hope and salvation through ministry.' },
            { icon: FaGlobe, title: 'Global Impact', desc: 'Reaching hearts across continents through digital platforms.' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group hover:bg-[#3b82f6] bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#3b82f6]/10 group-hover:bg-white/10 flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300">
                <item.icon className="text-[#3b82f6] group-hover:text-white text-xl sm:text-2xl transition-all duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base text-white/70 group-hover:text-white/90 transition-all duration-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 