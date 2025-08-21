import Image from "next/image";
import { MobileSimProps } from ".";
import { cn } from "@/app/lib/utils";

interface Props extends MobileSimProps {
  src?: string;
}

const MobileSimImage = ({ className, skeleton, src }: Props) => {
  if (skeleton || !src)
    return (
      <div className={cn("size-24 rounded-full bg-[#EEEEEE]", className)}></div>
    );
  return (
    <Image
      priority
      src={src}
      width={96}
      height={96}
      className={cn(
        "size-24 rounded-full border-4 border-primary object-cover",
        className,
      )}
      alt="Profile image"
    />
  );
};

export default MobileSimImage;
