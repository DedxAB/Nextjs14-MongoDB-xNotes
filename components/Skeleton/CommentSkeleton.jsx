import CommentCardSkeleton from "./CommentCardSkeleton";

const CommentSkeleton = () => {
  return (
    <>
      <div className="border flex justify-start items-center gap-1 mb-3 rounded-lg px-3 md:px-4 py-3">
        {/* Skeleton for the author image */}
        <div className="mr-2 py-1">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
        </div>

        {/* Skeleton for author name, username, and user comment text */}
        <div className="w-full flex flex-col gap-1 md:gap-2">
          {/* Skeleton for author name and username */}
          <div className="flex flex-wrap items-center text-xs">
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mr-2" />
            <div className="h-3 w-16 bg-gray-300 rounded animate-pulse" />
          </div>

          {/* Skeleton for the user comment input field */}
          <div className="text-sm font-bold flex justify-between items-center gap-2">
            <div className="h-8 w-full bg-gray-300 rounded animate-pulse" />
            <div className="h-8 w-10 md:w-9 bg-gray-300 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Skeleton for the user comment text */}
      <CommentCardSkeleton />
    </>
  );
};

export default CommentSkeleton;
