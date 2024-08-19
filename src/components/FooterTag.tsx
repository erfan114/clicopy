import { IconTypes } from "solid-icons";
import { ParentProps } from "solid-js";

type FooterTagProps = {
    Icon: IconTypes;
} & ParentProps;
export default function FooterTag({ Icon, children }: FooterTagProps) {
    return <div class="flex gap-1 text-neutral-600 select-none line-clamp-1">
        <Icon /><div class="text-xs font-semibold line-clamp-1">{children}</div>
    </div>;
}