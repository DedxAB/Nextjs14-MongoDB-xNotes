import {
  Josefin_Sans,
  Playfair_Display,
  Open_Sans,
  Inter,
  Source_Code_Pro,
  Poppins,
} from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight:["400", "500", "600", "700"]
})

const opensans = Open_Sans({
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
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
const source_code_pro_font = sourceCodePro.className;
const poppins_font = poppins.className;

export {
  josefin_sans_font,
  playfair_font,
  opensans_font,
  inter_font,
  source_code_pro_font,
  poppins_font,
};
