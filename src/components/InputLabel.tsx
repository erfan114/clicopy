type InputLabelProps = { value: string; };
export default function InputLabel({ value }: InputLabelProps) {
    return <span class="text-xs text-neutral-500">{value}</span>;
}