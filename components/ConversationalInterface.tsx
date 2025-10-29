
import React, { useState, useEffect, useRef } from 'react';
import type { AnalysisResult } from '../types';
import { GoogleGenAI } from '@google/genai';

interface ConversationalInterfaceProps {
    analysisResult: AnalysisResult;
}

type Message = {
    role: 'user' | 'model' | 'loading';
    content: string;
}

type Tab = 'chat' | 'history';

const STORAGE_KEY = 'mba-chat-history';

// A simple markdown-to-HTML renderer for lists
const SimpleMarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    const listItems = lines.map((line, index) => {
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            return <li key={index} className="ml-5 list-disc">{line.trim().substring(2)}</li>;
        }
        return <p key={index}>{line}</p>;
    });

    return <div>{listItems}</div>;
};

const ConversationalInterface: React.FC<ConversationalInterfaceProps> = ({ analysisResult }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('chat');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Load messages from localStorage on initial render
    useEffect(() => {
        try {
            const savedMessages = localStorage.getItem(STORAGE_KEY);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        } catch (error) {
            console.error("Failed to load messages from localStorage", error);
        }
    }, []);

    // Save messages to localStorage and scroll to bottom whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (error) {
            console.error("Failed to save messages to localStorage", error);
        }
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        // Add a temporary loading message
        setMessages(prev => [...prev, { role: 'loading', content: '...' }]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const rulesString = analysisResult.rules.map(r => 
                `IF ${r.antecedents.join(' & ')} THEN ${r.consequents.join(' & ')} (Lift: ${r.lift.toFixed(2)}, Confidence: ${(r.confidence * 100).toFixed(1)}%)`
            ).join('\n');
            
            const topItemsString = analysisResult.top_items.map(i => `${i.item}: ${i.count} purchases`).join('\n');

            const prompt = `You are a helpful retail data analyst. Based on the following Market Basket Analysis results, please answer the user's question. Be concise and helpful. Use markdown for lists if appropriate.

## Analysis Results ##

### Top 10 Association Rules ###
${rulesString}

### Top 10 Most Frequent Items ###
${topItemsString}

## User's Question ##
${userInput}`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const aiResponse = response.text;
            
            // Replace loading message with the actual AI response
            setMessages(prev => [...prev.slice(0, -1), { role: 'model', content: aiResponse }]);

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage = "Sorry, I encountered an error. Please try again.";
             setMessages(prev => [...prev.slice(0, -1), { role: 'model', content: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearHistory = () => {
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const tabClasses = (tab: Tab) => 
        `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none ${
          activeTab === tab 
          ? 'bg-indigo-600 text-white' 
          : 'text-gray-400 hover:bg-gray-900'
        }`;

    return (
        <div className="w-full bg-black/50 border border-gray-800 shadow-lg rounded-xl overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-800">
                <h3 className="text-xl font-semibold text-white">Chat with Your Data</h3>
                <div className="mt-4 sm:mt-0 bg-black/50 p-1 rounded-lg flex space-x-1">
                    <button onClick={() => setActiveTab('chat')} className={tabClasses('chat')}>
                        Chat
                    </button>
                    <button onClick={() => setActiveTab('history')} className={tabClasses('history')}>
                        History
                    </button>
                </div>
            </div>
            <div className="p-6 h-80 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">
                           {activeTab === 'chat' ? 'Ask a question to start the conversation.' : 'No conversation history.'}
                        </p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'loading' ? (
                                <div className="bg-gray-900 text-white p-3 rounded-lg max-w-lg inline-flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-0"></span>
                                    <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-150"></span>
                                    <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-300"></span>
                                </div>
                            ) : (
                                <div className={`p-3 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-gray-200'}`}>
                                    <SimpleMarkdownRenderer text={msg.content} />
                                </div>
                            )}
                        </div>
                    ))
                )}
                <div ref={chatEndRef} />
            </div>
             {activeTab === 'chat' ? (
                <form onSubmit={handleSendMessage} className="p-4 bg-black/50 border-t border-gray-800 flex items-center">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask about your results..."
                        disabled={isLoading}
                        className="flex-grow bg-gray-900 border border-gray-700 rounded-l-lg py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim()}
                        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                       </svg>
                    </button>
                </form>
            ) : (
                 <div className="p-4 bg-black/50 border-t border-gray-800 flex justify-end">
                    <button
                        onClick={handleClearHistory}
                        disabled={messages.length === 0}
                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                    >
                       Clear History
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConversationalInterface;