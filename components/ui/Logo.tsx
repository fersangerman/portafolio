import Image from "next/image";

interface LogoProps {
  width?: number;
  className?: string;
}

export default function Logo({ width = 160, className }: LogoProps) {
  const height = Math.round(width * 0.47);

  return (
    <Image
      src="/images/logo.png"
      alt="Fernanda San German"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
