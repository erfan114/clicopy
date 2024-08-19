import clsx from "clsx";
import { For } from "solid-js";
import Card from "./Card";
import NewEntryText from "./NewEntryText";
import useEntryManager from "../stores/entryManager";


export default function CardList() {

    const entries = useEntryManager(state => state.searchResults);

    const listIsEmpty = !entries().length;

    return (
        <div class={clsx(
            "overflow-auto",
            listIsEmpty
                ? "flex h-full justify-center items-center"
                : "items-start grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        )}>

            {
                listIsEmpty
                    ? <span>No entry found. Wanna add a <NewEntryText /> ?</span>
                    : <For each={entries()}>
                        {Card}
                    </For>
            }
        </div>
    );
}