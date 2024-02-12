"use client";

import { Button } from "@/components/ui/button";

const Error = ({ error, reset }) => {
  return (
    <div className="bg-red-500 text-white p-4 rounded">
      <p>Something went wrong!</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
};

export default Error;
