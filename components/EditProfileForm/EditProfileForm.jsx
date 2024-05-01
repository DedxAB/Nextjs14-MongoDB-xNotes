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

// Validate URL function
const isValidUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

const EditProfileForm = ({ userId, bio, socialLinks }) => {
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
    if (!newBio) {
      toast.warning("Bio is required");
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
        body: JSON.stringify({ bio: newBio, socialLinks: socialLink }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update bio");
      }
      toast.success("Bio Updated Successfully.", {
        id: toastId,
      });
      route.back();
      route.refresh();
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
          {/* Description text area */}
          <Textarea
            ref={textareaRef}
            onChange={handleBioChange}
            value={newBio}
            placeholder={`Tell us about yourself...`}
            className={`px-4 py-3 font-bold shadow overflow-hidden`}
          />
          <p className="text-right font-bold text-sm text-gray-500">
            {charCount}/{maxCharCount}
          </p>
          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            <Input
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
          <div className="ml-auto">
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
                <Button variant={`outline`} className="font-bold w-fit mr-3">
                  <MessageSquareX className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </Link>
            )}

            {/* Save Button */}
            <Button type={`submit`} className="font-bold w-fit">
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
