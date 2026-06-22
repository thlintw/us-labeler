import { GoogleGenAI } from '@google/genai';
import { type NutritionInfo } from '../store/useAppStore';

const SYSTEM_PROMPT = `You are an expert nutritionist. Review the attached image of a nutritional label (likely Taiwanese or Japanese).
Extract the nutritional data. 
CRITICAL RULE: Many Asian labels display macros per 100g. If a serving size or total weight is provided, you MUST calculate the exact macros for ONE SERVING. If no serving size is provided, assume the entire package is one serving.
Return ONLY a valid, raw JSON object matching this schema exactly. Do not include markdown formatting, do not wrap in code blocks, and provide no explanations. Just the JSON string:
{
  "servingSize": "string (e.g., '1 package (50g)')",
  "calories": number,
  "totalFat": number,
  "saturatedFat": number,
  "transFat": number,
  "cholesterol": number,
  "sodium": number,
  "totalCarbohydrate": number,
  "dietaryFiber": number,
  "totalSugars": number,
  "protein": number
}`;

export async function processLabelImage(base64Image: string, apiKey: string): Promise<NutritionInfo> {
  if (!apiKey) {
    throw new Error('API Key is required');
  }

  // Initialize the GenAI client with BYOK
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: SYSTEM_PROMPT },
            {
              inlineData: {
                data: base64Image,
                mimeType: 'image/jpeg',
              },
            },
          ],
        },
      ],
      config: {
        temperature: 0,
      }
    });

    let rawText = response.text || '';

    // Sanitize markdown blockquotes
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    const data = JSON.parse(rawText) as NutritionInfo;
    return data;
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Determine if it's an auth error vs general error
    if (error?.status === 401 || error?.status === 403 || error?.message?.includes('API key')) {
      throw new Error('Invalid API Key. Please check your settings.');
    }
    throw new Error('Failed to process image or parse response.');
  }
}
