import { create } from "zustand";

interface useItemModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useItemModal = create<useItemModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
