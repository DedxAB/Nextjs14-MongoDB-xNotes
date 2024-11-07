'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ReactLinkify from 'react-linkify';

import { cn } from '@/lib/utils';
import { inter_font } from '@/utils/fonts';
import { generateSlug } from '@/utils/slugGenerator';

const NoteDescription = ({ description, note = {} }) => {
  const pathName = usePathname();

  const truncateString = (str, num) => {
    return (
      <>
        {str?.length > num ? str.slice(0, num) : str}
        {str?.length > num && (
          <>
            <span>... </span>
            <Link
              href={`/note/${generateSlug(note?.title)}/${note?._id}`}
              className="text-primary hover:underline"
            >
              see more
            </Link>
          </>
        )}
      </>
    );
  };

  const customLink = (href, text, key) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      {text}
    </a>
  );

  return (
    <>
      <div
        className={cn(
          'text-sm md:text-base mt-[0.28rem] py-1 whitespace-pre-line w-full',
          inter_font
        )}
        style={{ overflowWrap: 'anywhere' }}
      >
        <ReactLinkify componentDecorator={customLink}>
          {pathName === `/note/${generateSlug(note?.title)}/${note?._id}` ||
          pathName === '/create-note' ||
          pathName === `/note/${generateSlug(note?.title)}/${note?._id}/edit`
            ? description
            : truncateString(description, 140)}
        </ReactLinkify>
      </div>
    </>
  );
};

export default NoteDescription;
