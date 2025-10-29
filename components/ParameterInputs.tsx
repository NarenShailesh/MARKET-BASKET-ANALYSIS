import React from 'react';

interface ParameterInputsProps {
  minSupport: number;
  setMinSupport: (value: number) => void;
  minConfidence: number;
  setMinConfidence: (value: number) => void;
}

const ParameterInput: React.FC<ParameterInputsProps> = ({ minSupport, setMinSupport, minConfidence, setMinConfidence }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      <div>
        <label htmlFor="minSupport" className="block text-sm font-medium text-gray-300 mb-2">
          Min Support ({minSupport.toFixed(3)})
        </label>
        <input
          id="minSupport"
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={minSupport}
          onChange={(e) => setMinSupport(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="minConfidence" className="block text-sm font-medium text-gray-300 mb-2">
          Min Confidence ({minConfidence.toFixed(2)})
        </label>
        <input
          id="minConfidence"
          type="range"
          min="0.1"
          max="1.0"
          step="0.05"
          value={minConfidence}
          onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>
    </div>
  );
};

export default ParameterInput;