import Input from "../Input";
import { createStore } from "solid-js/store";
import Button from "../Button";
import useModalManager from "../../stores/modalManager";
import DeleteConfirmModalContent from "./DeleteConfirm";
import useEntryManager from "../../stores/entryManager";
import toast from "solid-toast";
import { Entry } from "../../utils/db";

export default function ViewEntryModalContent(props: Entry) {

    const { name, description, text } = props;

    const showModal = useModalManager(state => state.showModal);
    const closeModal = useModalManager(state => state.closeModal);

    const removeEntry = useEntryManager(state => state.removeEntry);
    const addEntry = useEntryManager(state => state.addEntry);

    const [store, setStore] = createStore({
        name,
        description,
        text
    });

    function onSave() {
        removeEntry(props.id);
        addEntry(store);

        toast.success("Changes saved !");
        closeModal("viewEntry");
    }

    function onDelete() {
        showModal("deleteEntry", <DeleteConfirmModalContent {...props} />);
    }

    return <>
        <div class="flex flex-col gap-2 overflow-y-auto pr-2">
            <Input
                onChange={(value) => setStore("name", value)}
                value={store.name}
                name="Entry Title"
                required
            />
            <Input
                onChange={(value) => setStore("description", value)}
                value={store.description}
                name="Entry Description"
            />
            <Input
                onChange={(e) => setStore("text", e)}
                value={store.text}
                name="Entry Text"
                required
            />
            <div class="grid grid-cols-2 h-8 mt-2 gap-2">
                <Button onClick={onDelete} class="bg-red-600">
                    Delete
                </Button>
                <Button onClick={onSave}>
                    Save
                </Button>
            </div>
        </div>
    </>;
}