<template>
  <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-md">
    <!-- Spinner -->
    <div class="relative w-20 h-20">
      <div class="absolute inset-0 border-4 border-amber-200 dark:border-amber-900 rounded-full"></div>
      <div class="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <div class="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
      Processing image...
    </div>
  </div>
</template>
