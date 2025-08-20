import { cn } from "@/app/lib/utils";
import { Component, ReactNode } from "react";
import { MobileSimProps } from ".";
import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react";

interface Props extends MobileSimProps {
  title?: string;
  href?: string;
  icon?: any;
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
  const IconComponent = icon;
  if (skeleton)
    return (
      <div className="bg-[#EEEEEE] h-11 px-4 py-3.5 w-full rounded-lg"></div>
    );
  return (
    <a
      href={href || ""}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
      target={href ? "_blank" : undefined}
      style={{
        backgroundColor: color || "#633CFF",
      }}
      className={cn(
        "rounded-lg h-11 w-full text-white px-4 py-3.5 text-xs",
        className
      )}
    >
      <div className="flex items-center gap-x-2">
        <IconComponent className="text-white" />
        {/* <Image
          width={16}
          height={16}
          src={`/icons/${icon}`}
          alt={`${title} icon`}
          className="text-white"
          style={{
            color: "#ffffff",
            fill: "#ffffff",
          }}
        /> */}
        <span className="flex-grow">{title}</span>
        <ArrowRightIcon className="size-4" />
      </div>
    </a>
  );
};

export default MobileSimLink;
