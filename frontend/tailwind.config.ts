import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                inter: "var(--font-inter)",
                arvo: "var(--font-arvo)",
                barlow: "var(--font-barlow)",
                "bebas-neue": "var(--font-bebas-neue)",
                bitter: "var(--font-bitter)",
                calistoga: "var(--font-calistoga)",
                capriola: "var(--font-capriola)",
                courgette: "var(--font-courgette)",
                "crimson-text": "var(--font-crimson-text)",
                "dm-sans": "var(--font-dm-sans)",
                "eb-garamond": "var(--font-eb-garamond)",
                "fredoka-one": "var(--font-fredoka-one)",
                "gothic-a1": "var(--font-gothic-a1)",
                "hepta-slab": "var(--font-hepta-slab)",
                "ibm-plex-sans": "var(--font-ibm-plex-sans)",
                "ibm-plex-serif": "var(--font-ibm-plex-serif)",
                karla: "var(--font-karla)",
                "kite-one": "var(--font-kite-one)",
                lato: "var(--font-lato)",
                "libre-baskerville": "var(--font-libre-baskerville)",
                lora: "var(--font-lora)",
                merriweather: "var(--font-merriweather)",
                montserrat: "var(--font-montserrat)",
                "nanum-pen-script": "var(--font-nanum-pen-script)",
                "noto-serif": "var(--font-noto-serif)",
                "nova-round": "var(--font-nova-round)",
                oswald: "var(--font-oswald)",
                pacifico: "var(--font-pacifico)",
                "playfair-display": "var(--font-playfair-display)",
                poppins: "var(--font-poppins)",
                "pt-serif": "var(--font-pt-serif)",
                quicksand: "var(--font-quicksand)",
                raleway: "var(--font-raleway)",
                roboto: "var(--font-roboto)",
                "roboto-slab": "var(--font-roboto-slab)",
                "rock-salt": "var(--font-rock-salt)",
                rubik: "var(--font-rubik)",
                "source-serif-4": "var(--font-source-serif-4)",
                "space-mono": "var(--font-space-mono)",
                "special-elite": "var(--font-special-elite)",
                "work-sans": "var(--font-work-sans)",
                "zilla-slab": "var(--font-zilla-slab)",
            },
            colors: {
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",

                background: "hsl(var(--background) / <alpha-value>)",
                "dashboard-background":
                    "hsl(var(--dashboard-background) / <alpha-value>)",

                foreground: {
                    primary: "hsl(var(--foreground) / <alpha-value>)",
                    secondary:
                        "hsl(var(--foreground-secondary) / <alpha-value>)",
                    disabled: "hsl(var(--foreground-disabled) / <alpha-value>)",
                    DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
                },

                primary: {
                    50: "hsl(var(--primary-50) / <alpha-value>)",
                    100: "hsl(var(--primary-100) / <alpha-value>)",
                    200: "hsl(var(--primary-200) / <alpha-value>)",
                    300: "hsl(var(--primary-300) / <alpha-value>)",
                    400: "hsl(var(--primary-400) / <alpha-value>)",
                    500: "hsl(var(--primary-500) / <alpha-value>)",
                    600: "hsl(var(--primary-600) / <alpha-value>)",
                    700: "hsl(var(--primary-700) / <alpha-value>)",
                    800: "hsl(var(--primary-800) / <alpha-value>)",
                    900: "hsl(var(--primary-900) / <alpha-value>)",
                    950: "hsl(var(--primary-950) / <alpha-value>)",
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground:
                        "hsl(var(--primary-foreground) / <alpha-value>)",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground:
                        "hsl(var(--secondary-foreground) / <alpha-value>)",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground:
                        "hsl(var(--destructive-foreground) / <alpha-value>)",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground:
                        "hsl(var(--popover-foreground) / <alpha-value>)",
                },
                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
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
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
