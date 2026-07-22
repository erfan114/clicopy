import clsx from "clsx";
import InputLabel from "./InputLabel";
import { createMemo } from "solid-js";

type TextAreaProps = {
  name: string;
  required?: boolean;
  placeholder?: string;
  readonly?: boolean;
  onChange?(value: string): void;
  value?: string;
};
export default function TextArea({
  name,
  required,
  readonly,
  placeholder,
  onChange,
  value,
}: TextAreaProps) {
  const inputPlaceholder = createMemo(() => {
    if (required && !placeholder) return "Please fill here (required)";

    return placeholder ?? "You can fill here by your choice (optional)";
  });

  return (
    <label class="flex flex-col rounded-md gap-1">
      <InputLabel value={name} />
      <textarea
        readonly={readonly}
        onChange={(e) => onChange?.(e.target.value)}
        value={value ?? ""}
        placeholder={inputPlaceholder()}
        class={clsx(
          "outline-none border rounded-md px-2 py-1 text-sm transition border-neutral-300 focus:border-neutral-400 placeholder:transition hover:placeholder-transparent",
          readonly && "bg-neutral-100 text-neutral-400",
        )}
      />
    </label>
  );
}
