"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { playfair_font } from "@/utils/fonts";
import Image from "next/image";
import { GoogleIcon } from "@/app/assets/svgs/GeneralIcons";

const Signin = () => {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl");

  return (
    <div className="flex items-center justify-center m-auto min-h-[85vh]">
      <div className="flex items-center justify-between flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full">
          <Image
            src={`https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
            alt="background-image"
            width={700}
            height={700}
            className="object-cover w-full h-full"
          ></Image>
        </div>
        <div className="w-full md:w-1/2 h-full">
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
              <GoogleIcon className="h-6 w-6 mr-1" />
              <span className="text-lg">Continue with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
