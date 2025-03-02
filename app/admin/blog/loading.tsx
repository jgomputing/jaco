export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-800/50 rounded-lg animate-pulse"></div>
        </div>
        <div className="h-10 w-36 bg-gray-800 rounded-xl animate-pulse"></div>
      </div>

      {/* Blog Posts List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="p-4 rounded-xl bg-gray-900/50 border border-white/5">
            <div className="flex items-start gap-4">
              {/* Thumbnail Skeleton */}
              <div className="w-24 h-24 rounded-lg bg-gray-800 animate-pulse"></div>

              {/* Content Skeleton */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-gray-800 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-800/50 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-6 w-24 bg-gray-800 rounded-full animate-pulse"></div>
                  <div className="h-6 w-32 bg-gray-800 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-24 bg-gray-800 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 