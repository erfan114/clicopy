import { createWithSignal } from "solid-zustand";

type States = {
    types: string[];
};
type Actions = {
    setTypes(types: string[]): void;
};

const useTypeManager = createWithSignal<States & Actions>(set => ({
    types: [],
    setTypes: (types) => set({ types })
}));

export default useTypeManager;