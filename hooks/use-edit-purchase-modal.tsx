import PurchaseOrderProps from "@/lib/PurchaseOrderProps";
import { create } from "zustand";

interface useEditPurchaseModalStore {
  purchase: PurchaseOrderProps;
  isOpen: boolean;
  onOpen: (purchase: PurchaseOrderProps) => void;
  onClose: () => void;
}

export const useEditPurchaseModal = create<useEditPurchaseModalStore>(
  (set) => ({
    purchase: {
      id: "",
      item: "",
      supplier: "",
      quantity: 0,
      price: 0,
      total: 0,
      warehouseId: "",
      status: "",
    },
    isOpen: false,
    onOpen: (purchase: PurchaseOrderProps) => set({ purchase, isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
