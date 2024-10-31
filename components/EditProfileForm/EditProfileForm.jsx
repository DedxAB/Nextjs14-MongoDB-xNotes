'use client';

import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

import { CancelIcon } from '@/app/assets/svgs/GeneralIcons';
import { josefin_sans_font } from '@/utils/fonts';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';

// Validate URL function
const isValidUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

const EditProfileForm = ({ userId, bio, socialLinks, name, username }) => {
  const [newName, setNewName] = useState(name || '');
  const [newUsername, setNewUsername] = useState(username || '');
  const [newBio, setNewBio] = useState(bio || '');
  const [socialLink, setSocialLink] = useState(socialLinks || {});
  const [charCount, setCharCount] = useState(0);
  const { data: session } = useSession();
  const pathName = usePathname();
  // console.log(session);

  const route = useRouter();

  // resize textarea
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!newName) {
      toast.warning('Name is required');
      return;
    }
    if (!newUsername) {
      toast.warning('Username is required');
      return;
    }

    // Validate URLs
    for (const platform in socialLink) {
      if (socialLink[platform] && !isValidUrl(socialLink[platform])) {
        toast.warning(`Please enter a valid ${platform} URL.`);
        return;
      }
    }

    const toastId = toast.loading('Updating Bio...');
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          bio: newBio,
          socialLinks: socialLink,
          name: newName,
          username: newUsername,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update bio');
      }

      if (pathName === `/admin/${userId}/edit`) {
        route.push(`/admin/${userId}/details`);
      } else {
        route.push(`/user/${newUsername}/${userId}`);
      }

      route.refresh();
      toast.success('Bio Updated Successfully.', {
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
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-3">
          {/* Name input and Username input main div  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name Input */}
            <div className="flex flex-col justify-center gap-2">
              <Label
                htmlFor={`name`}
                className={`font-bold md:text-base pl-1 text-gray-primary ${josefin_sans_font}`}
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
            <div className="flex flex-col justify-center gap-2">
              <Label
                htmlFor={`username`}
                className={`font-bold md:text-base pl-1 text-gray-primary ${josefin_sans_font}`}
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
          <div className="flex flex-col justify-center gap-2">
            <Label
              htmlFor={`bio`}
              className={`font-bold md:text-base pl-1 text-gray-primary ${josefin_sans_font}`}
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
            className={`font-bold md:text-base pl-1 text-gray-primary ${josefin_sans_font}`}
          >
            Social Links:
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              id={`social`}
              placeholder="https://www.facebook.com/"
              className={`font-bold py-5 px-4`}
              value={socialLink?.facebook || ''}
              onChange={(e) =>
                setSocialLink({ ...socialLink, facebook: e.target.value })
              }
            />
            <Input
              placeholder="https://www.twitter.com/"
              className={`font-bold py-5 px-4`}
              value={socialLink?.twitter || ''}
              onChange={(e) =>
                setSocialLink({ ...socialLink, twitter: e.target.value })
              }
            />
            <Input
              placeholder="https://www.instagram.com/"
              className={`font-bold py-5 px-4`}
              value={socialLink?.instagram || ''}
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
                  <CancelIcon className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </Link>
            ) : (
              <Link href={`/user/${username}/${userId}`}>
                <Button
                  variant={`outline`}
                  className="font-bold w-fit px-3 mr-3"
                >
                  <CancelIcon className="w-4 h-4 mr-1" />
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
