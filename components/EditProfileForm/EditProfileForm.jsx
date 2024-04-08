"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { MessageSquareX, Save } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

const isValidUrl = (url) => {
  const urlRegex = new RegExp(
    "^https:\\/\\/www\\.[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$"
  );
  return urlRegex.test(url);
};

const EditProfileForm = ({ userId, bio, socialLinks }) => {
  const route = useRouter();
  const [newBio, setNewBio] = useState(bio || "");
  const [socialLink, setSocialLink] = useState(socialLinks || {});

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

    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ bio: newBio, socialLinks: socialLink }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to update bio");
      }
      toast.success("Bio Updated Successfully");
      route.back();
      route.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <section className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Profile details changes?
        </h1>
        <h1 className="text-xl md:text-2xl my-2">
          Dont worry! You are at right place.
        </h1>
      </section>
      <section>
        <form onSubmit={handelOnSubmit} className="flex flex-col gap-3">
          {/* Description text area */}
          <Textarea
            onChange={(e) => setNewBio(e.target.value)}
            value={newBio}
            placeholder={`Tell us about yourself...`}
            className={`border shadow w-full px-4 py-3 font-bold rounded`}
          />
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
            <Link href={`/profile/${userId}`}>
              <Button variant={`outline`} className="font-bold w-fit mr-3">
                <MessageSquareX className="w-4 mr-1" />
                {/* <X className="w-4 mr-1" /> */}
                Cancel
              </Button>
            </Link>

            {/* Save Button */}
            <Button
              type={`submit`}
              variant={`outline`}
              className="font-bold w-fit"
            >
              <Save className="w-4 mr-1" />
              Save
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProfileForm;
