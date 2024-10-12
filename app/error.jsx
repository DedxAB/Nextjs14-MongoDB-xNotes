"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Error = () => {
  const handleRetry = () => {
    window.location.reload(false);
  };

  return (
    <div className="flex h-[85vh] items-center justify-center">
      <div className="my-auto flex flex-wrap items-center justify-center space-x-3 text-lg font-bold md:text-2xl">
        <p className="text-center">
          <span className="mr-2">Oops!</span> Something went wrong.
        </p>
        <Button
          variant="destructive"
          onClick={handleRetry}
          className="flex items-center text-lg font-bold md:text-xl md:py-[19px]"
        >
          <RotateCcw className="w-[1.2rem] h-[1.2rem] mr-1" />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default Error;
