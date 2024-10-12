import { Suspense } from 'react';
import Link from 'next/link';

import NoteSkeletonWrapper from '@/components/Skeleton/NoteSkeletonWrapper';
import NotesFeed from '@/components/NotesFeed/NotesFeed';
import SearchInput from '@/components/SearchInput/SearchInput';
import UserBanner from '@/components/UserBanner/UserBanner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BASE_URL } from '@/utils/constants';

const Home = () => {
  return (
    <div className="min-h-full mt-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={BASE_URL}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>

      {/* UserBanner Welcome */}
      <UserBanner />
      {/* Search Input */}
      <SearchInput />
      {/* Notes Feed */}
      <Suspense fallback={<NoteSkeletonWrapper />}>
        <NotesFeed />
      </Suspense>
    </div>
  );
};

export default Home;
