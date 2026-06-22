<script setup lang="ts">
import { useAppStore } from '../store/useAppStore'
import ImageUploader from '../components/ImageUploader.vue'
import USLabel from '../components/USLabel.vue'
import ActionButtons from '../components/ActionButtons.vue'

const appStore = useAppStore()
</script>

<template>
  <div>
    <ImageUploader />
    <!-- Action buttons now use appStore internally, but USLabel expects data -->
    <USLabel v-if="appStore.nutritionData" :data="appStore.nutritionData" />
    <ActionButtons />
  </div>
</template>
