import { create } from "zustand";

interface DeleteModalStore {
  what: string;
  message: string;
  isOpen: boolean;
  callback: () => void;
  setCallback: (fn: () => void) => void;
  onOpen: (what: string, message: string) => void;
  onClose: () => void;
}

export const useDeleteModal = create<DeleteModalStore>((set) => ({
  what: "",
  message: "",
  isOpen: false,
  setCallback: (fn) => set({ callback: fn }),
  onOpen: (what, msg) => set({ what, message: msg, isOpen: true }),
  onClose: () => set({ isOpen: false }),
  callback: () => null,
}));
