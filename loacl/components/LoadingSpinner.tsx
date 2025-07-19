'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-orange-500"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-orange-100 to-orange-200 rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 font-poppins">Loading Stories</h3>
        <p className="text-gray-500">Fetching the latest from Hacker News...</p>
      </div>

      <div className="mt-8 flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
