import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
// @ts-ignore: CSS module declarations not present for side-effect import
import "./styles/index.css";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
