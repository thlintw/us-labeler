<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../store/useAppStore'
import { Copy, RefreshCw, Check } from 'lucide-vue-next'

const { t } = useI18n()
const appStore = useAppStore()
const copied = ref(false)

const copyToClipboard = async () => {
  if (!appStore.nutritionData) return
  
  const d = appStore.nutritionData
  // Format for Lose It!: simple sequential text block
  const textToCopy = `
Calories: ${d.calories}
Total Fat: ${d.totalFat}g
Saturated Fat: ${d.saturatedFat}g
Trans Fat: ${d.transFat}g
Cholesterol: ${d.cholesterol}mg
Sodium: ${d.sodium}mg
Total Carbohydrate: ${d.totalCarbohydrate}g
Dietary Fiber: ${d.dietaryFiber}g
Total Sugars: ${d.totalSugars}g
${d.addedSugars !== undefined ? `Added Sugars: ${d.addedSugars}g\n` : ''}Protein: ${d.protein}g
`.trim()

  try {
    await navigator.clipboard.writeText(textToCopy)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy text', err)
  }
}
</script>

<template>
  <div v-if="appStore.nutritionData" class="max-w-md mx-auto mt-8 flex gap-4">
    <button 
      @click="appStore.reset()"
      class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold transition-all"
    >
      <RefreshCw class="w-5 h-5" />
      {{ t('resetImage') }}
    </button>

    <button 
      @click="copyToClipboard"
      class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all shadow-lg hover:shadow-xl"
    >
      <Check v-if="copied" class="w-5 h-5" />
      <Copy v-else class="w-5 h-5" />
      {{ copied ? t('copied') : t('copyForLoseIt') }}
    </button>
  </div>
</template>
