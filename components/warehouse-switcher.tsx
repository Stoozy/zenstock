"use client";
import { warehouse } from "@prisma/client";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useWarehouseModal } from "@/hooks/use-warehouse-modal";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircleIcon,
  Warehouse as StoreIcon,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface WarehouseSwitcherProps extends PopoverTriggerProps {
  items: warehouse[];
}

export default function WarehouseSwitcher({
  className,
  items = [],
}: WarehouseSwitcherProps) {
  const warehouseModal = useWarehouseModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentWarouse = formattedItems.find(
    (item) => item.value === params.warehouseId
  );

  const [open, setOpen] = useState(false);

  const onWarehouseSelect = (warehouse: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${warehouse.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="select a warehouse"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentWarouse?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search warehouse" />
            <CommandEmpty>No warehouse found.</CommandEmpty>
            <CommandGroup heading="Warehouses">
              {formattedItems.map((warehouse) => (
                <CommandItem
                  key={warehouse.value}
                  onSelect={() => onWarehouseSelect(warehouse)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {warehouse.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentWarouse?.value === warehouse.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  warehouseModal.onOpen();
                }}
              >
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                Create Warehouse
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
