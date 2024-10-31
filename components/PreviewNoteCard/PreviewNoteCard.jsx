import dayjs from 'dayjs';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { josefin_sans_font } from '@/utils/fonts';
import {
  CommentIcon,
  EmptyHeartIcon,
  ShareIcon,
} from '@/app/assets/svgs/GeneralIcons';

import { Avatar, AvatarImage } from '../ui/avatar';
import NoteDescription from '../NoteDescription/NoteDescription';

export default function PreviewNoteCard({
  title,
  description,
  tags,
  websiteLink,
  selectVisibility,
  noteId = '',
  note,
}) {
  return (
    <>
      <div className="border rounded-xl flex justify-start gap-1 my-3 px-3 md:px-4 py-3">
        {/* Show the author image */}
        <div className="mr-2 pt-[5px]">
          <Avatar>
            <AvatarImage
              src={'/logo.png'}
              referrerPolicy="no-referrer"
              alt={'DedxNotes'}
            />
          </Avatar>
        </div>
        <div className="w-full">
          {/* Show the author name, username */}
          <div
            className={`flex flex-wrap items-center text-xs mr-2 py-1 ${josefin_sans_font}`}
          >
            {/* name  */}
            <p className={`font-bold mr-1`}>DedxNotes</p>

            {/* username */}
            <p className={`text-gray-secondary`}>@dedxnotes</p>
          </div>

          {/* Title and Date div  */}
          <div className="flex justify-between items-start gap-1">
            {/* Show the title and date */}
            <div>
              {/* title  */}
              <h2 className={`text-lg md:text-xl font-bold`}>{title}</h2>

              {/* date */}
              <div
                className={`pt-[.19rem] md:pt-1 flex text-xs flex-wrap justify-start items-center text-gray-secondary ${josefin_sans_font}`}
              >
                <p className="mr-1">
                  {
                    dayjs(Date.now()).format('MMM D, YYYY • hh : mm A') // Mar 27, 2024
                  }
                </p>
                <div>
                  •&nbsp;
                  <span>
                    {selectVisibility === 'private' ? 'Only me' : 'Public'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Show the description */}
          {description && (
            <NoteDescription
              description={description}
              noteId={noteId}
              note={note}
            />
          )}

          {/* Show the tags */}
          {tags && (
            <div className="pt-1">
              {tags.split(/[\s,]+/).map((tag, index) => (
                <Link
                  href={`/result?q=${tag}`}
                  key={index}
                  className={`text-sm md:text-base mr-2 cursor-pointer border px-2 py-[0.16rem] rounded inline-block my-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Show the likes and comments and weblink */}
          {(title || description || websiteLink) && (
            <div className={`flex gap-3 mt-2 pt-1 items-center`}>
              {/* Likes  */}
              <div className="flex gap-1 items-center transition-all duration-300 ease-in-out border hover:border-primary rounded-full p-2 cursor-pointer">
                <EmptyHeartIcon className="w-5 h-5" />
                <span className="text-sm font-bold">0</span>
              </div>

              {/* Comments */}
              <div className="flex gap-1 items-center transition-all duration-300 ease-in-out border hover:border-primary rounded-full p-2 cursor-pointer">
                <CommentIcon className="w-5 h-5" />
                <span className="text-sm font-bold">0</span>
              </div>

              {/* Website Link */}
              {websiteLink && (
                <>
                  <Link
                    href={websiteLink}
                    target="_blank"
                    className="border rounded-full p-[.63rem] hover:border-primary transition-all duration-300 ease-in-out"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </>
              )}

              {/* Share */}
              <div className="mr-1 cursor-pointer transition-all duration-300 ease-in-out border rounded-full p-[.63rem] hover:border-primary">
                <ShareIcon className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
