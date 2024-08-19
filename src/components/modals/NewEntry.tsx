import { createStore } from "solid-js/store";
import Button from "../Button";
import Input from "../Input";
import useEntryManager from "../../stores/entryManager";
import useModalManager from "../../stores/modalManager";
import toast from "solid-toast";

export default function NewEntryModalContent() {

    const addEntry = useEntryManager(state => state.addEntry);
    const closeModal = useModalManager(state => state.closeModal);

    const [store, setStore] = createStore({
        title: "",
        description: "",
        text: ""
    });

    function handleAdd() {
        if (!store.title || !store.text) return;

        addEntry({
            name: store.title,
            description: !store.description.length ? undefined : store.description,
            text: store.text
        });

        toast.success("Successfully added !");
        closeModal("newEntry");
    }

    return <>
        <div class="flex flex-col gap-2 overflow-y-auto pr-2">
            <Input
                onChange={(value) => setStore("title", value)}
                value={store.title}
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
        </div>
        <Button onClick={handleAdd} class="py-2 mt-3">
            Add
        </Button>
    </>;
}