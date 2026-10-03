<template>
  <!-- Inline styles (not Tailwind classes) so the splash covers the screen from the
       very first paint, before any stylesheet has loaded -- otherwise the page shows
       first and the splash pops in over it once the CSS arrives. -->
  <div
    style="position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: #000;"
  >
    <CommonHLogo style="width: 8rem; height: 8rem;" />
  </div>
</template>
