<template>
  <section class="bg-white border-b border-base-200">
    <div class="container mx-auto px-4 max-w-screen-xl py-5">
      <div class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.label"
          :to="cat.href"
          class="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div
            :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center',
              'group-hover:scale-110 group-hover:shadow-md transition-all duration-200',
              cat.bg,
            ]"
          >
            <span :class="['flex items-center justify-center', cat.color]" v-html="cat.icon" />
          </div>
          <span class="text-[11px] text-center text-base-content/60 group-hover:text-primary transition-colors font-medium leading-tight">
            {{ cat.label }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [

]
</script>
