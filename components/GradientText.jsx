import { cn } from "@/lib/utils";

const GradientText = ({ children, className }) => {
  return (
    <h1
      className={cn(
        "bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent font-bold",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default GradientText;
