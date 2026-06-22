<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../store/useAppStore'

const { t } = useI18n()
const appStore = useAppStore()

</script>

<template>
  <div v-if="appStore.nutritionData" class="max-w-md mx-auto mt-8 bg-white text-black p-4 border-[4px] border-black font-sans shadow-2xl relative select-text" id="us-label-content">
    <header class="border-b-[10px] border-black pb-1 mb-1">
      <h1 class="text-4xl font-black m-0 leading-none tracking-tighter">{{ t('nutritionFacts') }}</h1>
    </header>

    <div class="border-b-[5px] border-black pb-1 mb-1 text-lg font-bold flex justify-between">
      <span>{{ t('servingSize') }}</span>
      <span>{{ appStore.nutritionData.servingSize }}</span>
    </div>

    <div class="flex justify-between items-end border-b-[5px] border-black pb-1 mb-2">
      <div>
        <div class="text-sm font-bold">{{ t('amountPerServing') }}</div>
        <div class="text-3xl font-black leading-none">{{ t('calories') }}</div>
      </div>
      <div class="text-4xl font-black leading-none">{{ appStore.nutritionData.calories }}</div>
    </div>

    <div class="text-right text-sm font-bold border-b border-black pb-1 mb-1">
      {{ t('dailyValue') }}
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('totalFat') }}</span> {{ appStore.nutritionData.totalFat }}g</div>
    </div>
    
    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-4">
      <div>{{ t('saturatedFat') }} {{ appStore.nutritionData.saturatedFat }}g</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-4">
      <div class="italic">{{ t('transFat') }} {{ appStore.nutritionData.transFat }}g</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('cholesterol') }}</span> {{ appStore.nutritionData.cholesterol }}mg</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('sodium') }}</span> {{ appStore.nutritionData.sodium }}mg</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('totalCarbohydrate') }}</span> {{ appStore.nutritionData.totalCarbohydrate }}g</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-4">
      <div>{{ t('dietaryFiber') }} {{ appStore.nutritionData.dietaryFiber }}g</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-4">
      <div>{{ t('totalSugars') }} {{ appStore.nutritionData.totalSugars }}g</div>
    </div>

    <div v-if="appStore.nutritionData.addedSugars !== undefined" class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-8">
      <div>{{ t('includesAddedSugars') }} {{ appStore.nutritionData.addedSugars }}g</div>
    </div>

    <div class="border-b-[5px] border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('protein') }}</span> {{ appStore.nutritionData.protein }}g</div>
    </div>
  </div>
</template>
