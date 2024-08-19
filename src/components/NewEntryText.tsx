import useModalManager from "../stores/modalManager";
import NewEntryModalContent from "./modals/NewEntry";

export default function NewEntryText() {

    const showModal = useModalManager(state => state.showModal);

    return <span
        onClick={() => showModal("newEntry", <NewEntryModalContent />)}
        class="text-indigo-500 cursor-pointer"
    >
        new entry
    </span>;
}