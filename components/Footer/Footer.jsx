import {
  GitHubIcon,
  InstagramIcon,
  XIcon,
} from "@/app/assets/svgs/GeneralIcons";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/utils/constants";
import { playfair_font } from "@/utils/fonts";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 flex flex-col gap-1 md:flex-row md:justify-between items-center py-2 md:py-3">
        <Link href={BASE_URL}>
          <h1 className={cn("font-bold text-lg md:text-xl", playfair_font)}>
            Dedx
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Notes
            </span>
          </h1>
        </Link>

        <p className="text-sm font-bold">
          © Copyright 2024. All Rights Reserved.
        </p>

        <div className="flex items-center justify-between my-1 md:my-0">
          <Link
            href="https://github.com/DedxAB"
            className="hover:text-primary transition-all duration-300 ease-in-out"
            target="_blank"
          >
            <GitHubIcon className="w-4 h-4" />
            <span className="sr-only">GitHub account</span>
          </Link>

          <Link
            href="https://x.com/sumit_x09"
            className="hover:text-primary ms-5 transition-all duration-300 ease-in-out"
            target="_blank"
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Twitter page</span>
          </Link>
          <Link
            href="https://www.instagram.com/sumit_ig09"
            className="hover:text-primary ms-5 transition-all duration-300 ease-in-out"
            target="_blank"
          >
            <InstagramIcon className="w-4 h-4" />
            <span className="sr-only">Instagram page</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
