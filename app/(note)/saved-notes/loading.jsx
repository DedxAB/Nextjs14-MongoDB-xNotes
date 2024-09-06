import NoteSkeleton from "@/components/Skeleton/NoteSkeleton";

const Loading = () => {
  return (
    <>
      <NoteSkeleton showBannerSkeleton={true} />
      <NoteSkeleton showBannerSkeleton={true} />
      <NoteSkeleton showBannerSkeleton={true} />
      <NoteSkeleton showBannerSkeleton={true} />
      <NoteSkeleton showBannerSkeleton={true} />
    </>
  );
};

export default Loading;
