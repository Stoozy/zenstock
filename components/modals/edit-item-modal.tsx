import { useEditItemModal } from "@/hooks/use-edit-item-modal";
import { Modal } from "@/components/ui/modal";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useState } from "react";

const EditItemModal = () => {
  const editItemModal = useEditItemModal();

  const strToNum = z.coerce.number();
  const itemSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(0),
    category: z.string().min(1),
    quantity: strToNum,
    cost: strToNum,
    price: strToNum,
  });

  let item = editItemModal.item;

  let [newItem, setNewItem] = useState(item);

  return (
    <Modal
      title="Edit Item"
      description=""
      isOpen={editItemModal.isOpen}
      onClose={editItemModal.onClose}
    >
      <Dialog>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">Name</Label>
            <Input id="name" defaultValue={item.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">Description</Label>
            <Input
              id="description"
              onChange={(e) => (item.description = e.target.value)}
              defaultValue={item.description}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">Category</Label>
            <Input
              id="category"
              onChange={(e) => (item.category = e.target.value)}
              defaultValue={item.category}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">Quantity</Label>
            <Input
              id="quantity"
              defaultValue={item.quantity.toString()}
              onChange={(e) => (item.quantity = parseFloat(e.target.value))}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">Cost</Label>
            <Input
              id="cost"
              onChange={(e) => {
                item.cost = parseFloat(e.target.value);
              }}
              defaultValue={item.cost.toString()}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left">Price</Label>
            <Input
              id="price"
              onChange={(e) => {
                item.price = parseFloat(e.target.value);
              }}
              defaultValue={item.price.toString()}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" variant={"outline"}>
            Cancel
          </Button>

          <Button
            type="submit"
            onClick={() => {
              console.log(item);
              // TODO: verify input and then put on `api/items/`
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </Dialog>
    </Modal>
  );
};

export default EditItemModal;
