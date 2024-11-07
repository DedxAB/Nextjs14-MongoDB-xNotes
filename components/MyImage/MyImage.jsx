import Image from 'next/image';

const MyImage = ({ src, width = 40, height = 40 }) => {
  return (
    <>
      <Image
        src={src}
        alt="user image"
        width={width}
        height={height}
        className="shrink-0 overflow-hidden rounded-full aspect-square"
        referrerPolicy="no-referrer"
      />
    </>
  );
};

export default MyImage;
