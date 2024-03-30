import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";

const page = () => {
  return (
    <div className="font-bold h-screen w-full flex justify-center items-center">
      <LoadingSkeleton />
    </div>
  );
};

export default page;
