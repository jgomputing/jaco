'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="glass-effect rounded-2xl p-8 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-white">Page Not Found</h2>
        <p className="text-gray-400 text-center max-w-md">
          Could not find the requested page.
        </p>
        <Link
          href="/admin"
          className="px-4 py-2 bg-[#3b82f6] text-white rounded-xl hover:bg-[#2563eb] transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
} 