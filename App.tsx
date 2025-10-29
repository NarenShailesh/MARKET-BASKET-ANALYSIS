import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';
import DashboardLayout from './components/DashboardLayout';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState<'dashboard' | 'analysis'>('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-gray-100 font-sans flex items-center justify-center p-4">
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
        <DashboardLayout onLogout={handleLogout}>
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {page === 'dashboard' && (
                <div className="animate-fade-in">
                  <DashboardPage onLaunchAnalyzer={() => setPage('analysis')} />
                </div>
              )}
              {page === 'analysis' && (
                <div className="animate-fade-in">
                  <AnalysisPage onGoBack={() => setPage('dashboard')} />
                </div>
              )}
            </div>
          </main>
        </DashboardLayout>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default App;