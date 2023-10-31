"use client";

import * as z from "zod";
import { useAddItemModal } from "@/hooks/use-add-item-modal";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEditPurchaseModal } from "@/hooks/use-edit-purchase-modal";
import axios from "axios";
import {
  ArrowUpCircle,
  Check,
  CheckCircle2,
  ChevronsUpDown,
  Circle,
  Command,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CommandInput, CommandEmpty, CommandGroup, CommandItem } from "cmdk";

const strToNum = z.coerce.number();

const formSchema = z.object({
  item: z.string().min(1),
  supplier: z.string().min(1),
  status: z.string().min(1),
  quantity: strToNum,
  cost: strToNum,
  price: strToNum,
});

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

const EditPurchaseModal = () => {
  const purchaseModal = useEditPurchaseModal();
  const params = useParams();

  const [purchase, setPurchase] = useState(purchaseModal.purchase);

  const dv = {
    item: purchaseModal.purchase.item,
    supplier: purchaseModal.purchase.supplier,
    status: purchaseModal.purchase.status,
    quantity: z.number().parse(purchaseModal.purchase.quantity),
    price: z.number().parse(purchaseModal.purchase.price),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dv,
  });

  useEffect(() => {
    setTimeout(() => {
      setPurchase(purchaseModal.purchase);
      form.setValue("item", purchase.item);
      form.setValue("supplier", purchase.supplier);
      form.setValue("status", purchase.status);
      form.setValue("quantity", z.number().parse(purchase.quantity));
      form.setValue("price", z.number().parse(purchase.price));
    });
  }, [purchase, purchaseModal.isOpen]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // alert("Hello");
    try {
      setLoading(true);
      const body = {
        ...values,
        warehouseId: params.warehouseId,
        id: purchaseModal.purchase.id,
      };
      console.log(body);
      const response = await axios.put("/api/orders/purchase", body);
      console.log(response);
      window.location.assign(`/${response.data.id}/purchase-orders`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Purchase Order"
      description="Provide updated order information"
      isOpen={purchaseModal.isOpen}
      onClose={purchaseModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form.getValues());
              }}
            >
              <FormField
                control={form.control}
                name="item"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Unit Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="" {...field} /> */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? statuses.find(
                                      (status) => status.value === field.value
                                    )?.label
                                  : "Select status"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search status..." />
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {statuses.map((status) => (
                                  <CommandItem
                                    value={status.label}
                                    key={status.value}
                                    onSelect={() => {
                                      form.setValue("status", status.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        status.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {status.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end  w-full">
                <Button
                  variant="outline"
                  disabled={loading}
                  onClick={purchaseModal.onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditPurchaseModal;
