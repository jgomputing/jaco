'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

export default function StorySection() {
  return (
    <section id="story" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/jaco_02.jpg"
                alt="Our Story"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Our <span className="text-[#3b82f6]">Story</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Our journey began with a simple yet profound calling to spread the message of hope and faith through music. What started as humble worship sessions has grown into a global ministry reaching hearts across continents.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#3b82f6] font-bold">01</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Ministry Beginnings</h3>
                  <p className="text-white/60">First worship album release and local church performances</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#3b82f6] font-bold">02</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Global Outreach</h3>
                  <p className="text-white/60">Expanded to international ministry through virtual concerts</p>
                </div>
              </div>
            </div>
            <a
              href="/story.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#3b82f6] text-white rounded-xl hover:bg-[#3b82f6]/90 transition-all duration-300 group"
            >
              Read Our Full Story
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 