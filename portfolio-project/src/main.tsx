import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Components/App.tsx";
import BloomEffectScene from "./assets/threejs/LightsBackground.tsx";
import FirstSection from "./Components/FirstSection.tsx";
import Header from "./Components/Header.tsx";
import FloatyBox from "./Components/FloatyBox.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BloomEffectScene />
    <Header />
    <App />
    <FloatyBox />
    <FirstSection />
  </StrictMode>
);
