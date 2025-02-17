import React from 'react'
import { MUSIC_PLATFORMS } from '@/constants'

export default function MusicShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Listen Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MUSIC_PLATFORMS.map((platform) => (
            <div key={platform.name} className="aspect-video">
              <iframe
                src={platform.embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`Listen on ${platform.name}`}
                className="rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 