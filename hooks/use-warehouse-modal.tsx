import { create } from "zustand";

interface useWarehouseModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useWarehouseModal = create<useWarehouseModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
