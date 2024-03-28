import Signin from "@/components/Signin/Signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await getServerSession();
  /*
  console.log(session);
  Output:
  {
    user: {
      name: 'Hawt Sauce',
      email: 'hawtsauce.signin@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocIRxM9_MlMj8YWfXmuEZdMPoT10ivNvqW6HeOWMbNvAGg=s96-c'
    }
  } 
  */

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
