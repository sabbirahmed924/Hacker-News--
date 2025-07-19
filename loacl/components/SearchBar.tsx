'use client';

import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative max-w-md mx-auto">
      <div className={`relative bg-white border rounded-xl shadow-sm transition-all duration-300 ${
        isFocused ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-gray-200'
      }`}>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <i className={`ri-search-line text-lg transition-colors duration-200 ${
            isFocused ? 'text-orange-500' : 'text-gray-400'
          }`}></i>
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-medium"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200"
          >
            <i className="ri-close-line text-sm text-gray-500 hover:text-gray-700"></i>
          </button>
        )}
      </div>

      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl p-4 z-10 shadow-lg animate-fadeSlideIn">
          <div className="text-sm text-gray-500 mb-2 font-medium">Quick filters:</div>
          <div className="flex flex-wrap gap-2">
            {['AI', 'React', 'Python', 'Startup', 'Security'].map((tag) => (
              <button
                key={tag}
                onClick={() => onChange(tag.toLowerCase())}
                className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 hover:text-orange-600 rounded-full text-xs text-gray-600 transition-all duration-200 whitespace-nowrap font-medium hover:shadow-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
