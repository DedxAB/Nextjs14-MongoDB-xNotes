import Signin from "@/components/signin/SigninComp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  } else {
    return (
      <>
        <Signin />
      </>
    );
  }
};

export default SigninPage;
