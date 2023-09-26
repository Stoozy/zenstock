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
import axios from "axios";
import { useEditItemModal } from "@/hooks/use-edit-item-modal";

const strToNum = z.coerce.number();

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(0),
  category: z.string().min(1),
  quantity: strToNum,
  cost: strToNum,
  price: strToNum,
});

const EditItemModal = () => {
  const itemModal = useEditItemModal();
  const params = useParams();

  const [item, setItem] = useState(itemModal.item);

  const dv = {
    name: itemModal.item.name,
    description: itemModal.item.description,
    category: itemModal.item.category,
    quantity: z.number().parse(itemModal.item.quantity),
    cost: z.number().parse(itemModal.item.cost),
    price: z.number().parse(itemModal.item.price),
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dv,
  });

  useEffect(() => {
    setTimeout(() => {
      setItem(itemModal.item);
      form.setValue("name", item.name);
      form.setValue("description", item.description);
      form.setValue("category", item.category);
      form.setValue("quantity", z.number().parse(item.quantity));
      form.setValue("cost", z.number().parse(item.cost));
      form.setValue("price", z.number().parse(item.price));
    });
  }, [item, itemModal.isOpen]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const body = {
        ...values,
        warehouseId: params.warehouseId,
        id: itemModal.item.id,
      };
      console.log(body);
      const response = await axios.put("/api/items", body);
      window.location.assign(`/${response.data.id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Item"
      description="Provide new product information"
      isOpen={itemModal.isOpen}
      onClose={itemModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
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
                name="cost"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Cost</FormLabel>
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
                      <FormLabel>Selling Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
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
                  onClick={itemModal.onClose}
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

export default EditItemModal;
