import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { CustomizationControls } from './components/CustomizationControls';
import { ResultDisplay } from './components/ResultDisplay';
import { Button } from './components/Button';
import { generateEditedImage } from './services/geminiService';
import { HeadshotStyle, CustomizationParams } from './types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { HEADSHOT_STYLES } from './constants';

function App() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(HEADSHOT_STYLES[0].id);
  const [customPrompt, setCustomPrompt] = useState<string>(HEADSHOT_STYLES[0].prompt);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // New State for Customization Parameters
  const [customParams, setCustomParams] = useState<CustomizationParams>({
    lightingWarmth: 0,
    lightingIntensity: 0,
    smileIntensity: 0,
    backgroundSaturation: 0,
    aspectRatio: '1:1',
    backgroundColor: ''
  });

  const handleImageSelect = (base64: string) => {
    setSourceImage(base64);
    setGeneratedImage(null);
    setError(null);
  };

  const handleClearImage = () => {
    setSourceImage(null);
    setGeneratedImage(null);
    setError(null);
  };

  const handleStyleSelect = (style: HeadshotStyle) => {
    setSelectedStyleId(style.id);
    setCustomPrompt(style.prompt);
  };

  const buildEffectivePrompt = (): string => {
    let prompt = customPrompt;
    const modifiers: string[] = [];

    // Smile Logic
    if (customParams.smileIntensity > 20) modifiers.push("Subject is smiling broadly with a warm, approachable expression.");
    else if (customParams.smileIntensity > 5) modifiers.push("Subject has a gentle, pleasant smile.");
    else if (customParams.smileIntensity < -20) modifiers.push("Subject has a serious, professional, and focused expression.");
    else if (customParams.smileIntensity < -5) modifiers.push("Subject has a neutral, calm expression.");

    // Lighting Warmth Logic
    if (customParams.lightingWarmth > 20) modifiers.push("Lighting is warm, golden, and sunny.");
    else if (customParams.lightingWarmth < -20) modifiers.push("Lighting is cool, bluish, and crisp.");

    // Lighting Intensity Logic
    if (customParams.lightingIntensity > 20) modifiers.push("Lighting is high-key, bright, and airy.");
    else if (customParams.lightingIntensity < -20) modifiers.push("Lighting is low-key, dramatic, and moody.");

    // Saturation Logic
    if (customParams.backgroundSaturation > 20) modifiers.push("Colors in the image are vibrant, rich, and saturated.");
    else if (customParams.backgroundSaturation < -20) modifiers.push("Colors are muted, desaturated, and subtle.");
    
    // Background Tint Logic
    if (customParams.backgroundColor) {
      modifiers.push(`The background color palette is tinted with or dominated by the hex color ${customParams.backgroundColor}.`);
    }

    // Aspect Ratio Logic
    if (customParams.aspectRatio && customParams.aspectRatio !== '1:1') {
      modifiers.push(`Generate the output image with a ${customParams.aspectRatio} aspect ratio.`);
    }

    if (modifiers.length > 0) {
      prompt += " " + modifiers.join(" ");
    }
    
    return prompt;
  };

  const handleGenerate = async () => {
    if (!sourceImage) return;
    if (!customPrompt.trim()) {
      setError("Please select a style or enter a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const finalPrompt = buildEffectivePrompt();
    console.log("Generating with prompt:", finalPrompt);

    try {
      const result = await generateEditedImage(sourceImage, finalPrompt);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-headshot-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        
        {/* Intro / Instructions */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Professional Headshots <span className="text-indigo-400">in seconds.</span>
          </h2>
          <p className="text-lg text-slate-400">
            Upload a casual photo and use AI to instantly transform it into a professional studio-quality profile picture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Step 1: Upload Photo</h3>
              <ImageUploader 
                currentImage={sourceImage} 
                onImageSelect={handleImageSelect} 
                onClear={handleClearImage} 
              />
            </section>

            <section className={!sourceImage ? 'opacity-50 pointer-events-none grayscale transition-all' : 'transition-all'}>
               <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Step 2: Customize Style</h3>
               
               <div className="space-y-6">
                 <StyleSelector 
                   selectedStyleId={selectedStyleId} 
                   customPrompt={customPrompt} 
                   onStyleSelect={handleStyleSelect}
                   onPromptChange={setCustomPrompt}
                 />
                 
                 <CustomizationControls 
                   params={customParams}
                   onChange={setCustomParams}
                 />
               </div>
               
               <div className="mt-6">
                 <Button 
                   onClick={handleGenerate} 
                   isLoading={isLoading} 
                   disabled={!sourceImage || !customPrompt}
                   className="w-full py-4 text-lg shadow-indigo-500/20"
                   icon={<Sparkles className="w-5 h-5" />}
                 >
                   {isLoading ? 'Generating...' : 'Generate Headshot'}
                 </Button>
               </div>
            </section>
          </div>

          {/* Center Arrow (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-1 justify-center pt-40">
             <ArrowRight className="w-8 h-8 text-slate-700" />
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-6">
             <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Step 3: Your Result</h3>
             <div className="sticky top-24">
               <ResultDisplay 
                 resultImage={generatedImage} 
                 isLoading={isLoading} 
                 error={error}
                 onDownload={handleDownload}
               />
               
               {generatedImage && (
                 <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-sm text-slate-400">
                   <h4 className="font-semibold text-slate-200 mb-1">Not quite right?</h4>
                   <p>Adjust the sliders on the left or edit the prompt text to fine-tune the look.</p>
                 </div>
               )}
             </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;