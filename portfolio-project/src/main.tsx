import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BloomEffectScene from "./assets/threejs/LightsBackground.tsx";
import FirstSection from "./Components/FirstSection.tsx";
import Header from "./Components/Header.tsx";
import AboutMeBox from "./Components/AboutMeBox.tsx";
import NameBox from "./Components/NameBox.tsx";
import TechStack from "./Components/TechStack.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BloomEffectScene />
    <Header />
    <NameBox />
    <AboutMeBox />
    <FirstSection />
    <TechStack />
  </StrictMode>
);
