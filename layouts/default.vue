<template>
  <div class="layout-default flex flex-col min-h-screen">
    <LayoutHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
    <BaseToast />
  </div>
</template>
