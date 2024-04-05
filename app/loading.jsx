import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="h-[85vh] w-full flex justify-center items-center">
      <LoadingSkeleton />
    </div>
  );
}
