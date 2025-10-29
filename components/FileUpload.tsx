import React, { useCallback } from 'react';

interface FileUploadProps {
  onFileLoad: (content: string, fileName: string) => void;
  fileName: string | null;
  onClearFile: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad, fileName, onClearFile }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileLoad(text, file.name);
      };
      reader.readAsText(file);
    }
    // Reset the input value to allow re-uploading the same file
    event.target.value = '';
  };
  
  const onDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "text/csv") {
       const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileLoad(text, file.name);
      };
      reader.readAsText(file);
    }
  }, [onFileLoad]);

  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClearFile();
  };

  return (
    <div className="w-full">
      <label 
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="relative flex justify-center w-full h-32 px-4 transition bg-black/50 border-2 border-gray-800 border-dashed rounded-md appearance-none cursor-pointer hover:border-indigo-400 focus:outline-none">
        <span className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="font-medium text-gray-400">
            {fileName ? (
              <span className="text-indigo-300">{fileName}</span>
            ) : (
              <>
                Drop CSV file, or{' '}
                <span className="text-indigo-400 underline">browse</span>
              </>
            )}
          </span>
        </span>
        <input type="file" name="file_upload" className="hidden" accept=".csv" onChange={handleFileChange} />
         {fileName && (
            <button
                onClick={handleClearClick}
                className="absolute top-2 right-2 p-1.5 text-gray-400 bg-gray-900/50 rounded-full hover:bg-gray-800 hover:text-gray-200 transition-all duration-200"
                aria-label="Clear file"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        )}
      </label>
    </div>
  );
};

export default FileUpload;