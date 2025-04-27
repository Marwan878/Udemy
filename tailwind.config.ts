import { transform } from "next/dist/build/swc/generated-native";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "1": "0.4rem",
        "2": "0.8rem",
        "3": "1.2rem",
        "4": "1.6rem",
        "5": "2rem",
        "6": "2.4rem",
        "7": "2.8rem",
        "8": "3.2rem",
        "9": "3.6rem",
        "10": "4rem",
      },
      fontSize: {
        "clamp-lg":
          "clamp(1.65rem, calc(1.65rem + (1.8 - 1.65) * calc((100vw - 36rem) / (144 - 36))), 1.8rem)",
        "clamp-2xl":
          "clamp(2rem, calc(2rem + (3.2 - 2) * calc((100vw - 36rem) / (144 - 36))), 3.2rem)",
      },
      animation: {
        grow: "grow 0.1s ease-in",
        slide: "slide 1s linear",
      },
      keyframes: {
        grow: {
          "0%": {
            width: "0",
            height: "0",
          },
          "100%": {
            width: "4rem",
            height: "4rem",
          },
        },
        slide: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
      fontFamily: {
        serif:
          "SuisseWorks, Georgia, Times, 'Times New Roman', serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
      },
      colors: {
        black: "#595c73",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        "btn-focus": "color-mix(in sRGB, #6d28d2 12%, transparent)",
        "btn-dark-focus": "#892de1",
        "udemy-purple": "#6d28d2",
        "udemy-dark-purple": "#521e9f",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
