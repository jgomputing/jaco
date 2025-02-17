import React from 'react'
import Link from 'next/link'
import BlogCard from '@/components/common/BlogCard'
import { LATEST_BLOG_POSTS } from '@/constants'

export default function LatestBlog() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Latest Blog Posts</h2>
          <Link 
            href="/blog" 
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All Posts
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LATEST_BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
} 