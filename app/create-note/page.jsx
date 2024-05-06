import AddNote from "@/components/AddNote/AddNote";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BASE_URL } from "@/utils/constants";
import Link from "next/link";

export const metadata = {
  title: "Create Note",
};

const page = () => {
  return (
    <div className="min-h-full">
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={`${BASE_URL}`}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Create Note</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <AddNote />
    </div>
  );
};

export default page;
