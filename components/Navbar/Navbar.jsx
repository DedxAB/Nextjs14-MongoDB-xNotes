import Link from "next/link";
import { playfair_font } from "@/utils/fonts";
import RightNavLinks from "./RightNavLinks";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  return (
    <nav className="max-w-3xl relative mx-auto px-4 flex justify-between items-center py-4">
      <Link href={`/`}>
        <h1 className={cn("font-bold text-2xl md:text-3xl", playfair_font)}>
          Dedx
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Notes
          </span>
        </h1>
      </Link>

      <RightNavLinks />
    </nav>
  );
};

export default Navbar;
