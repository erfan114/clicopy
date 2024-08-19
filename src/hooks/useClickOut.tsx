import { onMount, onCleanup } from "solid-js";

export default function useClickOut(reference: HTMLDivElement | undefined, callback: () => void) {
    const handleClickOutside = (event: MouseEvent) => {

        if (reference && !reference.contains(event.target as Node)) {

            callback();
        }
    };

    onMount(() => {
        document.addEventListener("mousedown", handleClickOutside);

        onCleanup(() => {
            document.removeEventListener("mousedown", handleClickOutside);
        });
    });
}
