"use client";

import { cn } from "@/app/lib/utils";
import { Input as AntInput, InputProps } from "antd";

interface Props extends InputProps {
  label?: string;
  error?: string;
}

const Input = (props: Props) => {
  const {
    label,
    className,
    classNames,
    error,
    suffix,
    rootClassName,
    ...rest
  } = props;

  return (
    <div
      className={cn(
        "body-s flex flex-col gap-y-1 text-grey-dark",
        rootClassName,
      )}
    >
      {label && (
        <span
          className={`text-xs ${error ? "text-[#FF3939]" : "text-grey-dark"}`}
        >
          {label}
        </span>
      )}
      <AntInput
        classNames={{
          ...classNames,
          prefix: cn("!mr-3", classNames?.prefix),
          input: cn("placeholder:text-[#999999]", classNames?.input),
        }}
        className={cn(
          `body-m !h-12 !rounded-lg !py-3 px-4 leading-6 ${
            error
              ? "!border-[#FF3939] !text-[#FF3939] !shadow-none hover:!border-[#FF3939]"
              : "text-grey-dark"
          }`,
          className,
        )}
        suffix={
          error ? (
            <span className="body-s text-[#FF3939]">{error}</span>
          ) : (
            suffix || <span />
          )
        }
        {...rest}
      />
    </div>
  );
};

export default Input;
