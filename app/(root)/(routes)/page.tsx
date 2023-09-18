"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useItemModal } from "@/hooks/use-item-modal";
import { useWarehouseModal } from "@/hooks/use-warehouse-modal";

const SetupPage = () => {
  const [mounted, setMounted] = useState(false);

  const warehouseModalOnOpen = useWarehouseModal((state) => state.onOpen);
  const warehouseModalIsOpen = useWarehouseModal((state) => state.isOpen);

  useEffect(() => {
    if (!warehouseModalIsOpen) {
      warehouseModalOnOpen();
    }
  }, [warehouseModalIsOpen, warehouseModalOnOpen]);

  return null;
};

export default SetupPage;
