import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                AI MBA
              </span>
            </div>
            <div>
              <button
                onClick={onLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-300 bg-gray-900 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;