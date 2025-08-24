"use client";

import { AnyObject } from "antd/es/_util/type";
import { ReactNode } from "react";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

interface Props<T extends AnyObject> {
  title: string;
  subtitle: string;
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T>;
}

const AuthForm = <T extends AnyObject>({
  title,
  subtitle,
  children,
  handleSubmit,
  onSubmit,
}: Props<T>) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="auth-form"
      className="flex w-full flex-col gap-y-10 rounded-xl bg-white sm:max-w-[476px] sm:p-10"
    >
      <div>
        <p className="heading-m mb-2 text-2xl text-grey-dark sm:text-[32px]">
          {title}
        </p>
        <p className="body-m text-grey">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-y-6">{children}</div>
    </form>
  );
};

export default AuthForm;
