import { cn } from "@/app/lib/utils";
import { MobileSimProps } from ".";

interface Props extends MobileSimProps {
  name?: string;
}

const MobileSimName = ({ skeleton, className, name }: Props) => {
  return (
    <div
      className={cn(
        `rounded-[104px] font-semibold text-grey-dark ${
          skeleton && !name?.trim()
            ? "h-4 w-[160px] bg-[#EEEEEE]"
            : "bg-inherit"
        }`,
        className,
      )}
    >
      {name}
    </div>
  );
};

export default MobileSimName;
