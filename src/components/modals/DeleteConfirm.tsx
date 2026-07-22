import toast from "solid-toast";
import useEntryManager from "../../stores/entryManager";
import useModalManager from "../../stores/modalManager";
import Button from "../Button";
import ViewEntryModalContent from "./ViewEntry";
import { Entry } from "../../helpers/db";
import { MODAL_INFO } from "../../constants/modal";

export default function DeleteConfirmModalContent(props: Entry) {
  const showModal = useModalManager((state) => state.showModal);
  const closeModal = useModalManager((state) => state.closeModal);

  const removeEntry = useEntryManager((state) => state.removeEntry);

  function yes() {
    // Delete the modal
    removeEntry(props.id);
    toast.success("Successfully removed !");
    closeModal(MODAL_INFO.DELETE_ENTRY.id);
  }

  function no() {
    showModal(MODAL_INFO.VIEW_ENTRY, <ViewEntryModalContent {...props} />);
  }

  return (
    <>
      <div class="text-sm">Are you sure you want to delete this entry ?</div>
      <div class="grid grid-cols-2 h-8 gap-2 mt-4">
        <Button onClick={no}>No</Button>
        <Button onClick={yes} class="bg-red-600">
          Yes
        </Button>
      </div>
    </>
  );
}
