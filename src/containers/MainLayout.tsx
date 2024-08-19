import { ParentProps } from "solid-js";

export default function MainLayout({ children }: ParentProps) {
    return <div class="w-screen h-screen">
        {children}
    </div>
}