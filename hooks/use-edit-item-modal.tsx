import ItemProps from "@/lib/ItemProps";
import { create } from "zustand";

interface useEditItemModalStore {
  item: ItemProps;
  setItem: (item: ItemProps) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useEditItemModal = create<useEditItemModalStore>((set) => ({
  item: {
    id: "",
    name: "",
    category: "",
    description: "",
    cost: 0,
    quantity: 0,
    price: 0,
  },
  isOpen: false,
  setItem: (item: ItemProps) => set({ item }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
