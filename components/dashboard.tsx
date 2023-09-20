"use client";
import ItemProps from "@/lib/ItemProps";
import OrderProps from "@/lib/ItemProps";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Pencil, PencilIcon } from "lucide-react";
import { useItemModal } from "@/hooks/use-item-modal";
import { useWarehouseModal } from "@/hooks/use-warehouse-modal";
import { useParams } from "next/navigation";
import { DataTableDemo } from "./datagrid";

type Items = ItemProps[];
type Orders = OrderProps[];

export const Dashboard: React.FC<{ items: Items; orders: Orders }> = ({
  items,
  orders,
}) => {
  const itemModal = useItemModal();
  const warehouseModal = useWarehouseModal();
  const params = useParams();

  const newItemOnSubmit = () => {
    console.log("opening item modal");

    console.log(params);
    itemModal.onOpen();
  };

  return <DataTableDemo></DataTableDemo>;
};
