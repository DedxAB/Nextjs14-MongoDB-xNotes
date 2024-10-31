import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import AddNote from '@/components/AddNote/AddNote';
import { BASE_URL } from '@/utils/constants';

export const metadata = {
  title: 'Create Note',
};

const Page = () => (
  <div className="min-h-full">
    <div className="mt-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={BASE_URL}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Create Note</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <AddNote />
  </div>
);

export default Page;
