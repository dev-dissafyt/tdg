/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0D0F11",
          50: "#F4F5F6",
          100: "#E6E8EA",
          200: "#C9CDD1",
          300: "#A6ADB4",
          400: "#757F8A",
          500: "#4D5660",
          600: "#32383F",
          700: "#22262B",
          800: "#16191C",
          900: "#0D0F11",
          950: "#070809",
        },
        charcoal: {
          DEFAULT: "#181B1F",
          light: "#24292F",
          border: "#2E343B",
        },
        porcelain: {
          DEFAULT: "#F8F9FA",
          muted: "#F0F2F5",
          border: "#E2E5E9",
        },
        electric: {
          cobalt: "#2563EB",
          blue: "#3B82F6",
          amber: "#F59E0B",
          cyan: "#06B6D4",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
        editorial: [
          "Playfair Display",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        "tactile": "0 2px 0 0 rgba(13, 15, 17, 0.9), 0 4px 12px rgba(0, 0, 0, 0.08)",
        "tactile-hover": "0 4px 0 0 rgba(13, 15, 17, 0.9), 0 8px 16px rgba(0, 0, 0, 0.12)",
        "tactile-active": "0 0 0 0 rgba(13, 15, 17, 0.9), 0 2px 4px rgba(0, 0, 0, 0.08)",
        "glow-blue": "0 0 24px -4px rgba(37, 99, 235, 0.35)",
        "glow-amber": "0 0 24px -4px rgba(245, 158, 11, 0.35)",
      },
      backgroundImage: {
        "filament-grid": "radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.15) 1px, transparent 0)",
        "noise-texture": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "layer-deposit": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "layer-deposit": "layer-deposit 2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
