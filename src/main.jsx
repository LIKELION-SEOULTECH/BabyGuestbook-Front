import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";

if (import.meta.env.DEV) {
    const { worker } = await import("@/api/mocks/browser");
    worker.start();
}

createRoot(document.getElementById("root")).render(<App />);
