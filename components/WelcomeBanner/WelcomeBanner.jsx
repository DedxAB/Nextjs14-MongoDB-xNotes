import GradientText from "../GradientText";

export default function WelcomeBanner({ title, description }) {
  return (
    <>
      <div className="font-bold text-[#444746] mb-6 mt-8">
        <GradientText className="text-4xl md:text-5xl">{title}</GradientText>
        <h1 className="text-xl md:text-2xl my-2">{description}</h1>
      </div>
    </>
  );
}
