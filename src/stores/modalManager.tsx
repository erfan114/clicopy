import { JSX } from "solid-js";
import { createWithSignal } from "solid-zustand";
import { ModalProps } from "../components/Modal";
import MODAL_INFO_TABLE, { ModalUniqueID } from "../constants/ModalInfoTable";

type States = {
    activeModals: ModalProps[];
};

type Actions = {
    showModal(id: ModalUniqueID, content: JSX.Element): void;
    closeModal(id: ModalUniqueID): void;
    closeAllModals(): void;
};

const useModalManager = createWithSignal<States & Actions>((set, get) => ({
    activeModals: [],

    showModal: (id, content) => {

        const { activeModals, closeAllModals } = get();

        // Preventing duplicate modals
        if (activeModals.find(modal => modal.id == id)) return;

        if (activeModals.length > 0) {
            closeAllModals();

            setTimeout(() => set(prev => ({
                activeModals: [
                    ...prev.activeModals,
                    {
                        id,
                        children: content,
                        title: MODAL_INFO_TABLE[id]
                    }
                ]
            })), 500);
        } else {
            set(prev => ({
                activeModals: [
                    ...prev.activeModals,
                    {
                        id,
                        children: content,
                        title: MODAL_INFO_TABLE[id]
                    }
                ]
            }));
        }
    },
    closeModal: (id) => set(prev => ({
        activeModals: prev.activeModals.filter(entry => entry.id != id)
    })),
    closeAllModals: () => set({ activeModals: [] }),

}));

export default useModalManager;