'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaPlay, FaYoutube } from 'react-icons/fa'

interface VideoCardProps {
  video: {
    id: string | number
    title: string
    thumbnail: string
    duration: string
    description: string
    youtubeId?: string
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-white/10 transition-all duration-300">
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm">
          {video.duration}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`https://youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-lg hover:bg-[#ff1a1a] transition-colors"
          >
            <FaPlay size={24} />
          </Link>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
          {video.title}
        </h3>
        <p className="text-white/60 text-sm mb-4">
          {video.description}
        </p>

        <Link
          href={`https://youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF0000] transition-colors text-sm"
        >
          <FaYoutube size={20} />
          Watch on YouTube
        </Link>
      </div>
    </div>
  )
} 