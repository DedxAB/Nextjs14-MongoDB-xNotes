import Image from "next/image";

const MyImage = ({ src }) => {
  return (
    <>
      <Image
        src={src}
        alt="user image"
        width={40}
        height={40}
        className="shrink-0 overflow-hidden rounded-full aspect-square"
        referrerPolicy="no-referrer"
      />
    </>
  );
};

export default MyImage;
