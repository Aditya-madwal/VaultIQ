
import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Loader2 } from 'lucide-react';


interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('General');
  const [transcriptText, setTranscriptText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleTranscriptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTranscriptFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transcriptText && !transcriptFile) {
      alert("Please provide a transcript text or upload a file.");
      return;
    }

    try {
      setIsProcessing(true);
      let response;

      if (transcriptFile) {
        // 1. Upload File first
        const uploadFormData = new FormData();
        uploadFormData.append('file', transcriptFile);
        
        // Optional: you can calculate duration if it was audio, 
        // but for text files duration is not relevant or 0.
        
        const uploadResponse = await fetch('/api/documents/upload', {
            method: 'POST',
            body: uploadFormData,
        });

        if (!uploadResponse.ok) {
            const error = await uploadResponse.json();
            throw new Error(error.error || 'Failed to upload file');
        }

        const { fileId } = await uploadResponse.json();

        // 2. Use File Analysis API with the returned fileId
        // We still send the file because the current analyze API implementation 
        // reads the text directly from the form file.
        const formData = new FormData();
        formData.append('file', transcriptFile);
        formData.append('fileId', fileId);
        formData.append('title', title);
        formData.append('date', date);
        formData.append('category', category);

        response = await fetch('/api/meetings/analyze/file', {
          method: 'POST',
          body: formData,
        });
      } else {
        // Use Text Analysis API
        response = await fetch('/api/meetings/analyze/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            transcript: transcriptText,
            title,
            date,
            category
          }),
        });
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to analyze transcript');
      }

      const analysisResult = await response.json();
      console.log("Analysis Result:", analysisResult);
      
      // Cleanup and close on success
      if (onSuccess) onSuccess();
      onClose();

      // Reset states
      setTranscriptText('');
      setTranscriptFile(null);
      setTitle('');
      setDate('');

    } catch (error) {
      console.error("Failed to analyze transcript:", error);
      alert(error instanceof Error ? error.message : "Failed to analyze transcript");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-900 bg-zinc-950">
          <h2 className="text-lg font-bold text-zinc-100">
            New Session Capture
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          {/* Title */}
          <div className="space-y-1">
             <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Meeting Title</label>
             <input 
               type="text"
               required
               value={title}
               onChange={e => setTitle(e.target.value)}
               className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
               placeholder="e.g. Q3 Roadmap Discussion"
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Date</label>
              <input 
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
              />
            </div>

            {/* Category */}
             <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Category</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 appearance-none"
              >
                <option value="General">General</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          {/* Conditional Input Area */}
          <div className="space-y-1">
                <div className="space-y-3">
                     <textarea 
                        rows={6}
                        value={transcriptText}
                        onChange={e => setTranscriptText(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 resize-none font-mono"
                        placeholder="Paste meeting transcript here..."
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">{transcriptFile ? 'Selected:' : 'Or upload txt/md'}</span>
                        {transcriptFile ? (
                           <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded px-2 py-1">
                                <span className="text-xs text-zinc-300 font-bold truncate max-w-[150px]">{transcriptFile.name}</span>
                                <button type="button" onClick={() => setTranscriptFile(null)} className="text-zinc-500 hover:text-white"><X size={12}/></button>
                           </div>
                        ) : (
                           <input 
                             type="file" 
                             accept=".txt,.md" 
                             onChange={handleTranscriptFileChange}
                             className="text-xs text-zinc-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 cursor-pointer"
                           />
                        )}
                      </div>
                </div>
          </div>

        </form>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex justify-end gap-2">
            <button 
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                type="button"
            >
                Cancel
            </button>
            <button 
                onClick={handleSubmit}
                disabled={isProcessing}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-2"
            >
                {isProcessing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Initiate Processing</span>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;
