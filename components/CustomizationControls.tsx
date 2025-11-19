import React from 'react';
import { Sun, Smile, Zap, Droplet, Sliders, Square, RectangleVertical, RectangleHorizontal, LayoutTemplate, Palette, X } from 'lucide-react';
import { CustomizationParams } from '../types';

interface CustomizationControlsProps {
  params: CustomizationParams;
  onChange: (newParams: CustomizationParams) => void;
}

export const CustomizationControls: React.FC<CustomizationControlsProps> = ({ params, onChange }) => {
  
  const updateParam = (key: keyof CustomizationParams, value: number | string) => {
    onChange({
      ...params,
      [key]: value
    });
  };

  const aspectRatios = [
    { id: '1:1', label: 'Square', icon: <Square className="w-4 h-4" /> },
    { id: '3:4', label: 'Portrait', icon: <RectangleVertical className="w-4 h-4" /> },
    { id: '4:5', label: 'Social', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: '16:9', label: 'Wide', icon: <RectangleHorizontal className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-5 space-y-6">
      <div className="flex items-center space-x-2 mb-2">
        <Sliders className="w-4 h-4 text-indigo-400" />
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Fine-tune Result</h3>
      </div>

      {/* Aspect Ratio */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span className="font-medium text-slate-300">Aspect Ratio</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.id}
              onClick={() => updateParam('aspectRatio', ratio.id)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200
                ${params.aspectRatio === ratio.id 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750 hover:border-slate-600 hover:text-slate-300'}
              `}
            >
              <div className="mb-1 opacity-80">{ratio.icon}</div>
              <span className="text-[10px] font-medium">{ratio.id}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-700/50 my-4" />

      {/* Lighting Warmth */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <div className="flex items-center"><Sun className="w-3 h-3 mr-1 text-blue-400" />Cool</div>
          <span className="font-medium text-slate-300">Lighting Warmth</span>
          <div className="flex items-center">Warm<Sun className="w-3 h-3 ml-1 text-orange-400" /></div>
        </div>
        <input
          type="range"
          min="-50"
          max="50"
          value={params.lightingWarmth}
          onChange={(e) => updateParam('lightingWarmth', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
        />
      </div>

      {/* Lighting Intensity */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <div className="flex items-center"><Zap className="w-3 h-3 mr-1 text-slate-500" />Dim/Moody</div>
          <span className="font-medium text-slate-300">Brightness</span>
          <div className="flex items-center">Bright<Zap className="w-3 h-3 ml-1 text-yellow-400" /></div>
        </div>
        <input
          type="range"
          min="-50"
          max="50"
          value={params.lightingIntensity}
          onChange={(e) => updateParam('lightingIntensity', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
        />
      </div>

      {/* Smile Intensity */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <div className="flex items-center"><Smile className="w-3 h-3 mr-1 text-slate-500" />Serious</div>
          <span className="font-medium text-slate-300">Smile</span>
          <div className="flex items-center">Big Smile<Smile className="w-3 h-3 ml-1 text-green-400" /></div>
        </div>
        <input
          type="range"
          min="-50"
          max="50"
          value={params.smileIntensity}
          onChange={(e) => updateParam('smileIntensity', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
        />
      </div>

      <div className="h-px bg-slate-700/50 my-4" />

      {/* Background Settings */}
      <div className="space-y-4">
        
        {/* Background Tint Color Picker */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span className="font-medium text-slate-300">Background Tint</span>
          </div>
          <div className="flex items-center space-x-3 p-2 bg-slate-800 rounded-lg border border-slate-700">
            <label className="relative cursor-pointer group shrink-0">
              <div 
                className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center bg-slate-900 overflow-hidden shadow-inner" 
                style={{ backgroundColor: params.backgroundColor || 'transparent' }}
              >
                {!params.backgroundColor && <Palette className="w-4 h-4 text-slate-400" />}
              </div>
              <input 
                type="color" 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => updateParam('backgroundColor', e.target.value)}
                value={params.backgroundColor || '#000000'}
              />
            </label>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-300 font-medium truncate">
                {params.backgroundColor ? params.backgroundColor.toUpperCase() : 'No tint selected'}
              </div>
              <div className="text-[10px] text-slate-500">
                {params.backgroundColor ? 'Click circle to change' : 'Click circle to add tint'}
              </div>
            </div>
            {params.backgroundColor && (
              <button 
                onClick={() => updateParam('backgroundColor', '')}
                className="p-1.5 hover:bg-slate-700 rounded-md text-slate-400 hover:text-red-400 transition-colors"
                title="Remove tint"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Background Saturation */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <div className="flex items-center"><Droplet className="w-3 h-3 mr-1 text-slate-500" />Muted</div>
            <span className="font-medium text-slate-300">Color Vibrancy</span>
            <div className="flex items-center">Vibrant<Droplet className="w-3 h-3 ml-1 text-pink-400" /></div>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            value={params.backgroundSaturation}
            onChange={(e) => updateParam('backgroundSaturation', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
          />
        </div>

      </div>
    </div>
  );
};