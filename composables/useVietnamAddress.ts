interface ProvinceApiItem {
  code: number
  name: string
}

interface ProvinceWithWardsApiItem extends ProvinceApiItem {
  wards: ProvinceApiItem[]
}

const ADDRESS_API_BASE = 'https://provinces.open-api.vn/api/v2'

export function useVietnamAddress() {
  const provinces = ref<ProvinceApiItem[]>([])
  const wards = ref<ProvinceApiItem[]>([])
  const loadingProvinces = ref(false)
  const loadingWards = ref(false)

  async function fetchProvinces() {
    if (provinces.value.length) return
    loadingProvinces.value = true
    try {
      provinces.value = await $fetch<ProvinceApiItem[]>(`${ADDRESS_API_BASE}/p/`)
    } finally {
      loadingProvinces.value = false
    }
  }

  async function fetchWards(provinceCode: string | number) {
    wards.value = []
    if (!provinceCode) return
    loadingWards.value = true
    try {
      const province = await $fetch<ProvinceWithWardsApiItem>(`${ADDRESS_API_BASE}/p/${provinceCode}?depth=2`)
      wards.value = province.wards
    } finally {
      loadingWards.value = false
    }
  }

  return {
    provinces,
    wards,
    loadingProvinces,
    loadingWards,
    fetchProvinces,
    fetchWards,
  }
}
