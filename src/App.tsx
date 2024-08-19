import "./App.css";
import CardList from "./components/CardList";
import ModalManager from "./containers/ModalManager";
import NewEntryButton from "./components/NewEntryButton";
import Search from "./components/Search";
import { Toaster } from "solid-toast";

function App() {

    return (
        <div class="font-recursive prose-stone flex flex-col w-full p-3 gap-2 h-full">
            <div class="flex flex-col gap-2">
                <div class="w-full grid grid-cols-[auto_170px] gap-2">
                    <Search />
                    <NewEntryButton />
                </div>
            </div>
            <CardList />
            <ModalManager />
            <Toaster position="bottom-left" />
        </div>
    );
}

export default App;
