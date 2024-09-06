import { BASE_URL } from "@/utils/constants";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const BreadcrumbComponent = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={`${BASE_URL}`}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Profile</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
