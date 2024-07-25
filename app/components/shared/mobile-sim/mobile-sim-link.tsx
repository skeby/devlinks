import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";
import { MobileSimProps } from ".";

interface Props extends MobileSimProps {
  title?: string;
  href?: string;
  icon?: ReactNode;
}

const MobileSimLink = ({
  skeleton = false,
  title,
  href,
  className,
  icon,
}: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        `rounded-lg ${skeleton ? "bg-[#EEEEEE] h-11 w-full" : ""}`,
        className
      )}
    >
      {icon}
      {title}
    </a>
  );
};

export default MobileSimLink;
