"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { playfair_font } from "@/utils/fonts";
import Image from "next/image";

const Signin = () => {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl");

  return (
    <div className="flex items-center justify-center m-auto min-h-[85vh]">
      <div className="flex items-center justify-between flex-col md:flex-row m-auto h-fit w-full">
        <div className="w-full md:w-1/2 h-full">
          <Image
            src={`https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
            alt="background-image"
            width={700}
            height={700}
            className="object-cover w-full h-full"
          ></Image>
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex flex-col space-y-5 py-8 items-center justify-center">
            <div className="text-lg mb-4">
              Welcome back to{" "}
              <p className={`inline-block text-3xl font-bold ${playfair_font}`}>
                Dedx
                <span
                  className={`bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent`}
                >
                  Notes
                </span>
              </p>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Sign in to your account</h1>
              <p className="text-gray-500">Or sign up for a new account</p>
            </div>
            <Button
              variant={`outline`}
              className={`h-11 w-fit px-5 rounded-lg flex items-start justify-center space-x-1`}
              onClick={() =>
                signIn("google", { callbackUrl: callBackUrl || "/" })
              }
            >
              {/* Google svg  */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
                className="mr-2"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span className="text-lg">Continue with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
