"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { MessageSquareX, Save } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EditProfileForm = ({ authorId, bio, socialLinks }) => {
  const route = useRouter();
  const [newBio, setNewBio] = useState(bio);
  const [socialLink, setSocialLink] = useState({});

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    if (!newBio) {
      toast.warning("Bio is required");
      return;
    }
    try {
      const res = await fetch(`/api/user/${authorId}`, {
        method: "PATCH",
        body: JSON.stringify({ bio: newBio }),
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

          {/* Buttons */}
          <div className="ml-auto">
            {/* Cancel Button */}
            <Link href={`/profile/${authorId}`}>
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
