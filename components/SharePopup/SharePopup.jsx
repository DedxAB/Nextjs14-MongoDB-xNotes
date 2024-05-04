"use client";

import { BASE_URL } from "@/utils/constants";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
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

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${BASE_URL}/note/${updatedNote?._id}/details`
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleShare();
    }, 1000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 overflow-auto flex justify-center items-center">
        <div className="absolute inset-0" onClick={handleShare}></div>
        <div className="rounded-lg mt-15 min-w-72 max-w-lg p-6 relative border bg-background">
          {/* Modal content */}
          <div className="mb-4">
            <h2 className="text-xl font-bold">Share Note</h2>
            <p className="mt-2">{updatedNote?.title}</p>
          </div>

          {/* Form to enter email */}
          <div className="flex items-center justify-between">
            {/* Social Share */}
            <div className="flex items-center gap-4">
              <FacebookShareButton
                url={`${BASE_URL}/note/${updatedNote?._id}/details`}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton
                url={`${BASE_URL}/note/${updatedNote?._id}/details`}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton
                url={`${BASE_URL}/note/${updatedNote?._id}/details`}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>

            {/* Copy button */}
            <Button
              onClick={handleCopy}
              variant=""
              className="flex gap-1 items-center"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
