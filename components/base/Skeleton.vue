<template>
  <div :class="['skeleton rounded-xl', $attrs.class]" v-bind="{ ...$attrs, class: undefined }" />
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>
