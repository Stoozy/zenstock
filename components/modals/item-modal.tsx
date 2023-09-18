"use client";

import * as z from "zod";
import { useItemModal } from "@/hooks/use-item-modal";
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

const strToNum = z.coerce.number();

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  quantity: strToNum,
  cost: strToNum,
  price: strToNum,
});

export const ItemModal = () => {
  const itemModal = useItemModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      quantity: 0,
      cost: 0,
      price: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Modal
      title="New Item"
      description="Provide product information"
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
                <Button variant="outline" onClick={itemModal.onClose}>
                  Cancel
                </Button>
                <Button type="submit">Add</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
