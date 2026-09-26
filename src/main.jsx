import { createRoot } from "react-dom/client";
import "@fontsource/onest/400.css";
import "@fontsource/onest/500.css";
import "@fontsource/onest/600.css";
import { App } from "./App.jsx";
import "./styles/site.css";

try {
  const saved = window.localStorage.getItem("iplusgor-theme");
  document.documentElement.dataset.theme = saved === "dark" || saved === "light"
    ? saved : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
} catch {
  document.documentElement.dataset.theme = "light";
}

createRoot(document.getElementById("root")).render(<App />);
