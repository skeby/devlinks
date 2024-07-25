// TODO: Find a way to render svg as is without using image tags

"use client";

import { cn } from "@/app/lib/utils";
import { Select as AntSelect, SelectProps } from "@/app/lib/antd";
import Image from "next/image";

interface Props extends SelectProps {
  label?: string;
  error?: string;
}

const Select = (props: Props) => {
  const { label, className, error, suffixIcon, popupClassName, ...rest } =
    props;

  return (
    <div className="flex flex-col w-full gap-y-1 text-grey-dark body-s">
      {label && <span className="text-xs">{label}</span>}
      <AntSelect
        className={cn(
          `w-full h-12 text-grey-dark body-m leading-6 ${
            error ? "border-red hover:border-red" : ""
          }`,
          className
        )}
        suffixIcon={
          error ? (
            <span className="body-s text-red">{error}</span>
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
        popupClassName={cn(
          "mt-4 border border-[#D9D9D9] rounded-lg !shadow-[0px_0px_32px_0px_#0000001A]",
          popupClassName
        )}
        {...rest}
      />
    </div>
  );
};

export default Select;
