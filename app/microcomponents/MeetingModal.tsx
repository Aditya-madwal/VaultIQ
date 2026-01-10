
import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Video as VideoIcon, Trash2, Loader2 } from 'lucide-react';


interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'transcript' | 'video'>('transcript');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('General');
  const [transcriptText, setTranscriptText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Video State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const clearVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview(null);
    setVideoDuration(0);
  };

  const handleMetadataLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setVideoDuration(e.currentTarget.duration);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'video' && videoFile) {
      // Placeholder for now
      alert(`Name: ${videoFile.name}\nSize: ${videoFile.size} bytes\nDuration: ${videoDuration.toFixed(2)} seconds`);
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      onClose();
      return;
    }

    if (activeTab === 'transcript' && transcriptText) {
      try {
        setIsProcessing(true);
        const response = await fetch('/api/meetings/analyze', {
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

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to analyze transcript');
        }

        const analysisResult = await response.json();
        console.log("Analysis Result:", analysisResult);
        
        // Cleanup and close on success
        if (videoPreview) URL.revokeObjectURL(videoPreview);
        if (onSuccess) onSuccess();
        onClose();

      } catch (error) {
        console.error("Failed to analyze transcript:", error);
        alert(error instanceof Error ? error.message : "Failed to analyze transcript");
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Cleanup and close for other cases
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
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

          {/* Input Type Switcher */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Input Source</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <button
                    type="button"
                    onClick={() => setActiveTab('transcript')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'transcript' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <FileText size={14} />
                    <span>Transcript</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('video')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all ${activeTab === 'video' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <VideoIcon size={14} />
                    <span>Video Upload</span>
                </button>
            </div>
          </div>

          {/* Conditional Input Area */}
          <div className="space-y-1">
            {activeTab === 'transcript' ? (
                <div className="space-y-3">
                     <textarea 
                        rows={6}
                        value={transcriptText}
                        onChange={e => setTranscriptText(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 resize-none font-mono"
                        placeholder="Paste meeting transcript here..."
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Or upload txt/md</span>
                         <input type="file" accept=".txt,.md,.pdf" className="text-xs text-zinc-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 cursor-pointer"/>
                      </div>
                </div>
            ) : (
                videoPreview ? (
                  <div className="relative rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden group">
                    <video 
                      ref={videoRef}
                      src={videoPreview} 
                      className="w-full h-48 object-cover opacity-50 group-hover:opacity-75 transition-opacity"
                      onLoadedMetadata={handleMetadataLoaded}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="bg-zinc-950/80 backdrop-blur px-3 py-1.5 rounded-full border border-zinc-800 mb-2">
                            <span className="text-xs font-bold text-zinc-200 flex items-center gap-2">
                                <VideoIcon size={12} className="text-indigo-400"/>
                                {videoFile?.name}
                            </span>
                        </div>
                        <button 
                            type="button" 
                            onClick={clearVideo}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-zinc-700 transition-colors bg-zinc-900/20 cursor-pointer group animate-in fade-in zoom-in-95 duration-200">
                      <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-600 transition-colors">
                          <Upload size={20} className="text-zinc-400 group-hover:text-zinc-300" />
                      </div>
                      <div className="text-center">
                          <p className="text-sm font-bold text-zinc-300">Click to upload video</p>
                          <p className="text-xs text-zinc-500 mt-1">MP4, WEBM, MOV (Max 500MB)</p>
                      </div>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={handleVideoChange}
                      />
                  </label>
                )
            )}
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
