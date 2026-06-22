<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../store/useAppStore'
import { processLabelImage } from '../services/gemini'
import { compressImage } from '../utils/image'
import { UploadCloud, Camera } from 'lucide-vue-next'

const { t } = useI18n()
const appStore = useAppStore()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const triggerFileInput = () => {
  if (appStore.isLoading) return
  fileInput.value?.click()
}

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    await handleFile(target.files[0])
  }
}

const onDrop = async (event: DragEvent) => {
  isDragging.value = false
  if (appStore.isLoading) return
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    await handleFile(event.dataTransfer.files[0])
  }
}

const handleFile = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    appStore.errorMessage = 'Please upload a valid image file.'
    return
  }
  
  if (!appStore.apiKey) {
    appStore.errorMessage = t('errorNoKey')
    return
  }

  try {
    appStore.isLoading = true
    appStore.errorMessage = null
    
    // Compress image
    const base64 = await compressImage(file, 1024, 0.8)
    appStore.currentImage = `data:image/jpeg;base64,${base64}`
    
    // Process with Gemini
    const data = await processLabelImage(base64, appStore.apiKey)
    appStore.nutritionData = data
  } catch (err: any) {
    appStore.errorMessage = err.message || t('errorProcessing')
    appStore.currentImage = null
  } finally {
    appStore.isLoading = false
  }
}
</script>

<template>
  <div 
    v-if="!appStore.currentImage"
    class="relative w-full max-w-lg mx-auto mt-8 group cursor-pointer"
    @click="triggerFileInput"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
    <div 
      :class="[
        'absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500',
        isDragging ? 'opacity-50 blur-lg' : ''
      ]"
    ></div>
    
    <div 
      :class="[
        'relative flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-2 border-dashed rounded-3xl transition-all duration-300',
        isDragging ? 'border-amber-500 scale-105' : 'border-gray-300 dark:border-gray-600 group-hover:border-amber-400'
      ]"
    >
      <input 
        ref="fileInput" 
        type="file" 
        accept="image/*" 
        class="hidden" 
        @change="onFileChange" 
      />
      
      <div class="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-full mb-4 group-hover:scale-110 transition-transform">
        <Camera class="w-10 h-10 text-amber-500 dark:text-amber-400" v-if="!isDragging" />
        <UploadCloud class="w-10 h-10 text-amber-500 dark:text-amber-400" v-else />
      </div>
      
      <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {{ t('uploadTitle') }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
        {{ t('uploadSubtitle') }}
      </p>
    </div>
  </div>
  
  <div v-else class="relative w-full max-w-lg mx-auto mt-8">
    <div class="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
      <img :src="appStore.currentImage" alt="Uploaded Label" class="w-full h-auto object-cover max-h-64" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </div>
  </div>
</template>
