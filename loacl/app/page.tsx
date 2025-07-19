'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ScrollProgress from '../components/ScrollProgress';

interface NewsItem {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
  type: string;
}

export default function Home() {
  const [stories, setStories] = useState<NewsItem[]>([]);
  const [filteredStories, setFilteredStories] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'programming', name: 'Programming' },
    { id: 'startup', name: 'Startups' },
    { id: 'tech', name: 'Technology' }
  ];

  useEffect(() => {
    fetchTopStories();
  }, []);

  useEffect(() => {
    filterStories();
  }, [stories, selectedCategory, searchQuery]);

  const fetchTopStories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const storyIds = await response.json();

      const storyPromises = storyIds.slice(0, 30).map(async (id: number) => {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyResponse.json();
      });

      const storiesData = await Promise.all(storyPromises);
      setStories(storiesData.filter(story => story && story.title));
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterStories = () => {
    let filtered = stories;

    if (selectedCategory !== 'all') {
      filtered = stories.filter(story => {
        const title = story.title.toLowerCase();
        switch (selectedCategory) {
          case 'ai':
            return title.includes('ai') || title.includes('artificial intelligence') || 
                   title.includes('machine learning') || title.includes('ml') || title.includes('neural');
          case 'programming':
            return title.includes('code') || title.includes('programming') || 
                   title.includes('javascript') || title.includes('python') || title.includes('react') ||
                   title.includes('developer') || title.includes('coding');
          case 'startup':
            return title.includes('startup') || title.includes('founder') || 
                   title.includes('funding') || title.includes('venture') || title.includes('ipo');
          case 'tech':
            return title.includes('tech') || title.includes('software') || 
                   title.includes('hardware') || title.includes('app') || title.includes('platform');
          default:
            return true;
        }
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.by.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStories(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <Sidebar 
        isOpen={sidebarOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onClose={() => setSidebarOpen(false)}
      />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'} pt-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search stories, authors..."
            />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story, index) => (
                <NewsCard
                  key={story.id}
                  story={story}
                  index={index}
                />
              ))}
            </div>
          )}

          {!loading && filteredStories.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-poppins">No stories found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
