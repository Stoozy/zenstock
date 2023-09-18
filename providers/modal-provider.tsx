"use client";

import { useEffect, useState } from "react";
import { ItemModal } from "@/components/modals/item-modal";
import { WarehouseModal } from "@/components/modals/warehouse-modal";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <WarehouseModal />
      </>
    )
  );
};
