import NoteSkeleton from './NoteSkeleton';

export default function UserProfileSkeleton() {
  return (
    <>
      <div className="mb-6 mt-8 animate-pulse">
        {/* Profile Heading */}
        <div className="bg-gray-300 rounded-md h-10 w-32 mb-5 py-1"></div>

        <div className="flex items-center gap-3 mb-3">
          {/* User Avatar */}
          <div className="bg-gray-300 rounded-full h-16 w-16"></div>

          <div className="flex flex-col gap-2 w-full">
            {/* User name and username */}
            <div className="flex items-center gap-2">
              <div className="bg-gray-300 rounded-md h-6 w-32"></div>
              <div className="bg-gray-300 rounded-md h-6 w-16"></div>
            </div>

            {/* User Username */}
            <div className="bg-gray-300 rounded-md h-4 w-24"></div>
          </div>
        </div>

        {/* User Google Account */}
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gray-300 rounded-md h-5 w-24"></div>
          <div className="bg-gray-300 rounded-md h-5 w-36"></div>
        </div>

        {/* User Bio */}
        <div className="bg-gray-300 rounded-md h-6 w-full mb-4"></div>

        {/* User Social Links */}
        <div className="flex gap-3 mb-4">
          <div className="bg-gray-300 rounded-full h-5 w-5"></div>
          <div className="bg-gray-300 rounded-full h-5 w-5"></div>
          <div className="bg-gray-300 rounded-full h-5 w-5"></div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 items-center">
          {/* User Joined date */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 rounded-md h-5 w-5"></div>
            <div className="bg-gray-300 rounded-md h-5 w-32"></div>
          </div>

          {/* Edit Profile Button */}
          <div className="bg-gray-300 rounded-md h-8 w-32"></div>
        </div>
      </div>

      {/* User feed  */}
      <NoteSkeleton />
      <NoteSkeleton />
      <NoteSkeleton />
      <NoteSkeleton />
    </>
  );
}
