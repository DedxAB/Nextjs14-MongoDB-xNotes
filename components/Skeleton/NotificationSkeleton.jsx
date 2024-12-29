import { Skeleton } from '../ui/skeleton';

const NotificationItemSkeleton = () => (
  <div className="text-sm md:text-base border mb-3 rounded-lg px-3 md:px-4 py-2">
    <div className="flex items-center gap-3">
      {/* Avatar Skeleton */}
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />

      {/* Content Skeleton */}
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-3 w-[40%]" />
      </div>
    </div>
  </div>
);

export default NotificationItemSkeleton;
