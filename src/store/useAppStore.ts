import { defineStore } from 'pinia'
import { ref, watch, onMounted } from 'vue'

export interface NutritionInfo {
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
  addedSugars?: number; // Optional
  protein: number;
}

type Theme = 'light' | 'dark' | 'system'

export const useAppStore = defineStore('app', () => {
  const apiKey = ref(localStorage.getItem('gemini_api_key') || '')
  const currentImage = ref<string | null>(null)
  const nutritionData = ref<NutritionInfo | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)
  const theme = ref<Theme>((localStorage.getItem('app_theme') as Theme) || 'system')

  // Sync apiKey to localStorage
  watch(apiKey, (newVal) => {
    localStorage.setItem('gemini_api_key', newVal)
  })

  // Theme management
  const applyTheme = () => {
    const isDark = theme.value === 'dark' || (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  }

  watch(theme, (newVal) => {
    localStorage.setItem('app_theme', newVal)
    applyTheme()
  })

  onMounted(() => {
    applyTheme()
    // Watch for system theme changes if set to system
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') applyTheme()
    })
  })

  function reset() {
    currentImage.value = null
    nutritionData.value = null
    errorMessage.value = null
  }

  return {
    apiKey,
    currentImage,
    nutritionData,
    isLoading,
    errorMessage,
    theme,
    reset
  }
})
