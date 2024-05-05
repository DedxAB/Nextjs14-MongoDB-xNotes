import FeatureSection from "@/components/FeatureSection/FeatureSection";
import Image from "next/image";

export default function Features() {
  return (
    <div className="min-h-[85vh]">
      <div className="w-full relative">
        <Image
          src={`https://images.pexels.com/photos/640809/pexels-photo-640809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
          alt="faq-image"
          width={1200}
          height={300}
          priority
          className="object-cover w-full h-32 md:h-44"
        ></Image>
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] font-bold md:text-4xl text-white text-center">
          <h2>Features</h2>
        </div>
      </div>

      {/* Features page content */}
      <FeatureSection />
    </div> 
  );
}
