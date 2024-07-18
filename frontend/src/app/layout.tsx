import type { Metadata } from "next";
// import {Inter as FontSans} from "next/font/google"
import {
    Arvo,
    Barlow,
    Bebas_Neue,
    Bitter,
    Calistoga,
    Capriola,
    Courgette,
    Crimson_Text,
    DM_Sans,
    EB_Garamond,
    Fredoka,
    Gothic_A1,
    Hepta_Slab,
    IBM_Plex_Sans,
    IBM_Plex_Serif,
    Inter,
    Inter as FontSans,
    Karla,
    Kite_One,
    Lato,
    Libre_Baskerville,
    Lora,
    Merriweather,
    Montserrat,
    Noto_Serif,
    Nova_Round,
    Oswald,
    Pacifico,
    Playfair_Display,
    Poppins,
    PT_Serif,
    Quicksand,
    Raleway,
    Roboto,
    Roboto_Slab,
    Rock_Salt,
    Rubik,
    Source_Serif_4,
    Space_Mono,
    Special_Elite,
    Work_Sans,
    Zilla_Slab,
} from "next/font/google";

import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientSessionProvider from "@/components/providers/ClientSessionProvider";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/app/providers";
import Registry from "@/app/registry";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

// Initialize fonts at module scope
const fontInter = Inter({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-inter",
});
const fontArvo = Arvo({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-arvo",
});
const fontBarlow = Barlow({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-barlow",
});
const fontBebasNeue = Bebas_Neue({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-bebas-neue",
});
const fontBitter = Bitter({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-bitter",
});
const fontCalistoga = Calistoga({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-calistoga",
});
const fontCapriola = Capriola({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-capriola",
});
const fontCourgette = Courgette({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-courgette",
});
const fontCrimsonText = Crimson_Text({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-crimson-text",
});
const fontDMSans = DM_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-dm-sans",
});
const fontEBGaramond = EB_Garamond({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-eb-garamond",
});
const fontFredokaOne = Fredoka({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-fredoka-one",
});
const fontGothicA1 = Gothic_A1({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-gothic-a1",
});
const fontHeptaSlab = Hepta_Slab({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-hepta-slab",
});
const fontIBMPlexSans = IBM_Plex_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-sans",
});
const fontIBMPlexSerif = IBM_Plex_Serif({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-serif",
});
const fontKarla = Karla({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-karla",
});
const fontKiteOne = Kite_One({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-kite-one",
});
const fontLato = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-lato",
});
const fontLibreBaskerville = Libre_Baskerville({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-libre-baskerville",
});
const fontLora = Lora({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-lora",
});
const fontMerriweather = Merriweather({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-merriweather",
});
const fontMontserrat = Montserrat({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-montserrat",
});
// const fontNanumPenScript = Nanum_Pen_Script({weight: ['400'], subsets: ["latin"], variable: "--font-nanum-pen-script"});
const fontNotoSerif = Noto_Serif({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-noto-serif",
});
const fontNovaRound = Nova_Round({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-nova-round",
});
const fontOswald = Oswald({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-oswald",
});
const fontPacifico = Pacifico({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-pacifico",
});
const fontPlayfairDisplay = Playfair_Display({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-playfair-display",
});
const fontPoppins = Poppins({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});
const fontPTSerif = PT_Serif({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-pt-serif",
});
const fontQuicksand = Quicksand({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-quicksand",
});
const fontRaleway = Raleway({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-raleway",
});
const fontRoboto = Roboto({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});
const fontRobotoSlab = Roboto_Slab({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-roboto-slab",
});
const fontRockSalt = Rock_Salt({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-rock-salt",
});
const fontRubik = Rubik({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-rubik",
});
const fontSourceSerif4 = Source_Serif_4({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-source-serif-4",
});
const fontSpaceMono = Space_Mono({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-space-mono",
});
const fontSpecialElite = Special_Elite({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-special-elite",
});
const fontWorkSans = Work_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-work-sans",
});
const fontZillaSlab = Zilla_Slab({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-zilla-slab",
});

// Combine all font variables
const allFonts = [
    fontInter,
    fontArvo,
    fontBarlow,
    fontBebasNeue,
    fontBitter,
    fontCalistoga,
    fontCapriola,
    fontCourgette,
    fontCrimsonText,
    fontDMSans,
    fontEBGaramond,
    fontFredokaOne,
    fontGothicA1,
    fontHeptaSlab,
    fontIBMPlexSans,
    fontIBMPlexSerif,
    fontKarla,
    fontKiteOne,
    fontLato,
    fontLibreBaskerville,
    fontLora,
    fontMerriweather,
    fontMontserrat,
    // fontNanumPenScript,
    fontNotoSerif,
    fontNovaRound,
    fontOswald,
    fontPacifico,
    fontPlayfairDisplay,
    fontPoppins,
    fontPTSerif,
    fontQuicksand,
    fontRaleway,
    fontRoboto,
    fontRobotoSlab,
    fontRockSalt,
    fontRubik,
    fontSourceSerif4,
    fontSpaceMono,
    fontSpecialElite,
    fontWorkSans,
    fontZillaSlab,
];
export const metadata: Metadata = {
    title: "Linktree Clone",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body
                className={[
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                    allFonts.map((item) => item.variable).join(" "),
                ].join(" ")}
            >
                <ClientSessionProvider session={session}>
                    <Providers>
                        <Registry>
                            {children}
                            <Toaster />
                        </Registry>
                    </Providers>
                </ClientSessionProvider>
            </body>
        </html>
    );
}
