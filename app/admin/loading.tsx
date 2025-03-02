'use client';

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="glass-effect rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="animate-spin h-8 w-8 border-4 border-[#3b82f6] border-t-transparent rounded-full" />
        <p className="text-white/70 text-sm animate-pulse">Loading content...</p>
      </div>
    </div>
  );
} 