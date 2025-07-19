'use client';

interface Category {
  id: string;
  name: string;
}

interface SidebarProps {
  isOpen: boolean;
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onClose: () => void;
}

export default function Sidebar({ isOpen, categories, selectedCategory, onCategorySelect, onClose }: SidebarProps) {
  const categoryIcons: { [key: string]: string } = {
    all: 'ri-global-line',
    ai: 'ri-robot-line',
    programming: 'ri-code-line',
    startup: 'ri-rocket-line',
    tech: 'ri-computer-line'
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transform transition-all duration-300 z-40 shadow-lg ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">Categories</h2>
            <p className="text-sm text-gray-500">Filter stories by topic</p>
          </div>

          <nav className="space-y-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap font-medium ${
                  selectedCategory === category.id
                    ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${categoryIcons[category.id]} text-lg`}></i>
                </div>
                <span>{category.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 shadow-sm">
              <i className="ri-star-line text-white text-lg"></i>
            </div>
            <h3 className="text-gray-900 font-semibold mb-1 font-poppins">Premium</h3>
            <p className="text-gray-600 text-sm mb-3">Get real-time updates and advanced filters</p>
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 whitespace-nowrap">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
