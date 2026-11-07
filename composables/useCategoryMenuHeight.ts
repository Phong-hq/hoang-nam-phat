// Height of the desktop category dropdown, which auto-opens on the home page and
// sits on top of HomeHero's reserved left gap -- the hero banner must be exactly
// as tall as the list, or the list spills onto the next section.
//
// It used to be known only after hydration (measured in the browser), so the
// server HTML fell back to a guessed 380px and the banner visibly jumped once JS
// ran. Every row in CommonCategoryMenu has a fixed height (names are truncated to
// one line), so the server can estimate it from the category count; the browser
// measurement (Header.vue) then overrides it only if the real height differs.

import { computed } from 'vue'
import { useCategoryStore } from '~/stores/category.store'

// Keep in sync with CommonCategoryMenu: each row is `text-sm` (tailwind.config.ts:
// 1rem / 1.5rem line-height = 24px) + `py-[9px]` = 42px; the list has `py-1` = 8px.
const ROW_PX = 42
const LIST_PADDING_PX = 8
const FALLBACK_PX = 380

export function useMeasuredCategoryMenuHeight() {
  return useState<number | null>('category-menu-height-measured', () => null)
}

export function useCategoryMenuHeight() {
  const categoryStore = useCategoryStore()
  const measured = useMeasuredCategoryMenuHeight()
  return computed(() => {
    if (measured.value) return measured.value
    const count = categoryStore.categories.length
    return count ? LIST_PADDING_PX + count * ROW_PX : FALLBACK_PX
  })
}
