import Image from "next/image";
import Link from "next/link";

interface Props {
  variant?: "small" | "default";
}

const Logo = ({ variant = "default" }: Props) => {
  return (
    <Link
      href={"/"}
      className={`flex items-center ${
        variant === "default" ? "gap-x-[7.5px]" : "gap-x-1.5"
      }`}
    >
      <Image
        src="/logo-icon.svg"
        alt="devlinks logo"
        width={variant === "default" ? 40 : 32}
        height={variant === "default" ? 40 : 32}
        priority
      />
      <Image
        src="/logo-text.svg"
        alt="devlinks logo"
        width={variant === "default" ? 135 : 108}
        height={variant === "default" ? 26.25 : 21}
        priority
      />
    </Link>
  );
};

export default Logo;
