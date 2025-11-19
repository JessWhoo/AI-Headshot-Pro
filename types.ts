export interface HeadshotStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
  color: string;
}

export interface GenerationResult {
  imageUrl: string;
  timestamp: number;
}

export interface CustomizationParams {
  lightingWarmth: number; // -50 to 50
  lightingIntensity: number; // -50 to 50
  smileIntensity: number; // -50 to 50
  backgroundSaturation: number; // -50 to 50
  aspectRatio: string; // '1:1', '3:4', '4:5', '16:9'
  backgroundColor?: string; // Hex color code for tint
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  READY_TO_GENERATE = 'READY_TO_GENERATE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}