import ItemProps from "@/lib/ItemProps";
import { create } from "zustand";

interface useViewItemModalStore {
  item: ItemProps | undefined;
  setItem: (item: ItemProps) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useViewItemModal = create<useViewItemModalStore>((set) => ({
  item: undefined,
  setItem: (item: ItemProps) => set({ item }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
