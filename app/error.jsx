"use client";

import { Button } from "@/components/ui/button";

const Error = ({ error, reset }) => {
  return (
    <div className="bg-red-500 text-white p-4 rounded flex items-center justify-between">
      <p>Something went wrong!</p>
      <Button onClick={reset}>Reload again</Button>
    </div>
  );
};

export default Error;
