'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string | null;
}

export default function Pagination({ currentPage, totalPages, category }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    if (category) {
      params.set('category', category);
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`p-2 rounded-lg transition-colors ${
          currentPage <= 1
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        // Show first page, last page, current page, and pages around current page
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </Link>
          );
        }

        // Show dots for skipped pages
        if (
          page === currentPage - 2 ||
          page === currentPage + 2
        ) {
          return (
            <span key={page} className="px-4 py-2">
              ...
            </span>
          );
        }

        return null;
      })}

      <Link
        href={createPageUrl(currentPage + 1)}
        className={`p-2 rounded-lg transition-colors ${
          currentPage >= totalPages
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
} 