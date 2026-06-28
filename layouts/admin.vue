<template>
  <div class="layout-admin flex min-h-screen bg-base-200">
    <aside class="w-64 bg-base-100 shadow-lg flex-shrink-0">
      <div class="p-4 border-b border-base-200">
        <span class="font-bold text-primary">Admin Panel</span>
      </div>
      <nav class="p-4">
        <ul class="menu menu-compact">
          <li><NuxtLink to="/admin">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/admin/products">San pham</NuxtLink></li>
        </ul>
      </nav>
    </aside>
    <div class="flex-1 flex flex-col">
      <header class="bg-base-100 shadow-sm p-4">
        <span class="font-semibold">Hoang Nam Phat Admin</span>
      </header>
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
