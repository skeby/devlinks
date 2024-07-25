import Image from "next/image";
import { MobileSimProps } from ".";
import { cn } from "@/app/lib/utils";

interface Props extends MobileSimProps {
  src?: string;
}

const MobileSimImage = ({ className, skeleton, src }: Props) => {
  if (!src || skeleton)
    return <div className={cn("bg-[#EEEEEE] rounded-full", className)}></div>;
  return <Image src={src} className={cn("", className)} alt="profile image" />;
};

export default MobileSimImage;
