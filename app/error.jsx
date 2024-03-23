"use client";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="p-4 rounded flex items-center justify-center gap-3 text-lg font-bold">
      <p>Something went wrong!</p>
      <Button variant={`outline`} onClick={() => window.location.reload(false)} className={`text-lg font-bold`}>
        Reload again
      </Button>
    </div>
  );
};

export default Error;
