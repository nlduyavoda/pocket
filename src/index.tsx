import App from "./App";
import React from "react";
import "@styles/index.css";

import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
