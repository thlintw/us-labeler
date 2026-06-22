Here is the complete, updated Product Requirements Document (PRD) incorporating the modern Vue stack, the zero-cost architecture, and the crucial mobile-friendly additions (Compression, PWA, Sanitization, and Error Boundaries).

You can copy and paste this entire block directly into Cursor, Devin, GitHub Copilot, or Claude to start generating your code.
Markdown

# Product Requirements Document (PRD): AI Nutritional Label OCR Web App

## 1. Project Overview
A 100% client-side Single Page Application (SPA) hosted on GitHub Pages. The app allows users to upload or snap photos of foreign nutritional labels (primarily Taiwanese/Japanese), processes them using the Google Gemini Vision API, and renders a standardized US-style nutritional label. It is designed to be used on mobile devices to facilitate quick manual logging into diet trackers like Lose It!.

## 2. Tech Stack
* **Framework:** Vue 3 (Composition API, `<script setup>`)
* **Language:** TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **State Management:** Pinia
* **Icons:** `lucide-vue-next`
* **API Client:** Native `fetch` or `@google/genai` SDK
* **PWA Plugin:** `vite-plugin-pwa` (crucial for mobile home-screen installation)
* **Hosting:** GitHub Pages (Static site)

## 3. Core Features & User Flow
1.  **BYOK (Bring Your Own Key) Settings:**
    * A persistent settings modal/screen where the user enters their Google Gemini API Key.
    * The key is saved securely to the browser's `localStorage`.
    * If no key is found on app load, automatically prompt the user to enter one.
2.  **Image Input & Client-Side Compression:**
    * A responsive upload area supporting tap-to-open-camera (mobile) and drag-and-drop (desktop).
    * **Crucial Requirement:** Implement a canvas-based image resizing function before base64 encoding. Compress photos to a max-width of 1024px and convert to a medium-quality JPEG to prevent massive 15MB payloads from slowing down the API request.
3.  **AI Processing & Error Boundaries:**
    * Display a skeleton loader or spinner while awaiting the Gemini API response.
    * Implement strict error handling for: 
        * Invalid API Key (401/403 errors).
        * Blurry/Unreadable images.
        * General network timeouts.
        * Display human-readable error messages via a toast or alert component.
4.  **US-Style Label Rendering:**
    * A visual component strictly styled like a standard FDA nutritional label (black borders, Helvetica/Arial fonts, specific bolding for Calories/Fat).
5.  **Lose It! Export Text:**
    * A "Copy for Lose It!" button that extracts the data into a simple, sequential text block making it effortless to read off the screen or paste into notes.

## 4. State Management (Pinia Store)
Create a `useAppStore` with the following reactive state:
* `apiKey`: `string` (synced with `localStorage`)
* `currentImage`: `string | null` (base64 string of the compressed image)
* `nutritionData`: `NutritionInfo | null`
* `isLoading`: `boolean`
* `errorMessage`: `string | null`

## 5. TypeScript Interfaces
```typescript
interface NutritionInfo {
  servingSize: string;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number; // in mg
  sodium: number; // in mg
  totalCarbohydrate: number;
  dietaryFiber: number;
  totalSugars: number;
  addedSugars?: number; // Optional, as it is often missing on Asian labels
  protein: number;
}

6. The Gemini API Implementation

    Model: Use gemini-2.5-flash or gemini-2.0-flash for high speed and low cost.

    JSON Sanitization: LLMs frequently wrap JSON responses in markdown blockquotes. Before parsing the API response, you MUST apply a regex utility to strip ```json and  ``` from the string.

```The System Prompt:
Plaintext

You are an expert nutritionist. Review the attached image of a nutritional label (likely Taiwanese or Japanese).
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
}```

7. Recommended Component Structure

    src/App.vue: Main layout scaffolding.

    src/components/KeyManager.vue: Input field and save mechanism for localStorage.

    src/components/ImageUploader.vue: The dropzone/camera button with the HTML5 canvas compression logic.

    src/components/USLabel.vue: The pure UI component mapping NutritionInfo to the FDA-style layout.

    src/components/Loader.vue: Visual feedback during API calls.

    src/components/ActionButtons.vue: "Reset Image" and "Copy for Lose It!" logic.

8. Instructions for the Coding Agent

"Please build a complete Vite + Vue 3 application based on this PRD.

    Start by setting up the Vite project with Vue, TypeScript, Tailwind CSS, and vite-plugin-pwa for mobile installation.

    Build the Pinia store for state management.

    Implement the ImageUploader component specifically ensuring client-side image compression logic is written.

    Write the Gemini API service, ensuring you include a markdown-stripping regex before running JSON.parse().

    Finally, construct the USLabel component to visually match standard US FDA guidelines."