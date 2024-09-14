import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/components/Signin/Signin";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

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
