<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { NutritionInfo } from '../store/useAppStore'

const { t } = useI18n()

defineProps<{
  data: NutritionInfo
}>()
</script>

<template>
  <div v-if="data" class="max-w-md mx-auto mt-8 bg-white text-black p-4 border-[4px] border-black font-sans shadow-2xl relative select-text" id="us-label-content">
    <header class="border-b-[10px] border-black pb-1 mb-1">
      <h1 class="text-4xl font-black m-0 leading-none tracking-tighter">{{ t('nutritionFacts') }}</h1>
    </header>

    <div class="border-b-[5px] border-black pb-1 mb-1 text-lg font-bold flex justify-between">
      <span>{{ t('servingSize') }}</span>
      <span>{{ data.servingSize }}</span>
    </div>

    <div class="flex justify-between items-end border-b-[5px] border-black pb-1 mb-2">
      <div>
        <div class="text-sm font-bold">{{ t('amountPerServing') }}</div>
        <div class="text-3xl font-black leading-none">{{ t('calories') }}</div>
      </div>
      <div class="text-4xl font-black leading-none">{{ data.calories }}</div>
    </div>

    <div class="text-right text-sm font-bold border-b border-black pb-1 mb-1">
      {{ t('dailyValue') }}
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('totalFat') }}</span> {{ data.totalFat }}g</div>
    </div>
    
    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-4">
      <div>{{ t('saturatedFat') }} {{ data.saturatedFat }}g</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-4">
      <div class="italic">{{ t('transFat') }} {{ data.transFat }}g</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('cholesterol') }}</span> {{ data.cholesterol }}mg</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('sodium') }}</span> {{ data.sodium }}mg</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('totalCarbohydrate') }}</span> {{ data.totalCarbohydrate }}g</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-4">
      <div>{{ t('dietaryFiber') }} {{ data.dietaryFiber }}g</div>
    </div>

    <div class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-4">
      <div>{{ t('totalSugars') }} {{ data.totalSugars }}g</div>
    </div>

    <div v-if="data.addedSugars !== undefined" class="border-b border-black pb-1 mb-1 text-sm flex justify-between pl-8">
      <div>{{ t('includesAddedSugars') }} {{ data.addedSugars }}g</div>
    </div>

    <div class="border-b-[5px] border-black pb-1 mb-1 text-sm flex justify-between">
      <div><span class="font-bold">{{ t('protein') }}</span> {{ data.protein }}g</div>
    </div>

    <!-- Vitamins & Minerals section -->
    <div v-if="data.vitaminD !== undefined" class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div>{{ t('vitaminD') }}</div>
      <div>{{ data.vitaminD }}mcg</div>
    </div>
    <div v-if="data.calcium !== undefined" class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div>{{ t('calcium') }}</div>
      <div>{{ data.calcium }}mg</div>
    </div>
    <div v-if="data.iron !== undefined" class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div>{{ t('iron') }}</div>
      <div>{{ data.iron }}mg</div>
    </div>
    <div v-if="data.potassium !== undefined" class="border-b border-black pb-1 mb-1 text-sm flex justify-between">
      <div>{{ t('potassium') }}</div>
      <div>{{ data.potassium }}mg</div>
    </div>

  </div>
</template>
