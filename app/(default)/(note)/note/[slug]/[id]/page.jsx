import { getServerSession } from 'next-auth';
import { Suspense } from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import NoteSkeleton from '@/components/Skeleton/NoteSkeleton';
import { BASE_URL } from '@/utils/constants';
import { generateSlug } from '@/utils/slugGenerator';
import { fetchNoteById } from '@/services/note/server/note.service';

import NoteDetailsComponent from './components/NoteDetailsComponent';

const Page = ({ params }) => {
  const { id } = params;
  return (
    <div className="min-h-full mt-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={BASE_URL}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Notes</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Suspense-wrapped dynamic part */}
      <Suspense
        fallback={
          <NoteSkeleton showCommentSkeleton={true} showBannerSkeleton={true} />
        }
      >
        <NoteDetailsComponent id={id} />
      </Suspense>
    </div>
  );
};

export default Page;

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();
  const { data: note = {} } = (await fetchNoteById(id)) ?? {};
  const currentUserEmail = session?.user?.email;
  const isPrivateNote =
    currentUserEmail !== note?.author?.email && note?.visibility !== 'public';

  return {
    title: isPrivateNote ? 'Note Details (Private)' : note?.title || 'Note',
    description: isPrivateNote
      ? 'This is a private note. Only the author can view it.'
      : note?.description || 'Note details and comments.',
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `/note/${generateSlug(note?.title)}/${id}`,
      siteName: 'DedxNotes',
    },
  };
};
