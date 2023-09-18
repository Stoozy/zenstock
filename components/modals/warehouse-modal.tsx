"use client";

import axios from "axios";
import * as z from "zod";
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
import { useState } from "react";

import { useWarehouseModal } from "@/hooks/use-warehouse-modal";
import { Modal } from "@/components/ui/modal";

const formSchema = z.object({
  name: z.string().min(1),
});

export const WarehouseModal = () => {
  const warehouseModal = useWarehouseModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/warehouses", values);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create warehouse"
      description="Add a new warehouse to manage its inventory"
      isOpen={warehouseModal.isOpen}
      onClose={warehouseModal.onClose}
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
                        <Input disabled={loading} placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end  w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={warehouseModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
