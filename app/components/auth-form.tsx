"use client";

import { AnyObject } from "antd/es/_util/type";
import { ReactNode } from "react";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

interface Props<T extends AnyObject> {
  title: string;
  subtitle: string;
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
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
      className="sm:w-[476px] bg-white rounded-xl p-10 flex flex-col gap-y-10"
    >
      <div>
        <p className="heading-m text-grey-dark mb-2">{title}</p>
        <p className="body-m text-grey">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-y-6">{children}</div>
    </form>
  );
};

export default AuthForm;
