import ItemProps from "@/lib/ItemProps";
import { create } from "zustand";

interface useEditItemModalStore {
  item: ItemProps;
  isOpen: boolean;
  onOpen: (item: ItemProps) => void;
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
  onOpen: (item: ItemProps) => set({ item, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
