import {
  Josefin_Sans,
  Federo,
  Luckiest_Guy,
  Playfair_Display,
} from "next/font/google";

const federo = Federo({
  subsets: ["latin"],
  weight: ["400"],
});
const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const federo_font = federo.className;
const luckiest_guy_font = luckiestGuy.className;
const josefin_sans_font = josefinSans.className;
const playfair_font = playfair.className;

export { josefin_sans_font, federo_font, luckiest_guy_font, playfair_font };
