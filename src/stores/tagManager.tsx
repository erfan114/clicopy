import { createWithSignal } from "solid-zustand";
import { TagProps } from "../components/Tag";

type States = {
    tags: TagProps[];
};
type Actions = {
    setTags(tags: TagProps[]): void;
};

const useTagManager = createWithSignal<States & Actions>(set => ({
    tags: [],
    setTags: (tags) => set({ tags })
}));

export default useTagManager;