import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
    darkMode: ["class"],
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
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",

                background: "hsl(var(--background))",
                "dashboard-background": "hsl(var(--dashboard-background))",

                foreground: {
                    primary: "hsl(var(--foreground))",
                    secondary: "hsl(var(--foreground-secondary))",
                    disabled: "hsl(var(--foreground-disabled))",
                    DEFAULT: "hsl(var(--foreground))",
                },

                primary: {
                    50: "hsl(var(--primary-50))",
                    100: "hsl(var(--primary-100))",
                    200: "hsl(var(--primary-200))",
                    300: "hsl(var(--primary-300))",
                    400: "hsl(var(--primary-400))",
                    500: "hsl(var(--primary-500))",
                    600: "hsl(var(--primary-600))",
                    700: "hsl(var(--primary-700))",
                    800: "hsl(var(--primary-800))",
                    900: "hsl(var(--primary-900))",
                    950: "hsl(var(--primary-950))",
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
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
