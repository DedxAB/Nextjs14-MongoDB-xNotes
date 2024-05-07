"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { MessageSquareX, Save } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import WelcomeBanner from "../WelcomeBanner/WelcomeBanner";
import { Label } from "../ui/label";
import { source_code_pro_font } from "@/utils/fonts";

// Validate URL function
const isValidUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

const EditProfileForm = ({ userId, bio, socialLinks, name, username }) => {
  const [newName, setNewName] = useState(name || "");
  const [newUsername, setNewUsername] = useState(username || "");
  const [newBio, setNewBio] = useState(bio || "");
  const [socialLink, setSocialLink] = useState(socialLinks || {});
  const [charCount, setCharCount] = useState(0);
  const { data: session } = useSession();
  // console.log(session);

  const route = useRouter();

  // resize textarea
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newBio]);

  // Max character count for bio
  const maxCharCount = 160;
  const handleBioChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharCount) {
      setNewBio(text);
      setCharCount(text.length);
    }
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();

    if (!newName) {
      toast.warning("Name is required");
      return;
    }
    if (!newUsername) {
      toast.warning("Username is required");
      return;
    }

    // Validate URLs
    for (const platform in socialLink) {
      if (socialLink[platform] && !isValidUrl(socialLink[platform])) {
        toast.warning(`Please enter a valid ${platform} URL.`);
        return;
      }
    }

    const toastId = toast.loading("Updating Bio...");
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          bio: newBio,
          socialLinks: socialLink,
          name: newName,
          username: newUsername,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update bio");
      }
      route.back();
      route.refresh();
      toast.success("Bio Updated Successfully.", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
      console.log(error.message);
    }
  };

  return (
    <>
      <WelcomeBanner
        title={`Profile details changes?`}
        description={`Don't worry! You are at the right place.`}
      />

      <section>
        <form onSubmit={handelOnSubmit} className="flex flex-col gap-3">
          {/* Name input and Username input main div  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name Input */}
            <div className="flex flex-col justify-center gap-3">
              <Label
                htmlFor={`name`}
                className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
              >
                Name:
              </Label>
              <Input
                id={`name`}
                placeholder="Name"
                className={`font-bold py-5 px-4`}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            {/* Username Input */}
            <div className="flex flex-col justify-center gap-3">
              <Label
                htmlFor={`username`}
                className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
              >
                Username:
              </Label>
              <Input
                id={`username`}
                placeholder="username"
                className={`font-bold py-5 px-4`}
                value={`${newUsername}`}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
          </div>
          {/* Description text area */}
          <div className="flex flex-col justify-center gap-3">
            <Label
              htmlFor={`bio`}
              className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
            >
              Your Bio:
            </Label>
            <Textarea
              id={`bio`}
              ref={textareaRef}
              onChange={handleBioChange}
              value={newBio}
              placeholder={`Tell us about yourself...`}
              className={`px-4 py-3 font-bold shadow overflow-hidden`}
            />
          </div>
          <p className="text-right font-bold text-sm text-gray-500">
            {charCount}/{maxCharCount}
          </p>

          {/* Social Links */}
          <Label
            htmlFor={`social`}
            className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
          >
            Social Links:
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              id={`social`}
              placeholder="https://www.facebook.com/"
              className={`font-bold py-5 px-4`}
              value={socialLink?.facebook || ""}
              onChange={(e) =>
                setSocialLink({ ...socialLink, facebook: e.target.value })
              }
            />
            <Input
              placeholder="https://www.twitter.com/"
              className={`font-bold py-5 px-4`}
              value={socialLink?.twitter || ""}
              onChange={(e) =>
                setSocialLink({ ...socialLink, twitter: e.target.value })
              }
            />
            <Input
              placeholder="https://www.instagram.com/"
              className={`font-bold py-5 px-4`}
              value={socialLink?.instagram || ""}
              onChange={(e) =>
                setSocialLink({ ...socialLink, instagram: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="ml-auto mb-20">
            {/* Cancel Button */}
            {session?.user?.isAdmin ? (
              <Link href={`/admin/${userId}/details`}>
                <Button variant={`outline`} className="font-bold w-fit mr-3">
                  <MessageSquareX className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </Link>
            ) : (
              <Link href={`/profile/${userId}/details`}>
                <Button
                  variant={`outline`}
                  className="font-bold w-fit px-3 mr-3"
                >
                  {/* <MessageSquareX className="w-4 h-4 mr-1" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 48 48"
                  >
                    <linearGradient
                      id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1"
                      x1="9.858"
                      x2="38.142"
                      y1="9.858"
                      y2="38.142"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#f44f5a"></stop>
                      <stop offset=".443" stopColor="#ee3d4a"></stop>
                      <stop offset="1" stopColor="#e52030"></stop>
                    </linearGradient>
                    <path
                      fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)"
                      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                    ></path>
                    <path
                      d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z"
                      opacity=".05"
                    ></path>
                    <path
                      d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z"
                      opacity=".07"
                    ></path>
                    <path
                      fill="#fff"
                      d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"
                    ></path>
                  </svg>
                  Cancel
                </Button>
              </Link>
            )}

            {/* Save Button */}
            <Button type={`submit`} className="font-bold px-3 w-fit">
              <Save className="w-4 h-4 mr-1" />
              Update
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProfileForm;
