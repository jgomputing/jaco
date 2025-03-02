import Link from 'next/link';
import { ExtendedBlogPost } from '@/lib/types/blog';
import { FaCalendar, FaEye, FaArrowRight, FaChurch, FaTag, FaClock } from 'react-icons/fa';
import Image from 'next/image';

interface BlogCardProps {
  post: ExtendedBlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format date to show month and day
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Default church-themed images if the featured image is missing or broken
  const churchImages = [
    '/images/blog/church-worship.jpg',
    '/images/blog/church-community.jpg',
    '/images/blog/church-youth.jpg'
  ];
  
  // Get a consistent fallback image based on post ID
  const getFallbackImage = (): string => {
    const index = parseInt(post.id) % churchImages.length;
    return churchImages[index] || churchImages[0];
  };

  // Estimate reading time
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 h-full">
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Featured Image */}
      <div className="relative h-56 overflow-hidden">
        {post.featured_image ? (
          <img 
            src={post.featured_image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // If image fails to load, replace with fallback
              const target = e.target as HTMLImageElement;
              target.src = getFallbackImage();
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-blue-900/30 to-purple-900/20">
            <FaChurch className="text-blue-400 text-4xl" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded shadow-lg">
            {post.category_name}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Meta info */}
        <div className="flex items-center text-xs text-gray-400 mb-3 space-x-4">
          <span className="flex items-center">
            <FaCalendar className="mr-1.5" size={12} />
            {formatDate(post.created_at)}
          </span>
          <span className="flex items-center">
            <FaClock className="mr-1.5" size={12} />
            {readingTime} min read
          </span>
        </div>
        
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
            {post.excerpt}
          </p>
        )}
        
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
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto">
          <div className="flex items-center text-xs text-gray-400">
            <FaEye className="mr-1.5" size={12} />
            {post.views} views
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center"
          >
            Read More
            <FaArrowRight className="ml-1.5" size={12} />
          </Link>
        </div>
        
        {/* Read more link */}
        <Link 
          href={`/blog/${post.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Read more about ${post.title}`}
        />
      </div>
    </div>
  );
} 