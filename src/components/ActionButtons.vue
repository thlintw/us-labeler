<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../store/useAppStore'
import { Copy, RefreshCw, Check, Send } from 'lucide-vue-next'
import { captureElementAsBlob, sendPhotoToTelegram } from '../services/telegram'

const { t } = useI18n()
const appStore = useAppStore()
const copied = ref(false)
const telegramSending = ref(false)
const telegramSent = ref(false)

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

const sendToTelegramAction = async () => {
  if (telegramSending.value) return
  try {
    telegramSending.value = true
    const blob = await captureElementAsBlob('us-label-content')
    await sendPhotoToTelegram(appStore.telegramBotToken, appStore.telegramChatId, blob)
    telegramSent.value = true
    setTimeout(() => { telegramSent.value = false }, 3000)
  } catch (err: any) {
    appStore.errorMessage = err.message || 'Failed to send to Telegram'
  } finally {
    telegramSending.value = false
  }
}
</script>

<template>
  <div v-if="appStore.nutritionData" class="max-w-md mx-auto mt-8 flex flex-col gap-4">
    <div class="flex gap-4">
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

    <!-- Send to Telegram Button -->
    <button 
      v-if="appStore.telegramBotToken && appStore.telegramChatId"
      @click="sendToTelegramAction"
      :disabled="telegramSending"
      class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
    >
      <Check v-if="telegramSent" class="w-5 h-5" />
      <RefreshCw v-else-if="telegramSending" class="w-5 h-5 animate-spin" />
      <Send v-else class="w-5 h-5" />
      {{ telegramSent ? t('copied') : t('sendToTelegram') }}
    </button>
  </div>
</template>
