import React from 'react'
import OptimizedImage from '@/components/common/OptimizedImage'
import Button from '@/components/common/Button'

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full">
      <OptimizedImage
        src={process.env.NEXT_PUBLIC_HERO_IMAGE || ''}
        alt="Modern office workspace"
        priority
        className="h-full w-full"
      />
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome to Our Website</h1>
            <p className="text-xl mb-8">Discover amazing content and services</p>
            <Button variant="primary" className="mr-4">
              Get Started
            </Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  )
} 