import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  post: {
    title: string;
    excerpt: string;
    featuredImage: string;
    category: string;
    slug: string;
    createdAt: Date;
  };
}

const categoryColors = {
  events: 'bg-purple-500',
  worship: 'bg-blue-500',
  praise: 'bg-pink-500',
  news: 'bg-green-500',
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={post.featuredImage || '/images/placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 text-sm text-white rounded-full ${categoryColors[post.category as keyof typeof categoryColors] || 'bg-gray-500'}`}>
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.createdAt.toISOString()}>
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
} 