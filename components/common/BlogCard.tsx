import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: {
    id: string
    title: string
    excerpt: string
    date: string
    image: string
    slug: string
  }
}

export default function BlogCard({ post }: BlogCardProps) {
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
        <time className="text-sm text-gray-500">{formatDate(post.date)}</time>
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