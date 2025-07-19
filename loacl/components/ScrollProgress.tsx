
'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
      
      // Show scroll to top button when user has scrolled down 300px
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 z-50 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Circular progress indicator with scroll to top functionality */}
      <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative w-12 h-12">
          {/* Background circle */}
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="2"
              strokeDasharray="100, 100"
            />
          </svg>
          
          {/* Progress circle */}
          <svg className="absolute top-0 left-0 w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${scrollProgress}, 100`}
              className="transition-all duration-300 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content - clickable scroll to top button */}
          <button
            onClick={scrollToTop}
            className="absolute inset-0 bg-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm border border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            aria-label="Scroll to top"
          >
            <i className="ri-arrow-up-line text-gray-600 text-sm group-hover:text-blue-600 transition-colors duration-300"></i>
          </button>
          
          {/* Percentage text */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-gray-900/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
              {Math.round(scrollProgress)}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
