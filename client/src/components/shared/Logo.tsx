import Link from "next/link";
import Image from "next/image";

export default function Logo({
  className = "",
  width = 110,
  height = 35,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Link href="/" className={className}>
      <Image src="/logo.png" alt="assets ger" width={100} height={30} />
    </Link>
  );
}
