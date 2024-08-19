import clsx from "clsx";
import InputLabel from "./InputLabel";

type InputProps = {
    name: string;
    required?: boolean;
    placeholder?: string;
    readonly?: boolean;
    onChange?(value: string): void;
    value?: string;
};
export default function Input({ name, required, readonly, placeholder, onChange, value }: InputProps) {
    return <label class="flex flex-col rounded-md gap-1">
        <InputLabel value={name} />
        <input
            readonly={readonly}
            onChange={(e) => onChange && onChange(e.target.value)}
            value={value ?? ""}
            placeholder={
                required && !placeholder
                    ? "Please fill here"
                    : placeholder
                        ? placeholder
                        : "You can fill here by your choice"
            }
            class={
                clsx(
                    "outline-none border rounded-md px-2 py-1 text-sm transition border-neutral-300 focus:border-neutral-400 placeholder:transition hover:placeholder-transparent",
                    readonly && "bg-neutral-100 text-neutral-400"
                )
            }
        />
    </label>;
}