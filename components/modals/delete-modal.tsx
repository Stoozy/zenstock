import { useDeleteModal } from "@/hooks/use-delete-modal";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

const DeleteModal = () => {
  const modal = useDeleteModal();

  return (
    <>
      <Modal
        title="Delete"
        description=""
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <div className="font-medium ">{modal.message}</div>
        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" onClick={modal.onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              modal.callback();
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
