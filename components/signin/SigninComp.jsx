"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const Signin = () => {
  return (
    <div className="flex items-center justify-center m-auto h-[80vh]">
      <Button
        variant={`outline`}
        className={`font-bold`}
        onClick={() => signIn("google")}
      >
        Signin using Google
      </Button>
    </div>
  );
};

export default Signin;
