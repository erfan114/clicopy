import clsx from "clsx";
import { RiSystemSearch2Line } from "solid-icons/ri";
import { createSignal } from "solid-js";
import { Motion } from "solid-motionone";
import useEntryManager from "../stores/entryManager";


export default function Search() {

    const [isFocused, setFocused] = createSignal(false);
    const searchQuery = useEntryManager(state => state.searchQuery);
    const setSearchQuery = useEntryManager(state => state.setSearchQuery);

    return (
        <label
            onFocusIn={() => setFocused(true)}
            onFocusOut={() => setFocused(false)}
            class={clsx(
                "pl-3 flex bg-white items-center rounded-lg transition cursor-text hover:shadow-md",
                isFocused() ? "shadow-md" : "shadow-sm"
            )}
            for="search-input"
        >
            <Motion.span animate={{
                rotateZ: isFocused() ? 90 : 0
            }}>
                <RiSystemSearch2Line class="text-neutral-500" />
            </Motion.span>
            <input
                id="search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                class="text-sm px-3 py-2 outline-none font-openSans"
                placeholder="Search"
                value={searchQuery()}
                type="text"
            />

        </label>
    );
}