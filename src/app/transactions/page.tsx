'use client';

import { useState } from 'react';

export default function TransactionsPage() {
  const [summary, setSummary] = useState('');
  const [diligenceItems, setDiligenceItems] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      console.log('📤 Uploading files...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('📥 Upload successful:', data);
    } catch (error) {
      console.error('❌ Upload error:', error);
    }
  };

const handleReview = async () => {
    try {
      setIsAnalyzing(true);
      console.log('🔄 Sending analysis request...');
      const startTime = performance.now();
      
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionSummary: summary,
          diligenceItems: diligenceItems,
        }),
      });
  
      const data = await response.json();
      const endTime = performance.now();
      
      console.log(`✅ Response received in ${((endTime - startTime) / 1000).toFixed(2)}s:`, data);
  
      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || 'Analysis failed');
      }
  
      if (!data.analysis) {
        throw new Error('No analysis was generated');
      }
  
      setAnalysisResult(data.analysis);
      console.log('✅ Analysis set to state:', data.analysis);
      
    } catch (error) {
      console.error('❌ Analysis error:', error);
      setAnalysisResult(error instanceof Error ? 
        `Error: ${error.message}. Please try again.` : 
        'Error: Failed to analyze transaction. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] max-w-6xl mx-auto">
      {/* Upload Documents Container */}
      <div className="absolute top-0 right-0 w-72">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-4">
          <h3 className="text-white text-sm font-semibold mb-4">Upload Documents</h3>
          
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept=".pdf,.doc,.docx,.txt"
            />
            <div className="bg-white/5 hover:bg-white/10 transition-colors border border-dashed border-slate-700 rounded-md p-4 text-center">
              <p className="text-sm text-slate-400">
                Drag files here or click to browse
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports PDF, DOC, DOCX, TXT
              </p>
            </div>
          </div>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="text-sm text-slate-400 truncate">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pr-80 h-full flex flex-col gap-6 pb-20">
        {/* Text Areas Container */}
        <div className="flex-1 grid grid-rows-2 gap-6">
          {/* Transaction Summary Box */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700/50 h-full">
            <textarea 
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Transaction summary here"
              className="w-full h-full bg-transparent text-white border-0 rounded-lg p-4 placeholder-slate-500 focus:ring-0 resize-none font-[family-name:var(--font-geist-sans)]"
            />
          </div>

          {/* Key Diligence Items Box / Analysis Results */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700/50 h-full">
            <textarea 
              value={analysisResult || diligenceItems}
              onChange={(e) => setDiligenceItems(e.target.value)}
              placeholder="Key diligence items here"
              className="w-full h-full bg-transparent text-white border-0 rounded-lg p-4 placeholder-slate-500 focus:ring-0 resize-none font-[family-name:var(--font-geist-sans)]"
              readOnly={!!analysisResult}
            />
          </div>
        </div>

        {/* Review Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleReview}
            disabled={isAnalyzing}
            className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-geist-sans)]"
          >
            {isAnalyzing ? 'Analyzing...' : 'Review'}
          </button>
        </div>
      </div>
    </div>
  );
}