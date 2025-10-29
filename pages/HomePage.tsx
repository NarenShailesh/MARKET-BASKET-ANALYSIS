import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
        }, 1000);
    };

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                    AI Market Basket Analysis
                </h1>
                <p className="mt-2 text-gray-400">Sign in to access your dashboard</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-black/50 border border-gray-800 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-900 text-gray-200 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:bg-gray-500"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingSpinner /> : 'Sign In'}
                    </button>
                </div>
            </form>
             <p className="text-center text-gray-400 text-xs">
                &copy;2024 AI Corp. All rights reserved.
            </p>
        </div>
    );
};

export default LoginPage;