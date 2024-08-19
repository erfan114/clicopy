import { onMount, ParentProps } from "solid-js";
import { Motion } from "solid-motionone";
import { ModalUniqueID } from "../constants/ModalInfoTable";
import useModalManager from "../stores/modalManager";
import useClickOut from "../hooks/useClickOut";
import CloseButton from "./CloseButton";

export type ModalProps = { id: ModalUniqueID; title: string; } & ParentProps;
export default function Modal({ children, id, title }: ModalProps) {

    let containerRef: HTMLDivElement | undefined;

    const closeModal = useModalManager(state => state.closeModal);
    const closeThis = () => closeModal(id);

    onMount(() => useClickOut(containerRef, closeThis));

    return <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        class="absolute bg-black/10 backdrop-blur-[2px] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10">
        <div
            ref={containerRef}
            class="bg-white p-5 rounded-lg shadow-xl w-96 max-h-[30rem] flex flex-col"
        >
            <div class="flex items-center mb-3">
                <div class="w-full text-xl font-bold">{title}</div>
                <CloseButton onClick={closeThis} />
            </div>
            {children}
        </div>
    </Motion.div>;
}