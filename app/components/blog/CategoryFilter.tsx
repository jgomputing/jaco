'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface CategoryFilterProps {
  currentCategory?: string | null;
}

const categories = [
  { value: '', label: 'All' },
  { value: 'events', label: 'Events' },
  { value: 'worship', label: 'Worship' },
  { value: 'praise', label: 'Praise' },
  { value: 'news', label: 'News' },
];

const categoryColors = {
  events: 'bg-purple-500',
  worship: 'bg-blue-500',
  praise: 'bg-pink-500',
  news: 'bg-green-500',
};

export default function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset page when changing category
    return params.toString();
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const isActive = currentCategory === category.value;
        const color = category.value ? categoryColors[category.value as keyof typeof categoryColors] : 'bg-gray-500';
        
        return (
          <Link
            key={category.value}
            href={`${pathname}?${createQueryString(category.value)}`}
            className={`px-4 py-2 rounded-full transition-all ${
              isActive
                ? `${color} text-white ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-white/20`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
} 