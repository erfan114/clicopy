import { ParentProps } from "solid-js";

type MainLayoutProps = {} & ParentProps;
export default function MainLayout({ children }: MainLayoutProps) {
    return <div class="w-screen h-screen">
        {children}
    </div>
}