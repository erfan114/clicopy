import { MODAL_INFO } from "../../constants/modal";
import { Entry } from "../../helpers/db";
import { copyEntryText } from "../../helpers/entity";
import useModalManager from "../../stores/modalManager";
import Button from "../Button";
import {
  RiDocumentClipboardLine,
  RiSystemDeleteBin2Line,
  RiSystemEyeLine,
} from "solid-icons/ri";
import ViewEntryModalContent from "./ViewEntry";
import DeleteConfirmModalContent from "./DeleteConfirm";
import { ellipsis } from "../../helpers/string";

const ICON_SIZE = 20;

export default function ManageEntryModalContent(props: Entry) {
  const show = useModalManager((state) => state.showModal);

  function copy() {
    copyEntryText(props);
  }

  function view() {
    show(MODAL_INFO.VIEW_ENTRY, <ViewEntryModalContent {...props} />);
  }

  function remove() {
    show(MODAL_INFO.DELETE_ENTRY, <DeleteConfirmModalContent {...props} />);
  }

  return (
    <div class="flex flex-col gap-2">
      <Button
        onClick={copy}
        class="py-2 flex gap-1.5 items-center justify-center"
      >
        <RiDocumentClipboardLine size={ICON_SIZE} />
        Copy text ({ellipsis(props.text, 16)})
      </Button>
      <Button
        onclick={view}
        class="py-2 flex gap-1.5 items-center justify-center"
      >
        <RiSystemEyeLine size={ICON_SIZE} />
        View entry
      </Button>
      <Button
        onclick={remove}
        class="py-2 bg-red-500 flex gap-1.5 items-center justify-center"
      >
        <RiSystemDeleteBin2Line size={ICON_SIZE} /> Delete entry
      </Button>
    </div>
  );
}
