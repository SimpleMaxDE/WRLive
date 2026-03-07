import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0F1A",
        card: "#111A2C",
        accent: "#7C5CFF",
        accent2: "#1DD3B0",
        text: "#E7EDF9"
      }
    }
  },
  plugins: []
} satisfies Config;
