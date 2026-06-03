import { create } from 'zustand'

interface AppState {
  selectedRegionId: string | null
  select: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedRegionId: null,
  select: (id) => set({ selectedRegionId: id }),
}))
