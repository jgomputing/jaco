import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { FaCalendar } from 'react-icons/fa'

interface BlogCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    date?: string
    createdAt?: string | Date
    image: string
    slug: string
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const displayDate = post.createdAt || post.date

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-[16/9]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <FaCalendar className="text-blue-600" />
          <time>{displayDate ? formatDate(displayDate) : 'No date available'}</time>
        </div>
        <h3 className="text-xl font-semibold mt-2 mb-3">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Read More
        </Link>
      </div>
    </article>
  )
} 