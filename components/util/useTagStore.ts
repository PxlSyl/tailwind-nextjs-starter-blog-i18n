import { create } from 'zustand'

interface TagStore {
  selectedTag: string
  setSelectedTag: (tag: string) => void
}

export const useTagStore = create<TagStore>((set) => ({
  selectedTag: '',
  setSelectedTag: (tag) => set({ selectedTag: tag }),
}))
