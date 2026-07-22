import clsx from "clsx";
import { createMemo, For } from "solid-js";
import Card from "./EntityCard";
import NewEntryText from "./NewEntryText";
import useEntryManager from "../stores/entryManager";

export default function EntityList() {
  const entries = useEntryManager((state) => state.searchResults);
  const isListEmpty = createMemo(() => !entries().length);

  return (
    <div
      class={clsx(
        "overflow-auto",
        isListEmpty()
          ? "flex h-full justify-center items-center"
          : "items-start grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
      )}
    >
      {isListEmpty() ? (
        <span>
          No entry found. Wanna add a <NewEntryText /> ?
        </span>
      ) : (
        <For each={entries()}>{Card}</For>
      )}
    </div>
  );
}
