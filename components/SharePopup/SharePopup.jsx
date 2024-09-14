"use client";

import { useEffect, useState } from "react";
import { Check, Clipboard, X } from "lucide-react";

import { BASE_URL } from "@/utils/constants";
import { generateSlug } from "@/utils/slugGenerator";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { Button } from "../ui/button";

export default function SharePopup({ handleShare, updatedNote }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${BASE_URL}/note/${generateSlug(updatedNote?.title)}/${updatedNote?._id}`
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleShare();
    }, 1000);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-20 bg-black/80 overflow-hidden flex justify-center items-center"
        onClick={handleShare}
      ></div>

      {/* Modal content */}
      <div className="fixed z-50 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg mt-15 min-w-72 max-w-lg p-6 border bg-background">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Share Note</h2>
          <p className="mt-2">{updatedNote?.title}</p>
        </div>

        {/* Form to enter email */}
        <div className="flex items-center justify-between gap-2">
          {/* Social Share */}
          <div className="flex items-center gap-3">
            <FacebookShareButton
              url={`${BASE_URL}/note/${generateSlug(updatedNote?.title)}/${
                updatedNote?._id
              }`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url={`${BASE_URL}/note/${generateSlug(updatedNote?.title)}/${
                updatedNote?._id
              }`}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton
              url={`${BASE_URL}/note/${generateSlug(updatedNote?.title)}/${
                updatedNote?._id
              }`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

          {/* Copy button */}
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex px-3 gap-1 items-center"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <p>Copied</p>
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4" />
                <p>Copy</p>
              </>
            )}
          </Button>
        </div>

        {/* Close button */}
        <button
          onClick={handleShare}
          className="absolute top-0 right-0 mt-2 mr-2 text-primary focus:outline-none border rounded-full p-1 hover:border-primary transition-all duration-300 ease-in-out"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
