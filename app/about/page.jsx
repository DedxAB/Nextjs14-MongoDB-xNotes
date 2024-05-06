import FaqSection from "@/components/FaqSection/FaqSection";
import FeatureSection from "@/components/FeatureSection/FeatureSection";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className={`min-h-full`}>
      <div className="w-full relative">
        <Image
          src={`https://images.pexels.com/photos/640809/pexels-photo-640809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
          alt="faq-image"
          width={1200}
          height={300}
          priority
          className="object-cover w-full h-32 md:h-44"
        ></Image>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold md:text-4xl text-white text-center">
          <h2>#About</h2>
        </div>
      </div>

      {/* About page content */}
      <div className="mt-8">
        <h2 className="mt-5 font-bold md:text-3xl text-center border p-5 rounded-lg">
          Welcome to DedxNotes!
        </h2>
        <p className={`mt-5 md:text-lg text-center border rounded-lg p-5 `}>
          An interactive note-sharing platform where creativity meets
          productivity. Create digital sticky notes for quick recall and
          reference. Share your notes globally, making note-taking and idea
          sharing a breeze. Start organizing your thoughts today! 🌟
        </p>
        <h2 className="mt-12 font-bold md:text-3xl text-center border rounded-lg p-5">
          Meet the Developer
        </h2>
        <p className="mt-5 md:text-lg text-center border rounded-lg p-5">
          This app is crafted with 💚 by{" "}
          <Link
            href="https://github.com/dedxab/"
            target="_blank"
            rel="noreferrer"
            className="text-primary"
          >
            Arnab Bhoumik
          </Link>
          . Connect with him on{" "}
          <Link
            href="https://www.linkedin.com/in/arnab-bhoumik/"
            target="_blank"
            rel="noreferrer"
            className="text-primary"
          >
            LinkedIn
          </Link>{" "}
          and{" "}
          <Link
            href={`https://www.instagram.com/sumit_ig09/`}
            target="_blank"
            rel={`noreferrer`}
            className="text-primary"
          >
            Instagram
          </Link>{" "}
          for more updates.
        </p>
      </div>

      {/* feature  */}
      <div>
        <h2 className="mt-12 font-bold md:text-3xl text-center border rounded-lg p-5">
          Features
        </h2>
      </div>
      <FeatureSection />

      {/* faq section  */}
      <div>
        <h2 className="mt-12 font-bold md:text-3xl text-center border rounded-lg p-5">
          Frequently Asked Questions
        </h2>
      </div>
      <FaqSection />
    </div>
  );
}
