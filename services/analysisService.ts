
import type { AnalysisResult } from '../types';

// Mock data simulating the response from the Python backend
const mockData: AnalysisResult = {
  rules: [
    { antecedents: ["whole milk"], consequents: ["other vegetables"], lift: 1.484, confidence: 0.758, support: 0.019 },
    { antecedents: ["yogurt"], consequents: ["whole milk"], lift: 1.621, confidence: 0.812, support: 0.022 },
    { antecedents: ["soda"], consequents: ["rolls/buns"], lift: 1.293, confidence: 0.711, support: 0.013 },
    { antecedents: ["tropical fruit"], consequents: ["whole milk"], lift: 1.345, confidence: 0.783, support: 0.018 },
    { antecedents: ["sausage"], consequents: ["rolls/buns"], lift: 1.455, confidence: 0.829, support: 0.020 },
    { antecedents: ["pastry"], consequents: ["whole milk"], lift: 1.258, confidence: 0.762, support: 0.016 },
    { antecedents: ["citrus fruit"], consequents: ["other vegetables"], lift: 1.189, confidence: 0.724, support: 0.014 },
    { antecedents: ["bottled water"], consequents: ["soda"], lift: 1.087, confidence: 0.689, support: 0.011 },
    { antecedents: ["shopping bags"], consequents: ["whole milk"], lift: 1.761, confidence: 0.853, support: 0.025 },
    { antecedents: ["root vegetables"], consequents: ["other vegetables"], lift: 1.398, confidence: 0.791, support: 0.017 }
  ],
  top_items: [
    { item: "whole milk", count: 2513 },
    { item: "other vegetables", count: 1903 },
    { item: "rolls/buns", count: 1809 },
    { item: "soda", count: 1715 },
    { item: "yogurt", count: 1372 },
    { item: "bottled water", count: 1105 },
    { item: "root vegetables", count: 1087 },
    { item: "tropical fruit", count: 1049 },
    { item: "shopping bags", count: 969 },
    { item: "sausage", count: 924 }
  ]
};

export const runAnalysis = (
    csvContent: string,
    minSupport: number,
    minConfidence: number
): Promise<AnalysisResult> => {
    console.log('Simulating API call with:', {
        minSupport,
        minConfidence,
        csvContentLength: csvContent.length,
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (csvContent.length === 0) {
                reject(new Error('CSV content cannot be empty. Please upload a file.'));
            }
            // Simulate a successful response
            resolve(mockData);
        }, 1500); // Simulate network delay
    });
};
