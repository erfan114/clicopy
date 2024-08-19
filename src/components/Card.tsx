import Fragment from "../containers/Fragment";

import {
    RiDocumentClipboardLine,
} from 'solid-icons/ri';

import FooterTag from "./FooterTag";
import useModalManager from "../stores/modalManager";
import ViewEntryModalContent from "./modals/ViewEntry";
import { createStore } from "solid-js/store";
import toast from "solid-toast";
import { Entry } from "../utils/db";

export default function Card(props: Entry) {

    const { name, description, text } = props;

    const [store, setStore] = createStore({
        singleClick: false,
        inTimeout: false,
    });
    const showModal = useModalManager(state => state.showModal);

    function viewEntry() {
        showModal("viewEntry", <ViewEntryModalContent {...props} />);
    }

    function singleClick() {
        if (store.inTimeout) return;

        setStore("singleClick", true);
        setTimeout(() => {
            if (!store.singleClick) return;
            toast.success("Successfully copied to your clipboard !");
            navigator.clipboard.writeText(text);
        }, 500);

    }

    function doubleClick() {
        setStore({
            inTimeout: false,
            singleClick: false
        });
        viewEntry();
    }

    return <Fragment
        onClick={singleClick}
        onDblClick={doubleClick}
        class="gap-1 relative group flex flex-col shadow-none hover:shadow-none opacity-85 hover:opacity-100 transition cursor-pointer group active:scale-95 select-none border-2 border-transparent hover:border-indigo-500">
        <div class="font-bold">{name}</div>
        <div class="line-clamp-1 text-xs">{description || "No description"}</div>
        <FooterTag Icon={RiDocumentClipboardLine}>
            {text}
        </FooterTag>

    </Fragment>;
}