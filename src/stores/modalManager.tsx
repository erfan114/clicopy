import { JSX } from "solid-js";
import { createWithSignal } from "solid-zustand";
import { ModalProps } from "../components/Modal";
import { ModalInfo } from "../constants/modal";

type States = {
  activeModals: ModalProps[];
};

type Actions = {
  showModal(info: ModalInfo, content: JSX.Element): void;
  closeModal(id: ModalInfo["id"]): void;
  closeAllModals(): void;
};

const useModalManager = createWithSignal<States & Actions>((set, get) => ({
  activeModals: [],

  showModal: (info, content) => {
    const { activeModals, closeAllModals } = get();

    // Preventing duplicate modals
    if (activeModals.some((modal) => modal.id == info.id)) return;

    if (activeModals.length > 0) {
      closeAllModals();

      setTimeout(
        () =>
          set((prev) => ({
            activeModals: [
              ...prev.activeModals,
              {
                id: info.id,
                children: content,
                title: info.title,
              },
            ],
          })),
        500,
      );
    } else {
      set((prev) => ({
        activeModals: [
          ...prev.activeModals,
          {
            id: info.id,
            children: content,
            title: info.title,
          },
        ],
      }));
    }
  },
  closeModal: (id) =>
    set((prev) => ({
      activeModals: prev.activeModals.filter((entry) => entry.id != id),
    })),
  closeAllModals: () => set({ activeModals: [] }),
}));

export default useModalManager;
