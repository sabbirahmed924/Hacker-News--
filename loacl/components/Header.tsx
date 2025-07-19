'use client';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:shadow-md"
            >
              <i className="ri-menu-line text-xl text-gray-700"></i>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <i className="ri-fire-line text-white text-lg"></i>
              </div>
              <h1 className="text-2xl font-bold text-orange-500 font-pacifico">
                Hacked News
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:shadow-md">
              <i className="ri-notification-line text-xl text-gray-700"></i>
            </button>
            
            <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:shadow-md">
              <i className="ri-settings-line text-xl text-gray-700"></i>
            </button>

            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <i className="ri-user-line text-white text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
