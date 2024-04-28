import Image from "next/image";

export default function Banner({
  images,
  height = 150,
  width = 93,
  className = "",
  ...restProps
}: {
  images: { src: string; alt: string }[];
  height?: number;
  width?: number;
  className?: string;
}) {
  return (
    <div
      className={`min-h-30 p-2 rounded-lg flex-center flex-wrap gap-4 sm:p-3 sm:gap-10 bg-[#363636] ${className}`}
      {...restProps}
    >
      {images.map((img, index) => (
        <Image
          key={index}
          src={img.src}
          alt={img.alt}
          width={width}
          height={height}
          priority
        />
      ))}
    </div>
  );
}
