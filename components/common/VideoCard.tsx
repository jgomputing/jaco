'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FaYoutube, FaShare } from 'react-icons/fa'
import ShareModal from './ShareModal'
import SuggestModal from './SuggestModal'

interface VideoCardProps {
  video: {
    title: string
    thumbnail: string
    youtubeId: string
  }
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          <a
            href={`https://youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-red-700"
          >
            <FaYoutube size={24} />
            Watch on YouTube
          </a>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4">{video.title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <FaShare size={16} />
              Share
            </button>
            <a
              href={`https://youtube.com/channel/YOUR_CHANNEL_ID?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700"
            >
              Subscribe
            </a>
          </div>
          <button
            onClick={() => setIsSuggestModalOpen(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Suggest Better
          </button>
        </div>
      </div>
      
      {isShareModalOpen && (
        <ShareModal
          url={`https://youtube.com/watch?v=${video.youtubeId}`}
          title={video.title}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
      
      {isSuggestModalOpen && (
        <SuggestModal
          currentVideo={video.title}
          onClose={() => setIsSuggestModalOpen(false)}
        />
      )}
    </div>
  )
} 