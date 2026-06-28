<template>
  <!-- Left-aligned -->
  <div v-if="!center" class="flex items-start justify-between gap-4 mb-8">
    <div>
      <div v-if="label" class="inline-flex items-center gap-2 mb-1.5">
        <span class="w-4 h-0.5 rounded-full" :class="colors.dot" />
        <span class="text-[10px] font-black uppercase tracking-[0.18em]" :class="colors.label">{{ label }}</span>
      </div>
      <h2
        class="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight"
        :class="dark ? 'text-white' : 'text-[#0F172A]'"
      >
        <slot name="title">{{ title }}</slot>
      </h2>
      <p v-if="subtitle" class="text-sm mt-1.5" :class="dark ? 'text-white/40' : 'text-base-content/50'">
        {{ subtitle }}
      </p>
      <div class="mt-3 h-1 w-20 rounded-full" :class="colors.line" />
    </div>

    <NuxtLink
      v-if="to"
      :to="to"
      class="flex-shrink-0 mt-1 inline-flex items-center gap-1.5 text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-200"
      :class="colors.link"
    >
      {{ linkText ?? 'Xem tất cả' }}
      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </NuxtLink>
  </div>

  <!-- Centered -->
  <div v-else class="text-center mb-10">
    <div v-if="label" class="inline-flex items-center justify-center gap-2 mb-2">
      <span class="w-5 h-0.5 rounded-full" :class="colors.dot" />
      <span class="text-[10px] font-black uppercase tracking-[0.18em]" :class="colors.label">{{ label }}</span>
      <span class="w-5 h-0.5 rounded-full" :class="colors.dot" />
    </div>
    <h2
      class="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight"
      :class="dark ? 'text-white' : 'text-[#0F172A]'"
    >
      <slot name="title">{{ title }}</slot>
    </h2>
    <div class="mt-3 mx-auto h-1 w-20 rounded-full" :class="colors.lineCenter" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string
  title?: string
  subtitle?: string
  to?: string
  linkText?: string
  center?: boolean
  dark?: boolean
  accent?: 'primary' | 'orange'
}>()

const colors = computed(() => {
  if (props.accent === 'orange') {
    return {
      label: 'text-[#FFA500]',
      dot: 'bg-[#FFA500]',
      line: 'bg-gradient-to-r from-[#FFA500] via-[#FFA500]/50 to-transparent',
      lineCenter: 'bg-gradient-to-r from-transparent via-[#FFA500] to-transparent',
      link: 'text-[#FFA500] border-[#FFA500]/30 bg-[#FFA500]/10 hover:bg-[#FFA500] hover:text-black',
    }
  }
  return {
    label: 'text-primary',
    dot: 'bg-primary',
    line: 'bg-gradient-to-r from-primary via-primary/50 to-transparent',
    lineCenter: 'bg-gradient-to-r from-transparent via-primary to-transparent',
    link: 'text-primary border-primary/25 bg-primary/5 hover:bg-primary hover:text-white',
  }
})
</script>
