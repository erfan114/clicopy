import { IconTypes } from "solid-icons";
import Fragment from "../containers/Fragment";
import { createSignal } from "solid-js";
import { Motion } from "solid-motionone";

type StatusCardProps = { title: string; amount: number; Icon: IconTypes; color: string; };
export default function StatusCard({ title, amount, Icon, color }: StatusCardProps) {

    const [hovered, setHovered] = createSignal(false);

    return <Fragment
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        class="flex gap-2 font-recursive">
        <div
            style={{
                background: hovered() ? color : `color-mix(in srgb, ${color}, transparent 95%)`,
                "border-color": `color-mix(in srgb, ${color}, transparent 70%)`,
                transition: "500ms"
            }}
            class="flex aspect-square justify-center items-center rounded-md h-14 w-14 border"
        >
            <Motion.span
                transition={{
                    duration: .5
                }}
                animate={{
                    rotate: hovered() ? 360 : 0
                }}
            >
                <Icon
                    size={20}
                    style={{
                        color: hovered() ? "white" : color
                    }}
                />
            </Motion.span>
        </div>
        <div class="flex flex-col">
            <div class="text-sm text-gray-400">{title}</div>
            <div class="text-xl font-semibold mt-1">{amount}</div>
        </div>
    </Fragment>;
}