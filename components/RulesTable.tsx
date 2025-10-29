import React, { useState } from 'react';
import type { AssociationRule } from '../types';

interface RulesTableProps {
  rules: AssociationRule[];
}

type Tab = 'all' | 'highConfidence';

const RulesTable: React.FC<RulesTableProps> = ({ rules }) => {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  // Identify top 3 rules by Lift from the entire dataset
  const top3Rules = [...rules].sort((a, b) => b.lift - a.lift).slice(0, 3);

  const highConfidenceRules = rules.filter(rule => rule.confidence >= 0.8);
  const displayedRules = activeTab === 'all' ? rules : highConfidenceRules;

  const tabClasses = (tab: Tab) => 
    `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none ${
      activeTab === tab 
      ? 'bg-indigo-600 text-white' 
      : 'text-gray-400 hover:bg-gray-900'
    }`;

  return (
    <div className="w-full bg-black/50 border border-gray-800 shadow-lg rounded-xl overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Association Rules</h3>
          <p className="text-sm text-gray-400 mt-1">
            Sorted by Lift. Higher lift suggests a stronger association.
             <span className="text-indigo-400 ml-2 font-medium inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Top 3 rules are highlighted.
            </span>
          </p>
        </div>
        <div className="mt-4 sm:mt-0 bg-black/50 p-1 rounded-lg flex space-x-1">
          <button onClick={() => setActiveTab('all')} className={tabClasses('all')}>
            All Rules
          </button>
          <button onClick={() => setActiveTab('highConfidence')} className={tabClasses('highConfidence')}>
            High-Confidence
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
            <tr>
              <th scope="col" className="px-6 py-3">Antecedent (If)</th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">Consequent (Then)</th>
              <th scope="col" className="px-6 py-3 text-right">Lift</th>
              <th scope="col" className="px-6 py-3 text-right">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {displayedRules.length > 0 ? (
              displayedRules.map((rule, index) => {
                const isTopRule = top3Rules.includes(rule);
                return (
                  <tr key={index} className={`border-b border-gray-800 hover:bg-gray-900/40 transition-colors duration-150 ${isTopRule ? 'bg-indigo-900/30' : ''}`}>
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        <div className="flex items-center">
                          {isTopRule && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-label="Top rule">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                          <span>{rule.antecedents.join(', ')}</span>
                        </div>
                    </td>
                    <td className="px-2 py-4 text-center text-indigo-400 font-bold">→</td>
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {rule.consequents.join(', ')}
                    </td>
                    <td className="px-6 py-4 text-right">{rule.lift.toFixed(3)}</td>
                    <td className="px-6 py-4 text-right">{(rule.confidence * 100).toFixed(1)}%</td>
                  </tr>
                );
              })
            ) : (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400">
                        No rules to display for this category.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RulesTable;