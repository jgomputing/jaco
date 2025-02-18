import React from 'react'
import Button from '@/components/common/Button'
import { motion } from 'framer-motion'
import { FaEnvelope } from 'react-icons/fa'

export default function Newsletter() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white rounded-full opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white rounded-full opacity-[0.03] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
            <FaEnvelope className="text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Stay Connected</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-white/90">
            Subscribe to our newsletter for the latest updates, new releases, and exclusive content.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 sm:px-6 py-3 rounded-xl text-gray-900 flex-1 max-w-md text-sm sm:text-base bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Button 
              variant="secondary"
              className="w-full sm:w-auto whitespace-nowrap text-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-sm"
            >
              Subscribe Now
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
} 