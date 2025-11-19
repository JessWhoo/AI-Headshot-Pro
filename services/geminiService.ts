import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize the client
// Note: In a real production app, you might handle the key differently, 
// but per instructions we use process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates a new image based on a source image and a text prompt.
 * Uses the 'gemini-2.5-flash-image' model.
 */
export const generateEditedImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  try {
    // Ensure base64 string doesn't have the prefix
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    const mimeType = base64Image.match(/data:(image\/[a-zA-Z]+);base64/)?.[1] || 'image/png';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract image from response
    // The structure is usually candidates[0].content.parts[].inlineData
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini.");
    }

    const parts = candidates[0].content.parts;
    let generatedBase64 = '';

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        generatedBase64 = part.inlineData.data;
        // Return the first image found
        return `data:image/png;base64,${generatedBase64}`;
      }
    }

    throw new Error("No image data found in the response.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};
