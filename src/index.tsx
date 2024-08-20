/* @refresh reload */
import { render } from "solid-js/web";

import '@fontsource-variable/recursive';
import '@fontsource-variable/open-sans';
import '@fontsource-variable/vazirmatn';

import "./styles.css";
import App from "./App";
import useEntryManager from "./stores/entryManager";

async function main() {
    // Loading data
    await useEntryManager.getState().reloadEntries();

    // Rendering solid js
    render(() => <App />, document.getElementById("root") as HTMLElement);
}

main();
