/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Fondos y Superficies
        background: "#d2ffa9",
        "on-background": "#191c1a",
        surface: "#f8faf6",
        "on-surface": "#191c1a",
        "surface-variant": "#e1e3df",
        "on-surface-variant": "#404943",
        "surface-bright": "#f8faf6",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f0",
        "surface-container-high": "#e7e9e5",

        // Primarios (Verdes Institucionales)
        primary: "#0f5238",
        "on-primary": "#ffffff",
        "primary-container": "#2d6a4f",
        "on-primary-container": "#b2e7a8",
        "primary-fixed": "#b1f0ce",
        "primary-fixed-dim": "#95d4b3",
        "inverse-primary": "#95d4b3",
        "primary-complement": "#B1F0EE",

        // Secundarios (Cálidos / Dorados)
        secondary: "#f4b55d",
        "on-secondary": "#ffffff",
        "secondary-container": "#fd9d1a",
        "on-secondary-container": "#663b00",

        // Alertas / Errores (Rojos)
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Bordes y contornos
        outline: "#707973",
        "outline-variant": "#bfc9c1",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        xs: "4px",
        xl: "80px",
        gutter: "24px",
        md: "24px",
        base: "8px",
        lg: "48px",
        container_max: "1280px",
        sm: "12px",
      },
      fontFamily: {
        "body-md": ["Be Vietnam Pro", "sans-serif"],
        h1: ["Plus Jakarta Sans", "sans-serif"],
        h2: ["Plus Jakarta Sans", "sans-serif"],
        h3: ["Plus Jakarta Sans", "sans-serif"],
        "label-sm": ["Be Vietnam Pro", "sans-serif"],
        "body-lg": ["Be Vietnam Pro", "sans-serif"],
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        h1: ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "label-sm": [
          "14px",
          { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "600" },
        ],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        h2: ["36px", { lineHeight: "1.2", fontWeight: "700" }],
      },
    },
  },
};
