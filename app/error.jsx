"use client";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="bg-red-500 text-white p-4 rounded flex items-center justify-between">
      <p>Something went wrong!</p>
      <Button variant={`outline`} onClick={() => window.location.reload(false)}>
        Reload again
      </Button>
    </div>
  );
};

export default Error;
