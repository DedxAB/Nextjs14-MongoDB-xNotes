import Link from "next/link";

export default function SecondNavbar() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-center gap-5">
          <Link href={``} className="rounded-md hover:border-primary p-2">
            About
          </Link>
          <Link href={``} className="rounded-md border-primary p-2">
            Features
          </Link>
          <Link href={``} className="rounded-md border-primary p-2">
            FAQ
          </Link>
        </div>
      </div>
    </>
  );
}
