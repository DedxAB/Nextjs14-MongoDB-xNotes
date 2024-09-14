import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Signin from "@/components/Signin/Signin";

import { BASE_URL } from "@/utils/constants";

const SigninPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        redirect("/")
      ) : (
        <>
          <div className="mt-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href={`${BASE_URL}`}>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Signin</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Signin />
        </>
      )}
    </>
  );
};

export default SigninPage;
