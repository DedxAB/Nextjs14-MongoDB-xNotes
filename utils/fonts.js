import {
  Josefin_Sans,
  Playfair_Display,
  Open_Sans,
  Inter,
} from "next/font/google";

const opensans = Open_Sans({
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const josefin_sans_font = josefinSans.className;
const playfair_font = playfair.className;
const opensans_font = opensans.className;
const inter_font = inter.className;

export { josefin_sans_font, playfair_font, opensans_font, inter_font };
