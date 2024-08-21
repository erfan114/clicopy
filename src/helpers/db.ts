import { invoke } from "@tauri-apps/api";

export type Entry = {
    id: number;
    name: string;
    description?: string;
    text: string;
};

export function getAllEntries(): Promise<Entry[]> {
    return invoke("get_all_entries");
}

export async function add_entry(options: Omit<Entry, "id">): Promise<void> {
    return invoke("add_entry", options);
}

export async function remove_entry(id: number): Promise<void> {
    invoke("remove_entry", { id });
}

export async function update_entry(id: number, options: Omit<Entry, "id">): Promise<void> {
    invoke("update_entry", { id, ...options });
}