import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";
import { MobileSimProps } from ".";

interface Props extends MobileSimProps {
  title?: string;
  href?: string;
  icon?: ReactNode;
  color?: string;
}

const MobileSimLink = ({
  skeleton = false,
  title,
  href,
  className,
  icon,
  color,
}: Props) => {
  return (
    <a
      href={href || "#"}
      target={href && !skeleton ? "_blank" : undefined}
      style={{
        backgroundColor: color,
      }}
      className={cn(
        `rounded-lg h-11 w-full ${skeleton ? "bg-[#EEEEEE]" : ""}`,
        className
      )}
    >
      {icon}
      {title}
    </a>
  );
};

export default MobileSimLink;
