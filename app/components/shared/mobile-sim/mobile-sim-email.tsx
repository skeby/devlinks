import { cn } from "@/app/lib/utils";
import { MobileSimProps } from ".";

interface Props extends MobileSimProps {
  name?: string;
}

const MobileSimEmail = ({ skeleton, className, name }: Props) => {
  return (
    <div
      className={cn(
        `rounded-[104px] h-2 w-[72px] ${
          skeleton || !name ? "bg-[#EEEEEE]" : "bg-inherit"
        }`,
        className
      )}
    >
      {name}
    </div>
  );
};

export default MobileSimEmail;
