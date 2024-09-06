const CommentCardSkeleton = () => {
  return (
    <>
      <div className="border flex justify-start items-start gap-3 rounded-lg px-3 md:px-4 py-2 animate-pulse my-10">
        {/* Skeleton for the author image */}
        <div className="bg-gray-300 rounded-full h-10 w-10"></div>

        <div className="flex justify-between items-center w-full gap-1">
          {/* Skeleton for the author name, username, and comment text */}
          <div className="w-full flex flex-col space-y-2">
            {/* Skeleton for the author name and timestamp */}
            <div className="flex flex-wrap items-center text-xs gap-1">
              <div className="bg-gray-300 rounded-md h-4 w-20"></div>
              <div className="bg-gray-300 rounded-md h-4 w-16"></div>
            </div>

            {/* Skeleton for the comment text */}
            <div className="bg-gray-300 rounded-md h-4 w-full"></div>
            <div className="bg-gray-300 rounded-md h-4 w-3/4"></div>
          </div>

          {/* Skeleton for the remove comment button */}
          <div className="bg-gray-300 rounded-md h-6 w-6"></div>
        </div>
      </div>
    </>
  );
};

export default CommentCardSkeleton;
