import clsx from "clsx";
import { JSX } from "solid-js";

export default function Button({ class: className, ...rest }: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button class={clsx("bg-indigo-600 text-white text-sm rounded-lg opacity-90 hover:opacity-100 active:scale-95 transition hover:shadow-md select-none", className)} {...rest} />;
}