import { cn } from "@/app/lib/utils";
import { MobileSimProps } from ".";

interface Props extends MobileSimProps {
  name?: string;
}

const MobileSimEmail = ({ skeleton, className, name }: Props) => {
  return (
    <div
      className={cn(
        `rounded-[104px] text-sm text-grey ${
          skeleton && !name ? "h-2 w-[72px] bg-[#EEEEEE]" : "bg-inherit"
        }`,
        className,
      )}
    >
      {name}
    </div>
  );
};

export default MobileSimEmail;
