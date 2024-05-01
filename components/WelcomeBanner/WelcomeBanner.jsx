export default function WelcomeBanner({ title, description }) {
  return (
    <>
      <div className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          {title}
        </h1>
        <h1 className="text-xl md:text-2xl my-2">{description}</h1>
      </div>
    </>
  );
}
