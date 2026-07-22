import { MODAL_INFO } from "../constants/modal";
import useModalManager from "../stores/modalManager";
import NewEntryModalContent from "./modals/NewEntry";

export default function NewEntryText() {
  const showModal = useModalManager((state) => state.showModal);

  return (
    <button
      onClick={() => showModal(MODAL_INFO.NEW_ENTRY, <NewEntryModalContent />)}
      class="text-indigo-500 cursor-pointer"
    >
      new entry
    </button>
  );
}
