import React from 'react'
import OptimizedImage from '@/components/common/OptimizedImage'
import Button from '@/components/common/Button'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full">
      <OptimizedImage
        src={process.env.NEXT_PUBLIC_HERO_IMAGE || ''}
        alt="Modern office workspace"
        priority
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70">
        <div className="container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white py-12 sm:py-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Welcome to Our Website
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90">
              Discover amazing content and services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button 
                variant="primary" 
                className="w-full sm:w-auto text-center justify-center"
              >
                Get Started
              </Button>
              <Button 
                variant="secondary"
                className="w-full sm:w-auto text-center justify-center"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 