
'use client';

import { useState } from 'react';

interface Story {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
}

interface NewsCardProps {
  story: Story;
  index: number;
}

export default function NewsCard({ story, index }: NewsCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    if (story.url) {
      window.open(story.url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://news.ycombinator.com/item?id=${story.id}`, '_blank', 'noopener,noreferrer');
    }
  };

  const getAuthorInitials = (author: string) => {
    return author.substring(0, 2).toUpperCase();
  };

  const getAuthorColor = (author: string) => {
    const colors = [
      'from-purple-400 to-purple-500',
      'from-blue-400 to-blue-500',
      'from-green-400 to-green-500',
      'from-yellow-400 to-yellow-500',
      'from-pink-400 to-pink-500',
      'from-indigo-400 to-indigo-500',
      'from-red-400 to-red-500',
      'from-teal-400 to-teal-500'
    ];
    let hash = 0;
    for (let i = 0; i < author.length; i++) {
      hash = author.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getCategoryTag = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence') || lowerTitle.includes('machine learning')) {
      return { name: 'AI', color: 'from-purple-500 to-purple-600', icon: 'ri-robot-line' };
    }
    if (lowerTitle.includes('startup') || lowerTitle.includes('founder') || lowerTitle.includes('funding')) {
      return { name: 'Startup', color: 'from-green-500 to-green-600', icon: 'ri-rocket-line' };
    }
    if (lowerTitle.includes('programming') || lowerTitle.includes('code') || lowerTitle.includes('developer')) {
      return { name: 'Code', color: 'from-blue-500 to-blue-600', icon: 'ri-code-line' };
    }
    if (lowerTitle.includes('crypto') || lowerTitle.includes('bitcoin') || lowerTitle.includes('blockchain')) {
      return { name: 'Crypto', color: 'from-yellow-500 to-yellow-600', icon: 'ri-coin-line' };
    }
    if (lowerTitle.includes('security') || lowerTitle.includes('privacy') || lowerTitle.includes('hack')) {
      return { name: 'Security', color: 'from-red-500 to-red-600', icon: 'ri-shield-line' };
    }
    
    return { name: 'Tech', color: 'from-gray-500 to-gray-600', icon: 'ri-computer-line' };
  };

  const generateImagePrompt = (title: string) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence') || lowerTitle.includes('machine learning')) {
      return 'Futuristic AI neural network visualization with glowing blue and purple circuits, abstract digital brain patterns, holographic data streams, modern tech background with geometric hexagonal patterns, professional cyberpunk aesthetic with neon accents and particle effects';
    }
    if (lowerTitle.includes('startup') || lowerTitle.includes('founder') || lowerTitle.includes('funding')) {
      return 'Modern startup office with glass walls, creative workspace, sleek laptops and tablets, contemporary furniture, bright natural lighting, minimalist design with plants, collaborative environment, professional business atmosphere with warm wooden accents';
    }
    if (lowerTitle.includes('programming') || lowerTitle.includes('code') || lowerTitle.includes('developer')) {
      return 'Elegant code editor with colorful syntax highlighting, multiple monitors setup, mechanical keyboard, modern developer workspace, dark theme IDE interface, clean desk with coffee cup, professional programming environment with RGB lighting accents';
    }
    if (lowerTitle.includes('crypto') || lowerTitle.includes('bitcoin') || lowerTitle.includes('blockchain')) {
      return 'Golden cryptocurrency coins floating in digital space, blockchain network connections, holographic Bitcoin symbols, futuristic financial technology background, glowing golden particles, professional fintech visualization with circuit patterns';
    }
    if (lowerTitle.includes('security') || lowerTitle.includes('privacy') || lowerTitle.includes('hack')) {
      return 'Cybersecurity fortress with digital shields, encrypted data streams, secure network visualization, blue and green security elements, futuristic lock mechanisms, professional cyber protection concept with matrix-style background effects';
    }
    if (lowerTitle.includes('mobile') || lowerTitle.includes('app') || lowerTitle.includes('ios') || lowerTitle.includes('android')) {
      return 'Premium smartphone mockup with sleek app interfaces, modern mobile UI design, clean app screenshots, professional device presentation, minimalist background with soft shadows, contemporary mobile technology showcase';
    }
    
    return 'Modern tech workspace with premium devices, sleek design elements, ambient lighting, professional technology setup, contemporary office environment, clean aesthetics with blue and orange accent colors, futuristic workspace design';
  };

  const categoryTag = getCategoryTag(story.title);
  const imageUrl = `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28generateImagePrompt%28story.title%29%29%7D&width=400&height=280&seq=${story.id}&orientation=landscape`;

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-gray-100 backdrop-blur-sm animate-fadeSlideIn"
      style={{
        animationDelay: `${index * 120}ms`,
      }}
      onClick={handleCardClick}
    >
      {/* Gradient overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      
      {/* Image container with advanced effects */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
        <img 
          src={imageUrl}
          alt={story.title}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Top badges with glass morphism */}
        <div className="absolute top-4 left-4 flex items-center space-x-3 z-20">
          <div className={`bg-gradient-to-r ${categoryTag.color} px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-lg backdrop-blur-md`}>
            <i className={`${categoryTag.icon} text-white text-sm`}></i>
            <span className="text-white font-semibold text-xs uppercase tracking-wide">{categoryTag.name}</span>
          </div>
        </div>
        
        {/* Score badge with animation */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl flex items-center space-x-1 shadow-lg border border-white/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <i className="ri-arrow-up-line text-green-600 text-sm"></i>
            <span className="text-green-600 font-bold text-sm">{story.score}</span>
          </div>
        </div>

        {/* Story ID badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
            <span className="text-white/90 font-mono text-xs">#{story.id}</span>
          </div>
        </div>
      </div>

      {/* Content section with enhanced typography */}
      <div className="p-6 relative">
        {/* Title with gradient hover effect */}
        <h3 className="text-gray-900 font-bold text-lg mb-4 line-clamp-3 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 font-poppins leading-tight">
          {story.title}
        </h3>

        {/* Author and time section with enhanced design */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${getAuthorColor(story.by)} rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-white`}>
              {getAuthorInitials(story.by)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{story.by}</p>
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <i className="ri-time-line"></i>
                <span>{formatTimeAgo(story.time)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-2 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-1">
              <i className="ri-chat-3-line text-blue-600 text-sm"></i>
              <span className="text-blue-600 font-bold text-sm">{story.descendants || 0}</span>
            </div>
          </div>
        </div>

        {/* Action buttons with premium interactions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                isLiked 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25' 
                  : 'bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500'
              } hover:scale-110 active:scale-95`}
            >
              <i className={`${isLiked ? 'ri-heart-fill' : 'ri-heart-line'} text-sm`}></i>
            </button>
            
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShareMenu(!showShareMenu);
                }}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-500 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <i className="ri-share-line text-sm"></i>
              </button>
              
              {showShareMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 flex space-x-1 animate-fadeSlideIn z-30">
                  <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <i className="ri-twitter-line text-xs"></i>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="ri-facebook-line text-xs"></i>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    <i className="ri-linkedin-line text-xs"></i>
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25' 
                  : 'bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-orange-500'
              } hover:scale-110 active:scale-95`}
            >
              <i className={`${isBookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'} text-sm`}></i>
            </button>
          </div>

          {/* Enhanced read more section */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-xl group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
            <span className="text-xs font-semibold text-gray-600 group-hover:text-orange-600 transition-colors uppercase tracking-wide">Read</span>
            <i className="ri-arrow-right-line text-sm text-gray-600 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-300"></i>
          </div>
        </div>
      </div>

      {/* Subtle border animation on hover - Changed to blue/cyan gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
    </div>
  );
}
