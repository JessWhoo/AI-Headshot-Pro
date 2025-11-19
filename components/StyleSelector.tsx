import React from 'react';
import { HEADSHOT_STYLES } from '../constants';
import { HeadshotStyle } from '../types';
import { 
  Briefcase, Laptop, Sun, Camera, Palette, Wand2, 
  Activity, BookOpen, Award, Aperture, 
  Film, Cpu, Palmtree, Gem, Frame 
} from 'lucide-react';

interface StyleSelectorProps {
  selectedStyleId: string | null;
  customPrompt: string;
  onStyleSelect: (style: HeadshotStyle) => void;
  onPromptChange: (prompt: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  selectedStyleId, 
  customPrompt, 
  onStyleSelect,
  onPromptChange
}) => {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase': return <Briefcase className="w-5 h-5" />;
      case 'laptop': return <Laptop className="w-5 h-5" />;
      case 'sun': return <Sun className="w-5 h-5" />;
      case 'camera': return <Camera className="w-5 h-5" />;
      case 'palette': return <Palette className="w-5 h-5" />;
      case 'activity': return <Activity className="w-5 h-5" />;
      case 'book': return <BookOpen className="w-5 h-5" />;
      case 'award': return <Award className="w-5 h-5" />;
      case 'aperture': return <Aperture className="w-5 h-5" />;
      case 'film': return <Film className="w-5 h-5" />;
      case 'cpu': return <Cpu className="w-5 h-5" />;
      case 'palmtree': return <Palmtree className="w-5 h-5" />;
      case 'gem': return <Gem className="w-5 h-5" />;
      case 'frame': return <Frame className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1 flex items-center">
          <Wand2 className="w-4 h-4 mr-2 text-indigo-400" />
          Select a Style
        </h3>
        <p className="text-sm text-slate-400 mb-4">Choose a professional look for your base style.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {HEADSHOT_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onStyleSelect(style)}
              className={`
                relative p-3 rounded-xl border text-left transition-all duration-200
                flex flex-col gap-2 group
                ${selectedStyleId === style.id 
                  ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
                  : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-750'}
              `}
            >
              <div className={`
                p-2 rounded-lg w-fit transition-colors
                ${selectedStyleId === style.id ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 group-hover:text-white'}
              `}>
                {getIcon(style.icon)}
              </div>
              <div>
                <div className={`font-medium text-sm ${selectedStyleId === style.id ? 'text-indigo-300' : 'text-slate-200'}`}>
                  {style.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Prompt Editor (Optional Tweaks)
        </label>
        <textarea
          value={customPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="E.g. 'Add a vintage filter' or 'Remove the person in the background'..."
          className="w-full h-24 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm leading-relaxed"
        />
        <p className="text-xs text-slate-500 mt-2">
          Tip: The sliders below will also add instructions to this base prompt.
        </p>
      </div>
    </div>
  );
};