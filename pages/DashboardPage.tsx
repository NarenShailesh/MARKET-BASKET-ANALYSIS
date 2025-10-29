import React from 'react';

interface DashboardPageProps {
  onLaunchAnalyzer: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactElement; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-gray-400">{description}</p>
  </div>
);

const DashboardPage: React.FC<DashboardPageProps> = ({ onLaunchAnalyzer }) => {
  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Welcome to the Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
          Unlock powerful insights from your sales data. Discover which products are frequently bought together and create data-driven strategies to increase revenue.
        </p>
      </header>

      <div className="text-center mb-12">
        <button
          onClick={onLaunchAnalyzer}
          className="px-10 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transform hover:scale-105 transition-transform duration-200"
        >
          Launch Analyzer
        </button>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-white mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
            title="1. Upload Data"
            description="Simply upload your transaction history as a CSV file. The app will process it securely in your browser."
          />
           <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-8v-2m0 16V4m6 6h2m-16 0h2m14 0h2M6 12H4m16 0h-2m-8 8v2m-6-6H4m-2 0h2m14 0h2m-2 0h-2" /></svg>}
            title="2. Configure Parameters"
            description="Adjust the 'Support' and 'Confidence' thresholds to fine-tune the sensitivity of the analysis algorithm."
          />
           <FeatureCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            title="3. Visualize Insights"
            description="Instantly view the top association rules in a clear table and see your most popular items in an interactive chart."
          />
        </div>
      </div>
       <footer className="text-center mt-16 text-gray-400 text-sm">
            <p>Powered by AI & React</p>
        </footer>
    </div>
  );
};

export default DashboardPage;