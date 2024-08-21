import { createWithSignal } from "solid-zustand";
import { search } from "../helpers/search";
import { add_entry, Entry, getAllEntries, remove_entry, update_entry } from "../helpers/db";

type States = {
    entries: Entry[];
    searchResults: Entry[];
    searchQuery: string;
};

type Actions = {
    addEntry(entry: Omit<Entry, "id">): Promise<void>;
    removeEntry(index: number): Promise<void>;
    editEntry(index: number, newData: Omit<Entry, "id">): Promise<void>;
    reloadEntries(): Promise<void>;

    setSearchQuery(value: string): void;
    executeSearchQuery(): void;
};

const useEntryManager = createWithSignal<States & Actions>((set, get) => ({
    // Initial state
    entries: [],

    // Actions
    reloadEntries: async () => {
        set({ entries: (await getAllEntries()).reverse() });
        get().executeSearchQuery();
    },

    // Add a new entry to the entries array
    addEntry: async (entry) => {
        await add_entry(entry);
        get().reloadEntries();
    },

    // Remove an entry from the entries array
    removeEntry: async (targetIndex) => {
        set((state) => ({
            entries: state.entries.filter((_, currentIndex) => currentIndex != targetIndex),
        }));
        await remove_entry(targetIndex);
        get().reloadEntries();
    },

    editEntry: async (targetIndex, newData) => {
        await update_entry(targetIndex, newData);
        get().reloadEntries();
    },

    searchResults: [],
    searchQuery: "",
    setSearchQuery: (value) => {
        set({ searchQuery: value });
        get().executeSearchQuery();
    },

    executeSearchQuery: () => {
        const { searchQuery, entries } = get();

        if (!searchQuery.length) set({ searchResults: [] });

        set({ searchResults: search(entries, searchQuery) });
    }
}));

export default useEntryManager;
