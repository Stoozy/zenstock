import { create } from "zustand";

interface DeleteModalStore {
  message: string;
  isOpen: boolean;
  callback: () => void;
  setCallback: (fn: () => void) => void;
  onOpen: (what: string) => void;
  onClose: () => void;
}

export const useDeleteModal = create<DeleteModalStore>((set) => ({
  message: "",
  isOpen: false,
  setCallback: (fn) => set({ callback: fn }),
  onOpen: (msg) => set({ message: msg, isOpen: true }),
  onClose: () => set({ isOpen: false }),
  callback: () => null,
}));
