import { IoEllipsisHorizontal } from "solid-icons/io";
import { Entry } from "../helpers/db";
import useModalManager from "../stores/modalManager";
import { MODAL_INFO } from "../constants/modal";
import ManageEntryModalContent from "./modals/ManageEntry";

export default function ManageEntryButton(props: Entry) {
  const showModal = useModalManager((state) => state.showModal);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        showModal(
          MODAL_INFO.MANAGE_ENTRY,
          <ManageEntryModalContent {...props} />,
        );
      }}
      class="manage-button border-2 flex justify-center items-center size-6 rounded-md hover:border-indigo-500 active:scale-95"
    >
      <IoEllipsisHorizontal size={12} />
    </button>
  );
}
