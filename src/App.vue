<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from './store/useAppStore'
import Settings from './components/Settings.vue'
import ImageUploader from './components/ImageUploader.vue'
import USLabel from './components/USLabel.vue'
import ActionButtons from './components/ActionButtons.vue'
import Loader from './components/Loader.vue'

const { t } = useI18n()
const appStore = useAppStore()
</script>

<template>
  <div class="min-h-screen text-gray-900 dark:text-gray-100 font-sans pb-20">
    <Settings />

    <header class="pt-12 pb-6 text-center">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 inline-block mb-2 drop-shadow-sm">
        {{ t('appTitle') }}
      </h1>
    </header>

    <main class="max-w-4xl mx-auto px-4">
      
      <!-- Error Message -->
      <div v-if="appStore.errorMessage" class="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 flex items-center justify-between shadow-sm animate-pulse">
        <p class="font-medium">{{ appStore.errorMessage }}</p>
        <button @click="appStore.errorMessage = null" class="font-bold p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors">✕</button>
      </div>

      <ImageUploader />
      <USLabel />
      <ActionButtons />
      
    </main>

    <Loader v-if="appStore.isLoading" />
  </div>
</template>
