import { RiSystemCloseLine } from 'solid-icons/ri';

type CloseButtonProps = {
    onClick?(): void;
};
export default function CloseButton({ onClick }: CloseButtonProps) {
    return <button
        class='border rounded-md w-7 h-7 flex justify-center items-center hover:bg-red-500 transition hover:text-white active:scale-90'
        onClick={onClick}
    >
        <RiSystemCloseLine />
    </button>;
}