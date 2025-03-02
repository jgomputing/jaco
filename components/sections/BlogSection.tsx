'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BlogService } from '@/lib/services/blog'
import { ExtendedBlogPost } from '@/lib/types/blog'
import { FaSpinner, FaCalendar, FaTag, FaClock } from 'react-icons/fa'

const events = [
  {
    id: 1,
    title: "Easter Sunday Celebration",
    description: "Join us for a special Easter service celebrating the resurrection of Christ with worship and fellowship.",
    date: "March 31, 2024"
  },
  {
    id: 2,
    title: "Community Outreach Day",
    description: "Serve our local community through various outreach programs and activities. Everyone is welcome to participate.",
    date: "March 15, 2024"
  },
  {
    id: 3,
    title: "Prayer & Worship Night",
    description: "An evening dedicated to prayer, worship, and spiritual renewal. Come experience God's presence together.",
    date: "March 8, 2024"
  }
]

// Default church-themed images for fallback
const defaultImages = [
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80",
  "https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=1422&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
];

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<ExtendedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        // Fetch only published posts with a limit of 3, sorted by publication date
        const response = await BlogService.getPosts({
          status: 'published',
          limit: 3,
          sort_by: 'published_at',
          sort_order: 'desc'
        });
        setBlogPosts(response.posts);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to get a fallback image based on post ID
  const getFallbackImage = (id: string): string => {
    const index = parseInt(id, 10) % defaultImages.length;
    // Ensure we always return a string by providing a default fallback
    return defaultImages[index >= 0 ? index : 0] || defaultImages[0];
  };

  // Estimate reading time
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <section id="blog" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Blog Posts Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Latest from Our <span className="text-[#3b82f6]">Blog</span>
              </h2>
              <p className="text-white/60">
                Stay updated with our latest news, events, and spiritual insights.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-[#3b82f6] text-4xl" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-white/60 text-center">No blog posts available</div>
            ) : (
              <div className="space-y-8">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="relative w-full md:w-2/5 h-56 md:h-auto overflow-hidden">
                        <Image
                          src={post.featured_image ? post.featured_image : getFallbackImage(post.id)}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            // If image fails to load, use fallback
                            const target = e.target as HTMLImageElement;
                            target.src = getFallbackImage(post.id);
                          }}
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r md:from-black/50 md:to-transparent"></div>
                        
                        {/* Category badge - mobile */}
                        <div className="absolute top-4 right-4 md:hidden">
                          <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded shadow-lg">
                            {post.category_name}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                        <div>
                          {/* Meta info */}
                          <div className="flex items-center justify-between mb-3">
                            {/* Category - desktop */}
                            <span className="hidden md:inline-block bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded shadow-lg">
                              {post.category_name}
                            </span>
                            
                            {/* Date and reading time */}
                            <div className="flex items-center text-xs text-gray-400 space-x-4">
                              <span className="flex items-center">
                                <FaCalendar className="mr-1.5" size={12} />
                                {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
                              </span>
                              <span className="flex items-center">
                                <FaClock className="mr-1.5" size={12} />
                                {calculateReadingTime(post.content)} min read
                              </span>
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                            {post.excerpt}
                          </p>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full inline-flex items-center">
                                  <FaTag className="mr-1 text-gray-400" size={8} />
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">
                                  +{post.tags.length - 2} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div className="flex items-center text-xs text-gray-400">
                            <span>{post.views} views</span>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                          >
                            Read Article
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    {/* Full card link overlay */}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="absolute inset-0 z-0"
                      aria-label={`Read more about ${post.title}`}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Events/Updates Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Latest <span className="text-[#3b82f6]">Updates</span>
              </h2>
              <p className="text-white/60">
                Stay informed about our upcoming events and church activities.
              </p>
            </motion.div>

            <div className="space-y-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/10 rounded-xl p-3 text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-400 text-sm font-medium mb-1">{event.date}</p>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-400">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 