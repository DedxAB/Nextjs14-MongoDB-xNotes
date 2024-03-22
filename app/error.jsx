"use client";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="p-4 rounded flex items-center justify-start gap-3 text-lg font-bold">
      <p>Something went wrong!</p>
      <Button variant={`outline`} onClick={() => window.location.reload(false)}>
        Reload again
      </Button>
    </div>
  );
};

export default Error;
