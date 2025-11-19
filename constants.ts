import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional grey backdrop, suit or business attire, soft studio lighting.',
    prompt: 'Transform this person into a professional corporate executive. Wear a dark business suit. Background is a clean, neutral grey studio backdrop. Professional lighting, high quality headshot.',
    icon: 'briefcase',
    color: 'bg-slate-700'
  },
  {
    id: 'startup',
    name: 'Tech Startup',
    description: 'Modern open office background, smart casual attire, bright and approachable.',
    prompt: 'Make this person look like a modern tech startup founder. Smart casual clothing (polo or clean t-shirt with blazer). Background is a blurred modern office with glass walls and plants. Bright, approachable lighting.',
    icon: 'laptop',
    color: 'bg-blue-600'
  },
  {
    id: 'outdoor',
    name: 'Natural Outdoor',
    description: 'Blurred park or city background, natural sunlight, warm tones.',
    prompt: 'Professional outdoor headshot. Soft natural sunlight (golden hour). Background is a heavily blurred city park or nature scene with bokeh. Wear stylish casual professional clothing.',
    icon: 'sun',
    color: 'bg-green-600'
  },
  {
    id: 'studio-bw',
    name: 'Studio B&W',
    description: 'High contrast black and white, dramatic lighting, artistic feel.',
    prompt: 'Artistic black and white professional headshot. Dramatic studio lighting (Rembrandt lighting). Plain black or dark background. Focus on facial features and expression. High contrast.',
    icon: 'camera',
    color: 'bg-neutral-800'
  },
  {
    id: 'creative',
    name: 'Creative Director',
    description: 'Bold colors, artistic background, stylish glasses or accessories if applicable.',
    prompt: 'Headshot for a creative director or designer. Vibrant, colorful background with artistic abstract elements. Stylish, trendy clothing. Confident and creative expression.',
    icon: 'palette',
    color: 'bg-purple-600'
  },
  {
    id: 'creative-studio',
    name: 'Abstract Studio',
    description: 'Minimalist artistic studio with abstract shapes and soft lighting.',
    prompt: 'High-end artistic studio headshot. Background features soft, blurred abstract shapes and pastel tones. Fashion-forward styling. Soft, flattering beauty lighting.',
    icon: 'aperture',
    color: 'bg-pink-600'
  },
  {
    id: 'formal-event',
    name: 'Formal Event',
    description: 'Gala or awards ceremony atmosphere with elegant bokeh.',
    prompt: 'Formal event headshot. Wear a tuxedo or evening gown. Background is a blurred ballroom or awards venue with warm ambient lights and bokeh. Elegant and sophisticated atmosphere.',
    icon: 'award',
    color: 'bg-amber-600'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Clean, sterile medical environment, lab coat or scrubs.',
    prompt: 'Professional healthcare provider headshot. Wear a white lab coat or medical scrubs. Background is a clean, bright modern medical office or hospital corridor (blurred). Trustworthy and caring expression.',
    icon: 'activity',
    color: 'bg-teal-600'
  },
  {
    id: 'education',
    name: 'Academic',
    description: 'Library or university setting, scholarly and wise.',
    prompt: 'Academic professional headshot. Wear a tweed jacket or smart blazer. Background is a blurred university library with bookshelves. Intellectual, scholarly lighting.',
    icon: 'book',
    color: 'bg-orange-700'
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film',
    description: 'Classic Hollywood vibe with warm, nostalgic lighting and grain.',
    prompt: 'Professional headshot with a vintage film aesthetic. Background looks like a classic Hollywood film set with warm, nostalgic lighting and subtle grain. Retro styling, classic cinema look.',
    icon: 'film',
    color: 'bg-amber-700'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic neon city lights and high-tech atmosphere.',
    prompt: 'Futuristic professional headshot. Background is a blurry cyberpunk cityscape with neon pink and blue lights. High-tech atmosphere, dramatic lighting, techwear influence.',
    icon: 'cpu',
    color: 'bg-fuchsia-600'
  },
  {
    id: 'tropical',
    name: 'Tropical',
    description: 'Relaxed beach setting with palm trees and natural light.',
    prompt: 'Professional outdoor headshot in a tropical setting. Blurred background with palm trees, sand, and ocean. Natural, sunny lighting. Relaxed but professional vibe.',
    icon: 'palmtree',
    color: 'bg-cyan-600'
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    description: 'Elegant 1920s style geometric patterns and gold accents.',
    prompt: 'Elegant professional headshot with Art Deco styling. Background features geometric gold and black patterns reminiscent of the 1920s. Luxurious and sophisticated lighting.',
    icon: 'gem',
    color: 'bg-yellow-600'
  },
  {
    id: 'gallery',
    name: 'Art Gallery',
    description: 'Clean white walls with subtle art pieces in the background.',
    prompt: 'Modern professional headshot in a minimalist art gallery. Clean white walls with blurred contemporary art pieces in the background. Soft, museum-quality lighting.',
    icon: 'frame',
    color: 'bg-stone-500'
  }
];

export const MAX_FILE_SIZE_MB = 5;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];