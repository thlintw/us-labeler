<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from './store/useAppStore'
import Settings from './components/Settings.vue'
import Loader from './components/Loader.vue'
import { RouterView } from 'vue-router'
import { Download } from 'lucide-vue-next'

const { t } = useI18n()
const appStore = useAppStore()
const appVersion = __APP_VERSION__

// PWA Install Logic
const deferredPrompt = ref<any>(null)

const handleBeforeInstallPrompt = (e: any) => {
  e.preventDefault()
  deferredPrompt.value = e
}

const handleAppInstalled = () => {
  deferredPrompt.value = null
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('appinstalled', handleAppInstalled)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})

const installApp = async () => {
  if (!deferredPrompt.value) return
  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  if (outcome === 'accepted') {
    deferredPrompt.value = null
  }
}
</script>

<template>
  <div class="min-h-screen text-gray-900 dark:text-gray-100 font-sans pb-20">
    <Settings />

    <!-- Install App Button -->
    <button 
      v-if="deferredPrompt"
      @click="installApp" 
      class="fixed top-4 right-16 p-2 px-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg transition-all z-40 flex items-center gap-2 font-bold text-sm"
    >
      <Download class="w-4 h-4" />
      {{ t('installApp') }}
    </button>

    <header class="pt-12 pb-6 text-center">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 inline-block mb-2 drop-shadow-sm">
        {{ t('appTitle') }}
      </h1>
      
      <!-- <nav class="mt-4 flex justify-center gap-4 text-sm font-semibold">
        <RouterLink to="/" class="px-4 py-2 rounded-full transition-all text-gray-500 hover:text-amber-500" active-class="!text-amber-600 dark:!text-amber-400 bg-amber-100 dark:bg-amber-900/30">
          {{ t('navScanner') }}
        </RouterLink>
        <RouterLink to="/test" class="px-4 py-2 rounded-full transition-all text-gray-500 hover:text-amber-500" active-class="!text-amber-600 dark:!text-amber-400 bg-amber-100 dark:bg-amber-900/30">
          {{ t('navTest') }}
        </RouterLink>
      </nav> -->
    </header>

    <main class="max-w-4xl mx-auto px-4">
      
      <!-- Error Message -->
      <div v-if="appStore.errorMessage" class="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 flex items-center justify-between shadow-sm animate-pulse">
        <p class="font-medium">{{ appStore.errorMessage }}</p>
        <button @click="appStore.errorMessage = null" class="font-bold p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors">✕</button>
      </div>

      <RouterView />
      
    </main>

    <Loader v-if="appStore.isLoading" />

    <!-- Version Footer -->
    <footer class="text-center text-xs text-gray-400/80 dark:text-gray-500/80 pt-16 pb-4 font-mono">
      v{{ appVersion }}
    </footer>
  </div>
</template>
