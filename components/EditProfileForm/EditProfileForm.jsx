"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { MessageSquareX, Save } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

const EditProfileForm = ({ authorId, bio, socialLinks }) => {
  const [newBio, setNewBio] = useState(bio);
  const [socialLink, setSocialLink] = useState({});

  const handelOnSubmit = () => {};
  return (
    <>
      <section className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Any Changes in your Profile?
        </h1>
        <h1 className="text-xl md:text-2xl my-2">
          Dont worry! You are at right place.
        </h1>
      </section>
      <section>
        <form onSubmit={handelOnSubmit} className="flex flex-col gap-3">
          {/* Title input field */}
          {/* <Input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newBio}
            type="text"
            name="topic"
            id="topic"
            placeholder="Topic name"
            className="border shadow w-full px-4 py-6 text-lg font-bold rounded"
          /> */}

          {/* Description text area */}
          <Textarea
            onChange={(e) => setNewBio(e.target.value)}
            value={newBio}
            placeholder={`Please fill Bio about yourself`}
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
