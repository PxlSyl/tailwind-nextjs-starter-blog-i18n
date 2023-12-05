import { create } from 'zustand'

interface ContactModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useContactModal = create<ContactModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
