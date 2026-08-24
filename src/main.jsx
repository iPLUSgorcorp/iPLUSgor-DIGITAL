import { createRoot } from "react-dom/client";
import "@fontsource/onest/400.css";
import "@fontsource/onest/500.css";
import "@fontsource/onest/600.css";
import { App } from "./App.jsx";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/pages.css";
import "./styles/solutions-responsive.css";
import "./styles/approach-responsive.css";
import "./styles/catalogue-responsive.css";
import "./styles/home-responsive.css";
import "./styles/work-responsive.css";
import "./styles/geometry-lock.css";
import "./styles/theme.css";
import "./styles/ambient-video.css";
import "./styles/surgical-fixes.css";
import "./styles/catalogue-selected.css";
import "./styles/business-value.css";
import "./styles/conversion-offer.css";
import "./styles/final-stability.css";

try {
  const savedTheme = window.localStorage.getItem("iplusgor-theme");
  const preferredTheme = savedTheme
    || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = preferredTheme;
} catch {
  document.documentElement.dataset.theme = "light";
}

createRoot(document.getElementById("root")).render(
  <App />,
);
