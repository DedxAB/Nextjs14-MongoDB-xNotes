"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const Signin = () => {
  return (
    <>
      <Button
        variant={`outline`}
        className={`font-bold`}
        onClick={() => signIn("google")}
      >
        Signin using Google
      </Button>
    </>
  );
};

export default Signin;
