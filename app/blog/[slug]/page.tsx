'use client';

import React, { useState, useEffect } from 'react';
import { BlogService } from '@/lib/services/blog';
import { ExtendedBlogPost } from '@/lib/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaUser, FaTag, FaEye, FaArrowLeft, FaFolder, FaClock, FaShare, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import BlogCard from '@/components/blog/BlogCard';
import FooterSection from '@/components/sections/FooterSection';

// Default church-themed images for fallback
const fallbackImages = [
  '/images/blog/church-worship.jpg',
  '/images/blog/church-community.jpg',
  '/images/blog/church-youth.jpg'
];

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<ExtendedBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<ExtendedBlogPost[]>([]);
  const [morePosts, setMorePosts] = useState<ExtendedBlogPost[]>([]);

  // Format date to show month and day
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Get a fallback image based on post ID
  const getFallbackImage = (id: string): string => {
    const index = parseInt(id, 10) % fallbackImages.length;
    // Ensure we always return a string by providing a default fallback
    return fallbackImages[index >= 0 ? index : 0] || fallbackImages[0];
  };

  useEffect(() => {
    if (params && params.slug) {
      loadPost();
      loadRelatedPosts();
      loadMorePosts();
    }
  }, [params?.slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      if (!params || !params.slug) return;
      
      const data = await BlogService.getPostBySlug(params.slug as string);
      setPost(data);
      // Increment views after a short delay
      setTimeout(() => {
        BlogService.incrementViews(data.id);
      }, 5000);
    } catch (error) {
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedPosts = async () => {
    try {
      if (!params || !params.slug) return;
      
      const data = await BlogService.getRelatedPosts(params.slug as string);
      setRelatedPosts(data);
    } catch (error) {
      console.error('Failed to load related posts', error);
    }
  };

  const loadMorePosts = async () => {
    try {
      const response = await BlogService.getPosts({
        status: 'published',
        limit: 6
      });
      
      // Filter out the current post if it exists
      const filteredPosts = response.posts.filter(p => 
        params && params.slug ? p.slug !== params.slug : true
      );
      
      setMorePosts(filteredPosts);
    } catch (error) {
      console.error('Failed to load more posts', error);
    }
  };

  // Estimate reading time
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
            <div className="h-8 bg-white/10 rounded w-3/4"></div>
            <div className="h-64 bg-white/5 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
              <div className="h-4 bg-white/10 rounded w-full"></div>
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl text-red-400 mb-4">Error</h2>
            <p className="text-gray-400 text-lg mb-8">{error || 'Blog post not found'}</p>
            <Link 
              href="/#blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Head>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.excerpt || ''} />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
        {post.featured_image && (
          <meta property="og:image" content={post.featured_image} />
        )}
      </Head>

      {/* Hero Section with Featured Image */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900 z-10"></div>
        <Image 
          src={post.featured_image || getFallbackImage(post.id)}
          alt={post.title}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            // If image fails to load, use a fallback
            const target = e.target as HTMLImageElement;
            target.src = getFallbackImage(post.id);
          }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <Link href="/#blog" className="inline-flex items-center mb-6 text-blue-400 hover:text-blue-300 transition-colors">
              <FaArrowLeft className="mr-2" /> Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/80">
              <span className="flex items-center">
                <FaUser className="mr-2" />
                {post.author_name}
              </span>
              <span className="flex items-center">
                <FaCalendar className="mr-2" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center">
                <FaClock className="mr-2" />
                {readingTime} min read
              </span>
              <span className="flex items-center">
                <FaEye className="mr-2" />
                {post.views} views
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <FaFolder className="mr-2" />
              {post.category_name}
            </span>
            
            {post.tags && post.tags.length > 0 && (
              post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center">
                  <FaTag className="mr-1 text-gray-400" size={10} />
                  {tag}
                </span>
              ))
            )}
          </div>
          
          {/* Social Share */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-800">
            <span className="text-white/60">Share:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-8 h-8 rounded-full bg-[#3b5998]/20 flex items-center justify-center text-[#3b5998] hover:bg-[#3b5998]/30 transition-colors">
              <FaFacebook />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-8 h-8 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2]/30 transition-colors">
              <FaTwitter />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-8 h-8 rounded-full bg-[#0077B5]/20 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5]/30 transition-colors">
              <FaLinkedin />
            </a>
          </div>
          
          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-10">
              <p className="text-xl text-white/80 italic leading-relaxed border-l-4 border-blue-500 pl-6 py-2">
                {post.excerpt}
              </p>
            </div>
          )}
          
          {/* Content */}
          <article className="prose prose-invert prose-lg max-w-none 
                             prose-headings:font-bold prose-headings:text-white prose-headings:leading-tight
                             prose-p:text-white/80 prose-p:leading-relaxed
                             prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                             prose-strong:text-white prose-strong:font-semibold
                             prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/10 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                             prose-img:rounded-xl prose-img:shadow-lg">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
        
        {/* Church Content Notice */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/20 border-l-4 border-blue-500 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Church Blog</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              This article is part of our church blog featuring content about worship services, youth ministry activities, and community outreach programs.
              Check back regularly for updates on church events and spiritual guidance.
            </p>
          </div>
        </div>
        
        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Related Posts</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Explore more content related to this topic from our church blog
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
        
        {/* More Blog Posts Section */}
        {morePosts.length > 0 && (
          <div className="mt-20 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">More From Our Blog</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Discover more inspiring content from our church community
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {morePosts.slice(0, 3).map((morePost) => (
                <BlogCard key={morePost.id} post={morePost} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Section */}
      <FooterSection />
    </div>
  );
} 