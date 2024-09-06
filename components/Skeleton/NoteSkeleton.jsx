import CommentSkeleton from "./CommentSkeleton";
import WelcomeBannerSkeleton from "./WelcomeBannerSkeleton";

const NoteSkeleton = ({
  showCommentSkeleton = false,
  showBannerSkeleton = false,
}) => {
  return (
    <>
      {/* Banner skeleton */}
      {showBannerSkeleton && <WelcomeBannerSkeleton />}

      <div className="border-t border-x flex justify-start gap-1 mb-3 md:mb-4 rounded-tr-xl rounded-tl-xl px-3 md:px-4 py-[.85rem] relative">
        {/* Author image skeleton */}
        <div className="pt-[5px] mr-2 flex flex-col justify-between items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
        </div>

        <div className="w-full">
          {/* Author name and username skeleton */}
          <div className="flex flex-wrap items-center text-xs mr-2 py-1">
            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mr-2" />
            <div className="h-3 w-16 bg-gray-300 rounded animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse my-2"></div>

          {/* Date and visibility skeleton */}
          <div className="pt-[.19rem] md:pt-1 flex text-xs flex-wrap justify-start items-center text-[#6b6e6e]">
            <div className="h-3 w-24 bg-gray-300 rounded animate-pulse mr-1" />
            <div className="h-3 w-5 bg-gray-300 rounded animate-pulse" />
          </div>

          {/* Description skeleton */}
          <div className="h-4 w-full bg-gray-300 rounded animate-pulse my-2" />
          <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse mb-3" />

          {/* Tags skeleton */}
          <div className="pt-1 flex flex-wrap">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-6 w-16 bg-gray-300 rounded animate-pulse mr-2 mb-1"
              />
            ))}
          </div>

          {/* Likes, comments, share icons skeleton */}
          <div className="flex gap-[.63rem] md:gap-3 mt-2 pt-1 items-center">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Comment skeleton */}
      {showCommentSkeleton && <CommentSkeleton />}
    </>
  );
};

export default NoteSkeleton;
