import { useViewItemModal } from "@/hooks/use-view-item-modal";
import { Modal } from "@/components/ui/modal";
import { Badge } from "../ui/badge";

export const ViewItemModal = () => {
  const viewItemModal = useViewItemModal();

  return (
    <Modal
      title={viewItemModal.item === undefined ? "" : viewItemModal.item.name}
      description=""
      isOpen={viewItemModal.isOpen}
      onClose={viewItemModal.onClose}
    >
      <div className="flex flex-row flex-wrap">
        <div className="p-4">
          <h1 className="font-semibold">Description</h1>
          <h1 className="font-medium text-sm">
            {viewItemModal.item === undefined
              ? ""
              : viewItemModal.item.description.toString()}
          </h1>
        </div>

        <div className="p-4 ">
          <h1 className="font-semibold">In Stock</h1>
          <h1 className="font-medium text-sm">
            {viewItemModal.item === undefined
              ? ""
              : viewItemModal.item.quantity.toString()}
          </h1>
        </div>

        <div className="p-4 ">
          <h1 className="font-semibold">Cost</h1>
          <h1 className="font-medium text-sm">
            $
            {viewItemModal.item === undefined
              ? ""
              : viewItemModal.item.cost.toString()}
          </h1>
        </div>

        <div className="p-4 ">
          <h1 className="font-semibold">Selling Price</h1>
          <h1 className="font-medium text-sm">
            $
            {viewItemModal.item === undefined
              ? ""
              : viewItemModal.item.price.toString()}
          </h1>
        </div>
        <div className="p-4 ">
          <h1 className="font-semibold">Category</h1>
          <h1 className="font-medium text-sm">
            <Badge>
              {viewItemModal.item === undefined
                ? ""
                : viewItemModal.item.category.toString()}
            </Badge>
          </h1>
        </div>
      </div>
    </Modal>
  );
};
