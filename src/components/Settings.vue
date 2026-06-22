<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../store/useAppStore'
import { X, Settings as SettingsIcon, Key } from 'lucide-vue-next'

const { t, locale } = useI18n()
const appStore = useAppStore()

const isOpen = ref(false)
const inputKey = ref(appStore.apiKey)

onMounted(() => {
  if (!appStore.apiKey) {
    isOpen.value = true
  }
})

const save = () => {
  appStore.apiKey = inputKey.value
  isOpen.value = false
}

const changeLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('app_lang', lang)
}
</script>

<template>
  <div>
    <!-- Trigger Button -->
    <button @click="isOpen = true" class="fixed top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-lg transition-all text-gray-800 dark:text-gray-100 z-40">
      <SettingsIcon class="w-6 h-6" />
    </button>

    <!-- Modal Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
      <!-- Modal Content -->
      <div class="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
        
        <!-- Close Button (only if key exists) -->
        <button v-if="appStore.apiKey" @click="isOpen = false" class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400">
          <X class="w-5 h-5" />
        </button>

        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          <SettingsIcon class="w-6 h-6 text-amber-500" />
          {{ t('settings') }}
        </h2>

        <!-- API Key Setting -->
        <div class="space-y-2 mb-6">
          <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Key class="w-4 h-4" />
            {{ t('apiKeyTitle') }}
          </label>
          <input 
            v-model="inputKey" 
            type="password" 
            :placeholder="t('apiKeyPlaceholder')"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ t('apiKeyHelp') }}
          </p>
        </div>

        <!-- Language Setting -->
        <div class="space-y-2 mb-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {{ t('language') }}
          </label>
          <div class="flex gap-2">
            <button 
              @click="changeLanguage('en-US')" 
              :class="['flex-1 py-2 rounded-xl text-sm font-medium transition-all', locale === 'en-US' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600']"
            >
              English
            </button>
            <button 
              @click="changeLanguage('zh-TW')" 
              :class="['flex-1 py-2 rounded-xl text-sm font-medium transition-all', locale === 'zh-TW' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600']"
            >
              繁體中文
            </button>
          </div>
        </div>

        <!-- Theme Setting -->
        <div class="space-y-2 mb-8">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {{ t('theme') || 'Theme' }}
          </label>
          <div class="flex gap-2">
            <button 
              v-for="opt in ['light', 'dark', 'system']" :key="opt"
              @click="appStore.theme = opt as any" 
              :class="['flex-1 py-2 rounded-xl text-sm font-medium transition-all capitalize', appStore.theme === opt ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600']"
            >
              {{ t(opt) || opt }}
            </button>
          </div>
        </div>

        <!-- Save Button -->
        <button 
          @click="save" 
          :disabled="!inputKey"
          class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all"
        >
          {{ t('apiKeySave') }}
        </button>
      </div>
    </div>
  </div>
</template>
