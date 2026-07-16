<script setup lang="ts">
const rootEl = ref<SVGSVGElement | null>(null)
let lockTimer: ReturnType<typeof setTimeout> | undefined
let idleTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  lockTimer = setTimeout(() => {
    rootEl.value?.classList.add('is-locked')
    idleTimer = setTimeout(() => {
      rootEl.value?.classList.remove('is-locked')
      rootEl.value?.classList.add('is-idle')
    }, 520)
  }, 1060)
})

onBeforeUnmount(() => {
  clearTimeout(lockTimer)
  clearTimeout(idleTimer)
})
</script>

<template>
  <svg
    ref="rootEl"
    width="512"
    height="512"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    class="h-logo"
  >
    <rect width="512" height="512" fill="black" />

    <defs>
      <linearGradient id="h-shimmer-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
        <stop offset="50%" stop-color="#ffffff" stop-opacity=".9" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>
      <clipPath id="h-logo-clip">
        <path d="M165 208 L212 167 L212 304 L165 345 Z" />
        <path d="M232 150 L280 109 L280 237 L232 237 Z" />
        <path d="M232 260 L280 260 L280 345 L232 386 Z" />
        <path d="M300 190 L347 149 L347 286 L300 327 Z" />
      </clipPath>
    </defs>

    <path class="h-shard h-shard-left" d="M165 208 L212 167 L212 304 L165 345 Z" fill="#FF1020" />
    <path class="h-shard h-shard-center-top" d="M232 150 L280 109 L280 237 L232 237 Z" fill="#FF1020" />
    <path class="h-shard h-shard-center-bottom" d="M232 260 L280 260 L280 345 L232 386 Z" fill="#FF1020" />
    <path class="h-shard h-shard-right" d="M300 190 L347 149 L347 286 L300 327 Z" fill="#FF1020" />

    <g class="h-shimmer" clip-path="url(#h-logo-clip)">
      <rect x="90" y="85" width="60" height="330" fill="url(#h-shimmer-grad)" />
    </g>
  </svg>
</template>

<style scoped>
.h-logo .h-shard {
  opacity: 0;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.18, 1.4, 0.32, 1);
  transform-box: fill-box;
  transform-origin: center;
}

.h-logo .h-shard-left { animation-name: h-in-left; animation-duration: 0.72s; animation-delay: 0s; }
.h-logo .h-shard-right { animation-name: h-in-right; animation-duration: 0.72s; animation-delay: 0.08s; }
.h-logo .h-shard-center-top { animation-name: h-in-center-top; animation-duration: 0.72s; animation-delay: 0.16s; }
.h-logo .h-shard-center-bottom { animation-name: h-in-center-bottom; animation-duration: 0.76s; animation-delay: 0.3s; }

@keyframes h-in-left {
  0% { opacity: 0; transform: translate(-46px, 150px); }
  100% { opacity: 1; transform: translate(0, 0); }
}
@keyframes h-in-right {
  0% { opacity: 0; transform: translate(48px, -155px); }
  100% { opacity: 1; transform: translate(0, 0); }
}
@keyframes h-in-center-top {
  0% { opacity: 0; transform: translate(42px, -145px); }
  100% { opacity: 1; transform: translate(0, 0); }
}
@keyframes h-in-center-bottom {
  0% { opacity: 0; transform: translate(-42px, 145px); }
  100% { opacity: 1; transform: translate(0, 0); }
}

.h-logo.is-locked .h-shard {
  animation: none;
  opacity: 1;
  transform: none;
}
.h-logo.is-locked {
  animation: h-lockpulse 0.5s cubic-bezier(0.2, 1.6, 0.3, 1) 1;
  filter: drop-shadow(0 0 26px rgba(255, 16, 32, 0.38));
}
@keyframes h-lockpulse {
  0% { transform: scale(1); }
  45% { transform: scale(1.045); }
  100% { transform: scale(1); }
}

.h-logo.is-idle {
  animation: h-breathe 4.2s ease-in-out infinite;
}
@keyframes h-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.008); }
}

.h-logo .h-shimmer { opacity: 0; }
.h-logo.is-idle .h-shimmer {
  opacity: 1;
  animation: h-sweep 3.1s ease-in-out infinite;
}
@keyframes h-sweep {
  0% { transform: translateX(-180px) skewX(-40deg); opacity: 0; }
  12% { opacity: 0.55; }
  38% { opacity: 0; }
  100% { transform: translateX(180px) skewX(-40deg); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .h-logo .h-shard { animation-duration: 0.01s !important; animation-delay: 0s !important; }
  .h-logo.is-locked { animation: none; }
  .h-logo.is-idle { animation: none; }
  .h-logo.is-idle .h-shimmer { animation: none; opacity: 0; }
}
</style>
