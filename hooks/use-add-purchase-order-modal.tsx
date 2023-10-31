import { create } from "zustand";

interface useAddPurchaseOrder {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddPurchaseOrderModal = create<useAddPurchaseOrder>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
