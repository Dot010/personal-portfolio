import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      fontFamily: {
      fontFamily: {
      mono: ["var(--font-jetbrains-mono)", "monospace"],
}
      },
      colors: {
        background: "#1c1c22",
        primary: "#00ff99",
        "primary-hover": "#00e187",
      },
    },
  },
}

export default config