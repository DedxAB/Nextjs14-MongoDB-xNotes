const LoadingSkeleton = () => {
  return (
    <>
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
      </div>
    </>
  );
};

export default LoadingSkeleton;
