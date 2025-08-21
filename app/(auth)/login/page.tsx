"use client";

import { z } from "zod";
import AuthForm from "@/app/components/shared/auth-form";
import Input from "@/app/components/shared/input";
import { EnvelopeSimpleIcon, LockKeyIcon } from "@phosphor-icons/react";
import { Button, message } from "antd";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { app } from "@/app/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import useAppRouter from "@/app/hooks/useAppRouter";
import { FirebaseError } from "firebase/app";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty" })
    .email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Can't be empty" }),
});

type LoginFields = z.infer<typeof LoginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useAppRouter();
  const methods = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        data.email,
        data.password,
      );
      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      message.success("Login successful", 1).then(() => router.push("/"));
    } catch (e) {
      if (e instanceof FirebaseError) {
        message.error(e.message);
      } else {
        message.error("Something went wrong");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm<LoginFields>
      title="Login"
      subtitle="Add your details below to get back into the app"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChange={onChange}
            error={errors.email?.message}
            label="Email address"
            placeholder="e.g. alex@email.com"
            prefix={
              <EnvelopeSimpleIcon
                size={16}
                weight="fill"
                className="text-grey"
              />
            }
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChange={onChange}
            error={errors.password?.message}
            type="password"
            label="Password"
            placeholder="Enter your password"
            prefix={
              <LockKeyIcon size={16} weight="fill" className="text-grey" />
            }
          />
        )}
      />
      {/* TODO: Fix background color on hover */}
      <Button
        loading={loading}
        htmlType="submit"
        // form="auth-form"
        type="primary"
        className="heading-s !h-[46px] !rounded-lg !p-3"
        // onClick={handleSubmit(onSubmit)}
      >
        Login
      </Button>
      <p className="body-m text-center">
        <span className="text-grey">Don&apos;t have an account?</span>
        <Link href={"/register"} className="text-primary">
          {" "}
          Create account
        </Link>
      </p>
    </AuthForm>
  );
};

export default Login;
