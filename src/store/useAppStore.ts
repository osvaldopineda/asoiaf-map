import { create } from 'zustand'

interface AppState {
  selectedRegionId: string | null
  select: (id: string | null) => void
  soundOn: boolean
  toggleSound: () => void
  eraId: string
  setEra: (id: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedRegionId: null,
  select: (id) => set({ selectedRegionId: id }),
  soundOn: false,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  eraId: 'five-kings', // start in the present of the saga
  setEra: (id) => set({ eraId: id }),
}))
