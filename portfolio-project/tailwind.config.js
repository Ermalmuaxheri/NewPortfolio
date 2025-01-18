import { Light } from "three/src/Three.Core.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#525252",
        secondary: "#414141",
        minimal: "#313131",
        light: "#CA3E47",
        text: "#dad8d5",
      },
      backgroundImage: {
        "primary-gradient": "radial-gradient(circle, #333333 0%, #303030 100%)",
      },
    },
  },
  plugins: [],
};
