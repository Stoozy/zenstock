"use client";

import { useEffect, useState } from "react";
import { AddItemModal } from "@/components/modals/add-item-modal";
import { WarehouseModal } from "@/components/modals/warehouse-modal";
import { ViewItemModal } from "@/components/modals/view-item-modal";
import EditItemModal from "@/components/modals/edit-item-modal";
import DeleteModal from "@/components/modals/delete-modal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <WarehouseModal />
        <AddItemModal />
        <ViewItemModal />
        <EditItemModal />
        <DeleteModal />
      </>
    )
  );
};
