import { createSignal } from "solid-js";
import "./App.css";

function App() {
    const [greetMsg, setGreetMsg] = createSignal("");
    const [name, setName] = createSignal("");

    return (
        <div class="container">
            <h1>Welcome to Tauri!</h1>

            <p>Click on the Tauri, Vite, and Solid logos to learn more.</p>

            <p>{greetMsg()}</p>
        </div>
    );
}

export default App;
