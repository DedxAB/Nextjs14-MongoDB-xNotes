"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Error = () => {
  return (
    <div className="flex h-[85vh] items-center justify-center">
      <div className="my-auto flex flex-wrap items-center justify-center space-x-3 text-lg md:text-2xl font-bold">
        <p className="text-center">
          <span className="mr-2">Opps!</span>
          Something went wrong.
        </p>
        <Button
          variant={`destructive`}
          onClick={() => window.location.reload(false)}
          className={`text-lg md:text-xl font-bold md:py-[19px]`}
        >
          <RotateCcw className="w-[1.2rem] h-[1.2rem] mr-1" />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default Error;
