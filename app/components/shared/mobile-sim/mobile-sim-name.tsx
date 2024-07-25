import { cn } from "@/app/lib/utils";
import { MobileSimProps } from ".";

interface Props extends MobileSimProps {
  name?: string;
}

const MobileSimName = ({ skeleton, className, name }: Props) => {
  return (
    <div
      className={cn(
        `rounded-[104px] h-4 w-[160px] ${
          skeleton || !name ? "bg-[#EEEEEE]" : "bg-inherit"
        }`,
        className
      )}
    >
      {name}
    </div>
  );
};

export default MobileSimName;
