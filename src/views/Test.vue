<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NutritionInfo } from '../store/useAppStore'
import USLabel from '../components/USLabel.vue'
import { captureElementAsBlob } from '../services/telegram'
import { Download } from 'lucide-vue-next'

const { t } = useI18n()

const mockData = ref<NutritionInfo>({
  servingSize: '1 cup (228g)',
  calories: 250,
  totalFat: 12,
  saturatedFat: 3,
  transFat: 3,
  cholesterol: 30,
  sodium: 470,
  totalCarbohydrate: 31,
  dietaryFiber: 0,
  totalSugars: 5,
  addedSugars: 2,
  protein: 5,
  vitaminD: 2,
  calcium: 260,
  iron: 8,
  potassium: 235
})

const downloading = ref(false)

const downloadCanvas = async () => {
  if (downloading.value) return
  try {
    downloading.value = true
    const blob = await captureElementAsBlob('us-label-content')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mock-label.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Failed to download canvas', err)
  } finally {
    downloading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <USLabel :data="mockData" />
    
    <div class="mt-8 max-w-md w-full">
      <button 
        @click="downloadCanvas"
        :disabled="downloading"
        class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        <Download class="w-5 h-5 animate-bounce" v-if="downloading" />
        <Download class="w-5 h-5" v-else />
        {{ t('downloadCanvas') }}
      </button>
    </div>
  </div>
</template>
