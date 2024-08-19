export type TagProps = {
    name: string;
    color: string;
};

export default function Tag({ name, color }: TagProps) {
    return <span
        style={{
            color: "white",
            background: `color-mix(in srgb,${color},black 25%)`,
        }}
        class="text-xs py-1 px-4 rounded-md font-bold shadow-md capitalize select-none"
    >
        {name}
    </span>
}