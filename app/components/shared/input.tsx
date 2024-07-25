"use client";

import { cn } from "@/app/lib/utils";
import { Input as AntInput, InputProps, InputRef } from "@/app/lib/antd";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends InputProps {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, className, classNames, error, suffix, ...rest } = props;
  const inputRef = useRef<InputRef>(null);

  useImperativeHandle(
    ref,
    () => inputRef.current as unknown as HTMLInputElement
  );
  return (
    <div className="flex flex-col gap-y-1 text-grey-dark body-s">
      {label && <span className="text-xs">{label}</span>}
      <AntInput
        ref={inputRef}
        classNames={{
          ...classNames,
          prefix: cn("!mr-3", classNames?.prefix),
          input: cn("placeholder:text-[#999999]", classNames?.input),
        }}
        className={cn(
          `rounded-lg px-4 h-12 py-3 text-grey-dark body-m leading-6 ${
            error ? "border-red hover:border-red" : ""
          }`,
          className
        )}
        suffix={
          error ? <span className="body-s text-red">{error}</span> : suffix
        }
        {...rest}
      />
    </div>
  );
});

export default Input;
