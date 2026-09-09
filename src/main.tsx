import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/appShell.css";
import "./styles/designSystem.css";
import "./styles/actionPlan.css";
import "./styles/todayPolish.css";
import "./styles/navigationPolish.css";
import "./styles/deadlinesPolish.css";
import "./styles/knowledgePolish.css";
import "./styles/profilePolish.css";
import "./styles/mobileQA.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
