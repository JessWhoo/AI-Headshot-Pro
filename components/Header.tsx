import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              AI Headshot Pro
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Nano Banana Edition</span>
        </div>
      </div>
    </header>
  );
};