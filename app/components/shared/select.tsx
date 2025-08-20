// TODO: Find a way to render svg as is without using image tags

"use client";

import { cn } from "@/app/lib/utils";
import { Select as AntSelect, SelectProps } from "antd";
import Image from "next/image";

interface Props extends SelectProps {
  label?: string;
  error?: string;
}

const Select = (props: Props) => {
  const { label, className, error, suffixIcon, popupClassName, ...rest } =
    props;

  return (
    <div className="body-s flex w-full flex-col gap-y-1 text-grey-dark">
      {label && <span className="text-xs">{label}</span>}
      <AntSelect
        className={cn(
          `body-m !h-12 w-full leading-6 ${
            error ? "!text-[#FF3939]" : "text-grey-dark"
          }`,
          className,
        )}
        suffixIcon={
          error ? (
            <span className="body-s text-[#FF3939]">{error}</span>
          ) : (
            <Image
              width={12}
              height={6}
              src={"/icons/select-arrow.svg"}
              alt="select arrow"
            />
          )
        }
        // TODO: Sort out margin top
        classNames={{
          popup: {
            root: cn(
              // TODO: Sort out border not showing when there is error
              `mt-4 rounded-lg ${error ? "!border-[#FF3939] !shadow-none hover:!border-[#FF3939]" : "!shadow-[0px_0px_32px_0px_#0000001A] border border-[#D9D9D9]"}`,
              popupClassName,
            ),
          },
        }}
        {...rest}
      />
    </div>
  );
};

export default Select;
