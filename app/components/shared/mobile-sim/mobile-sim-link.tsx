"use client";

import { cn } from "@/app/lib/utils";
import { MobileSimProps } from ".";
import ArrowRightIcon from "@/app/assets/icons/arrow-right.svg";
import { platformOptions } from "@/app/static";

interface Props extends MobileSimProps {
  href?: string;
  platform?: string;
}

const MobileSimLink = ({
  skeleton = false,
  platform,
  href,
  className,
}: Props) => {
  if (skeleton)
    return (
      <div className="h-11 w-full shrink-0 rounded-lg bg-[#EEEEEE] px-4 py-3.5"></div>
    );
  const platformOption = platformOptions.find((o) => o.value === platform);
  const IconComponent = platformOption?.icon;
  const color = platformOption?.color || "#633CFF";
  const title = platformOption?.label;
  return (
    <a
      href={href || ""}
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
      target={href ? "_blank" : undefined}
      style={{
        backgroundColor: color,
      }}
      className={cn(
        "h-11 w-full shrink-0 rounded-lg px-4 py-3.5 text-xs text-white",
        className,
      )}
    >
      <div className="flex items-center gap-x-2">
        {IconComponent && <IconComponent className="text-white" />}
        <span className="flex-grow">{title || ""}</span>
        <ArrowRightIcon className="size-4" />
      </div>
    </a>
  );
};

export default MobileSimLink;
