'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { josefin_sans_font } from '@/utils/fonts';
import { generateSlug } from '@/utils/slugGenerator';
import {
  CancelIcon,
  HidePreviewIcon,
  PublishIcon,
  ShowPreviewIcon,
} from '@/app/assets/svgs/GeneralIcons';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import PreviewNoteCard from '../PreviewNoteCard/PreviewNoteCard';

// Validate URL function
const isValidUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

const EditNote = ({
  id,
  title,
  description,
  author,
  tags,
  websiteLink,
  visibility,
  note,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newTags, setNewTags] = useState(tags.join(', '));
  const [newWebsiteLink, setNewWebsiteLink] = useState(websiteLink);
  const [charCount, setCharCount] = useState(0);
  const [preview, setPreview] = useState(false);
  const [selectNewVisibility, setSelectNewVisibility] = useState(
    visibility || 'public'
  );

  const route = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  // resize textarea
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newDescription]);

  // Max character count for description
  const maxCharCount = 550;
  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharCount) {
      setNewDescription(text);
      setCharCount(text.length);
    }
  };

  // Clear all data function
  const clearAllData = () => {
    setNewTitle('');
    setNewDescription('');
    setNewTags('');
    setNewWebsiteLink('');
    setSelectNewVisibility('public');
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      toast.warning('Please fill all the fields');
      return;
    }

    // validate URL if provided
    if (newWebsiteLink && !isValidUrl(newWebsiteLink)) {
      toast.warning('Please enter a valid website link (if provided).');
      return;
    }

    const tagArray =
      newTags && newTags.trim() !== ''
        ? newTags
            .trim()
            .split(/[\s,]+/)
            .filter(Boolean)
        : [];

    const toastId = toast.loading('Updating Note...');
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
          newTags: tagArray,
          newWebsiteLink,
          selectNewVisibility,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to Edit note.');
      }

      // Redirect to the correct page
      if (from === '01-n') {
        route.push(`/note/${generateSlug(newTitle)}/${id}`);
      } else if (from === '02-u') {
        route.push(`/user/${author?.username}/${author?._id}`);
      } else {
        route.push(`/`);
      }

      route.refresh();

      toast.success('Note Updated Successfully.', {
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
      <section id="edit-note-banner">
        <WelcomeBanner
          title="Any Changes?"
          description={`Don't worry! You are at right place.`}
        />
      </section>

      <section id="edit-note-form">
        <div className="flex flex-col gap-3">
          {/* Title input field */}
          <Label
            htmlFor="title"
            className={`font-bold md:text-base pl-1 text-gray-primary ${josefin_sans_font}`}
          >
            Title:
          </Label>
          <Input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            type="text"
            name="title"
            id="title"
            placeholder="Title of the Note..."
            className="shadow px-4 py-6 text-lg font-bold"
          />

          {/* Description text area */}
          <Label
            htmlFor="description"
            className={`font-bold md:text-base pl-1 text-gray-primary ${josefin_sans_font}`}
          >
            Description:
          </Label>
          <Textarea
            id="description"
            ref={textareaRef}
            onChange={handleDescriptionChange}
            value={newDescription}
            placeholder={`Please fill the Details about the note`}
            className={`shadow px-4 py-3 font-bold min-h-32 overflow-hidden`}
          />
          <div className="flex items-center justify-between gap-1">
            <p
              className={cn(
                'text-sm font-bold text-gray-primary pl-1',
                josefin_sans_font
              )}
            >
              Saved automatically as you type.
            </p>
            <p className="text-right font-bold text-sm text-gray-primary">
              {charCount}/{maxCharCount}
            </p>
          </div>
          {/* Website Link input field */}
          <Input
            onChange={(e) => {
              setNewWebsiteLink(e.target.value);
            }}
            value={newWebsiteLink}
            type="text"
            name="websiteLink"
            id="websiteLink"
            placeholder="https://attach website link if any (Optional)"
            className="shadow px-4 py-5 font-bold"
          />

          {/* Tags text area */}
          <Label
            htmlFor="tags"
            className={`font-bold md:text-base pl-1 text-gray-primary ${josefin_sans_font}`}
          >
            Keyword: (for better search results)
          </Label>

          <Input
            onChange={(e) => {
              setNewTags(e.target.value);
            }}
            value={newTags}
            type="text"
            name="tags"
            id="tags"
            placeholder="development, tech, ... (Optional)"
            className="shadow px-4 py-5 font-bold"
          />

          <div className="flex justify-end md:justify-between items-center gap-1 mt-3">
            <div
              className={`font-bold hidden md:block md:text-base pl-1 text-gray-primary ${josefin_sans_font}`}
            >
              Want to preview the note before publishing?
            </div>
            <div className="flex gap-3 items-center justify-end">
              <Button
                onClick={() => setPreview(!preview)}
                variant={`outline`}
                className="font-bold w-fit px-3"
              >
                {preview ? (
                  <HidePreviewIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ShowPreviewIcon className="w-4 h-4 mr-1" />
                )}
                {preview ? 'Hide Preview' : 'Preview'}
              </Button>
              <Button className={`font-bold`} onClick={clearAllData}>
                Clear all
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Component  */}
      {preview && (
        <PreviewNoteCard
          title={newTitle}
          description={newDescription}
          tags={newTags}
          websiteLink={newWebsiteLink}
          selectVisibility={selectNewVisibility}
          noteId={id}
          note={note}
        />
      )}

      <section id="edit-note-submit-area">
        <div className="flex items-center justify-end md:justify-end gap-3 mt-5 mb-32">
          <div>
            <Select
              onValueChange={(newValue) => setSelectNewVisibility(newValue)}
              defaultValue={selectNewVisibility}
            >
              <SelectTrigger className="w-[116px]">
                <SelectValue placeholder="Share with" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Visibility</SelectLabel>
                  <SelectItem value="private" className={`cursor-pointer`}>
                    🔒&nbsp;Only me
                  </SelectItem>
                  <SelectItem value="public" className={`cursor-pointer`}>
                    🌎&nbsp;Public
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Update Button */}
          <Button onClick={handelOnSubmit} className="font-bold">
            <PublishIcon className="w-4 h-4 mr-1" />
            Update
          </Button>

          {/* Cancel Button */}
          <Button
            variant={`outline`}
            className="font-bold w-fit"
            onClick={() => route.back()}
          >
            <CancelIcon className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          {/* </Link> */}
        </div>
      </section>
    </>
  );
};

export default EditNote;
