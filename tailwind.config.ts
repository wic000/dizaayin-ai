import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        surface: {
          DEFAULT: "#FFF6ED",
          strong: "#211C1A"
        },
        brand: {
          ink: "#181317",
          orange: "#F47B20",
          gold: "#F2C572",
          cream: "#FFF7EE",
          berry: "#C64B52",
          lagoon: "#2D7C7B"
        }
      },
      fontFamily: {
        sans: ["Manrope", "Avenir Next", "Segoe UI", "sans-serif"],
        display: ["Space Grotesk", "Bahnschrift", "Arial Narrow", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 35px rgba(24, 19, 23, 0.12)",
        float: "0 24px 60px rgba(24, 19, 23, 0.18)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(244,123,32,0.32), transparent 28%), radial-gradient(circle at top right, rgba(45,124,123,0.28), transparent 24%), linear-gradient(180deg, rgba(255,247,238,0.98) 0%, rgba(255,240,222,0.95) 46%, rgba(255,255,255,0.9) 100%)",
        "hero-glow-dark":
          "radial-gradient(circle at top left, rgba(244,123,32,0.18), transparent 28%), radial-gradient(circle at top right, rgba(45,124,123,0.18), transparent 24%), linear-gradient(180deg, rgba(18,16,20,0.98) 0%, rgba(23,19,26,0.95) 46%, rgba(16,15,17,0.95) 100%)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "fade-up": "fade-up 400ms ease-out",
        shimmer: "shimmer 1.8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
