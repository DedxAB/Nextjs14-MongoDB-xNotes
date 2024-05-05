import { BASE_URL } from "@/utils/constants";
import Link from "next/link";

export default function SecondNavbar() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-center gap-5">
          <Link
            href={`${BASE_URL}/about`}
            className="rounded-md hover:border-primary p-2"
          >
            About
          </Link>
          <Link
            href={`${BASE_URL}/features`}
            className="rounded-md border-primary p-2"
          >
            Features
          </Link>
          <Link
            href={`${BASE_URL}/faqs`}
            className="rounded-md border-primary p-2"
          >
            FAQs
          </Link>
        </div>
      </div>
    </>
  );
}
