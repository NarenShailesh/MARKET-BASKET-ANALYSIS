
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ParameterInputs from '../components/ParameterInputs';
import RulesTable from '../components/RulesTable';
import ItemFrequencyChart from '../components/ItemFrequencyChart';
import SkeletonLoader from '../components/SkeletonLoader';
import ConversationalInterface from '../components/ConversationalInterface';
import { runAnalysis } from '../services/analysisService';
import type { AnalysisResult } from '../types';

interface AnalysisPageProps {
  onGoBack: () => void;
}

const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const AnalysisPage: React.FC<AnalysisPageProps> = ({ onGoBack }) => {
  const [csvContent, setCsvContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [minSupport, setMinSupport] = useState<number>(0.01);
  const [minConfidence, setMinConfidence] = useState<number>(0.7);

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileLoad = (content: string, name: string) => {
    setCsvContent(content);
    setFileName(name);
    setError(null);
    setAnalysisResult(null);
  };

  const handleClearFile = () => {
    setCsvContent(null);
    setFileName(null);
    setError(null);
    setAnalysisResult(null);
  };

  const handleRunAnalysis = async () => {
    if (!csvContent) {
      setError('Please upload a CSV file first.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await runAnalysis(csvContent, minSupport, minConfidence);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportCSV = () => {
    if (!analysisResult) return;

    const { rules, top_items } = analysisResult;

    let csvRows = [];

    // Section 1: Association Rules
    csvRows.push("Association Rules");
    csvRows.push("Antecedents,Consequents,Lift,Confidence,Support");
    rules.forEach(rule => {
      const antecedents = `"${rule.antecedents.join('; ')}"`;
      const consequents = `"${rule.consequents.join('; ')}"`;
      csvRows.push([antecedents, consequents, rule.lift.toFixed(3), rule.confidence.toFixed(3), rule.support.toFixed(3)].join(','));
    });

    csvRows.push(""); // Add blank row for spacing

    // Section 2: Top Frequent Items
    csvRows.push("Top 10 Frequent Items");
    csvRows.push("Item,Purchase Count");
    top_items.forEach(item => {
      csvRows.push([`"${item.item}"`, item.count].join(','));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "market_basket_analysis_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div>
       <header className="mb-8">
          <button onClick={onGoBack} className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 text-sm font-medium inline-flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
        <div className="text-center mt-4">
            <h1 className="text-4xl font-bold text-white">
                Analysis Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-400">
                Upload your transaction data to uncover hidden product associations.
            </p>
        </div>
        </header>


      <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 mb-10">
        <div className="flex flex-col items-center space-y-6">
          <FileUpload onFileLoad={handleFileLoad} fileName={fileName} onClearFile={handleClearFile} />
          <ParameterInputs 
            minSupport={minSupport} 
            setMinSupport={setMinSupport} 
            minConfidence={minConfidence} 
            setMinConfidence={setMinConfidence} 
          />
          <button
            onClick={handleRunAnalysis}
            disabled={!csvContent || isLoading}
            className="w-full sm:w-auto flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transition-all duration-200"
          >
            {isLoading ? <LoadingSpinner /> : null}
            {isLoading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-8 text-center" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center text-white animate-pulse">Generating Insights...</h2>
          <div className="space-y-8">
            <SkeletonLoader className="h-96" />
            <SkeletonLoader className="h-96" />
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="space-y-10 animate-fade-in">
           <div className="flex justify-center items-center flex-col gap-4 sm:flex-row sm:justify-between">
            <h2 className="text-3xl font-bold text-center text-white">Analysis Results</h2>
            <button
              onClick={handleExportCSV}
              className="flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export to CSV
            </button>
          </div>
          <div className="space-y-8">
              <RulesTable rules={analysisResult.rules} />
              <ItemFrequencyChart items={analysisResult.top_items} />
              <ConversationalInterface analysisResult={analysisResult} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;