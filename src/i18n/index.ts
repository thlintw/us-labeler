import { createI18n } from 'vue-i18n'

const messages = {
  'en-US': {
    appTitle: 'US Labeler',
    settings: 'Settings',
    apiKeyTitle: 'Google Gemini API Key',
    apiKeyPlaceholder: 'Enter your API key',
    apiKeySave: 'Save',
    apiKeyHelp: 'Your API key is saved locally in your browser.',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    uploadTitle: 'Upload Image',
    uploadSubtitle: 'Tap to open camera or drag and drop an image of a nutritional label.',
    resetImage: 'Reset Image',
    copyForLoseIt: 'Copy for Lose It!',
    copied: 'Copied!',
    errorNoKey: 'Please enter a valid Google Gemini API Key in Settings.',
    errorProcessing: 'Failed to process image. Please try again.',
    errorBlurry: 'Image is too blurry or unreadable.',
    errorTimeout: 'Network timeout.',
    // US Label specific
    nutritionFacts: 'Nutrition Facts',
    servingSize: 'Serving Size',
    amountPerServing: 'Amount Per Serving',
    calories: 'Calories',
    dailyValue: '% Daily Value*',
    totalFat: 'Total Fat',
    saturatedFat: 'Saturated Fat',
    transFat: 'Trans Fat',
    cholesterol: 'Cholesterol',
    sodium: 'Sodium',
    totalCarbohydrate: 'Total Carbohydrate',
    dietaryFiber: 'Dietary Fiber',
    totalSugars: 'Total Sugars',
    includesAddedSugars: 'Includes Added Sugars',
    protein: 'Protein'
  },
  'zh-TW': {
    appTitle: '營養標籤轉換器',
    settings: '設定',
    apiKeyTitle: 'Google Gemini API 金鑰',
    apiKeyPlaceholder: '請輸入 API 金鑰',
    apiKeySave: '儲存',
    apiKeyHelp: 'API 金鑰會安全地儲存在您的瀏覽器中。',
    language: '語言',
    theme: '外觀主題',
    light: '淺色',
    dark: '深色',
    system: '跟隨系統',
    uploadTitle: '上傳圖片',
    uploadSubtitle: '點擊開啟相機，或拖曳營養標籤圖片至此。',
    resetImage: '重新上傳',
    copyForLoseIt: '複製給 Lose It!',
    copied: '已複製！',
    errorNoKey: '請在設定中輸入有效的 Google Gemini API 金鑰。',
    errorProcessing: '處理圖片失敗，請重試。',
    errorBlurry: '圖片太模糊或無法讀取。',
    errorTimeout: '網路連線逾時。',
    // US Label specific
    nutritionFacts: 'Nutrition Facts (營養標示)',
    servingSize: 'Serving Size (每一份量)',
    amountPerServing: 'Amount Per Serving (每份含量)',
    calories: 'Calories (熱量)',
    dailyValue: '% Daily Value* (每日參考值百分比*)',
    totalFat: 'Total Fat (脂肪)',
    saturatedFat: 'Saturated Fat (飽和脂肪)',
    transFat: 'Trans Fat (反式脂肪)',
    cholesterol: 'Cholesterol (膽固醇)',
    sodium: 'Sodium (鈉)',
    totalCarbohydrate: 'Total Carbohydrate (碳水化合物)',
    dietaryFiber: 'Dietary Fiber (膳食纖維)',
    totalSugars: 'Total Sugars (糖)',
    includesAddedSugars: 'Includes Added Sugars (含添加糖)',
    protein: 'Protein (蛋白質)'
  }
}

const defaultLocale = localStorage.getItem('app_lang') || 'en-US'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  messages,
})

export default i18n
