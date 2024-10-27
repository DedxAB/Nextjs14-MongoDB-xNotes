import NoteSkeleton from "@/components/Skeleton/NoteSkeleton";

const Loading = () => {
  return (
    <>
      <NoteSkeleton showBannerSkeleton={true} />
      <NoteSkeleton />
      <NoteSkeleton />
      <NoteSkeleton />
      <NoteSkeleton />
    </>
  );
};

export default Loading;
