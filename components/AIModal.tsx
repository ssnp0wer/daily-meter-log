import React from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  content: string;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, loading, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-white rounded-t-xl">
          <div className="flex items-center gap-2 text-indigo-700">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-xl font-bold">AI 분석 리포트</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow text-gray-700 leading-relaxed">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-500 font-medium">데이터를 분석하고 있습니다...</p>
            </div>
          ) : (
            <div className="prose prose-indigo max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
              
              {content.length === 0 && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>분석 결과가 없습니다.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium shadow-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};