"use client";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="p-4 rounded flex items-center justify-center gap-3 text-lg font-bold">
      <p>
        <span className="bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Opps!
        </span>
        Something went wrong!
      </p>
      <Button
        variant={`outline`}
        onClick={() => window.location.reload(false)}
        className={`text-lg font-bold`}
      >
        Retry
      </Button>
    </div>
  );
};

export default Error;
