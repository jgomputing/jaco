'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="glass-effect rounded-2xl p-8 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-white">Something went wrong!</h2>
        <p className="text-gray-400 text-center max-w-md">
          {error.message || 'An unexpected error occurred while loading this page.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[#3b82f6] text-white rounded-xl hover:bg-[#2563eb] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 