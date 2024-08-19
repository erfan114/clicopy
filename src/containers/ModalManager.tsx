import { Presence } from "solid-motionone";
import Modal from "../components/Modal";
import useModalManager from "../stores/modalManager";
import { For } from "solid-js";

export default function ModalManager() {

    const activeModals = useModalManager(state => state.activeModals);

    return <Presence exitBeforeEnter>
        <For each={activeModals()}>
            {Modal}
        </For>
    </Presence>;
}