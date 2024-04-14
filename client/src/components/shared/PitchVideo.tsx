import Image from "next/image";

export default function PitchVideo() {
  return (
    <Image
      src="/videos/pitch-video.jpg"
      alt="video"
      width={700}
      height={300} //height do not affect the image
      className="mx-auto border rounded-3xl"
    />
  );
}
