import { cn } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  iconClassName?: string;
  textClassName?: string;
  variant?: "small" | "default";
}

const Logo = ({ iconClassName, textClassName, variant = "default" }: Props) => {
  return (
    <Link
      href={"/"}
      className={`flex items-center ${
        variant === "default" ? "gap-x-[7.5px]" : "gap-x-1.5"
      }`}
    >
      <Image
        src="/icons/logo-icon.svg"
        alt="devlinks "
        width={variant === "default" ? 40 : 32}
        height={variant === "default" ? 40 : 32}
        priority
        className={cn("", iconClassName)}
      />
      <Image
        src="/icons/logo-text.svg"
        alt="devlinks logo"
        width={variant === "default" ? 135 : 108}
        height={variant === "default" ? 26.25 : 21}
        priority
        className={cn("", textClassName)}
      />
    </Link>
  );
};

export default Logo;
