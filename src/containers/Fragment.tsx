import clsx from "clsx";
import { JSX } from "solid-js";

export default function Fragment({ class: className, ...rest }: JSX.HTMLAttributes<HTMLDivElement>) {
    return <div class={clsx("bg-white shadow-sm hover:shadow-md rounded-lg p-3 transition", className)} {...rest} />
}