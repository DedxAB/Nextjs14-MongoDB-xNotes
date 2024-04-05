const NotFound = () => {
  return (
    <div className="flex flex-col items-start md:items-center justify-center h-[85vh]">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Opps! 404
        </span>{" "}
        - Not Found.
      </h1>
      <p className="text-lg font-bold text-[#444746]">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
