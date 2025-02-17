import React from 'react'
import Button from '@/components/common/Button'

export default function Newsletter() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter for the latest updates, new releases, and exclusive content.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg text-gray-900 flex-1 max-w-md"
            />
            <Button variant="secondary">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  )
} 