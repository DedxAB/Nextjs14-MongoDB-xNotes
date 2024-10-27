const NotFound = () => {
  return (
    <div className="flex h-[85vh] items-start justify-center flex-col md:items-center">
      <h1 className="mb-4 text-2xl font-bold md:text-4xl">
        <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Oops! 404
        </span>{' '}
        - Not Found.
      </h1>
      <p className="text-lg font-bold text-gray-primary">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
