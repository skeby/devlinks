"use client";

import { z } from "zod";
import AuthForm from "@/app/components/shared/auth-form";
import Input from "@/app/components/shared/input";
import { EnvelopeSimple, LockKey } from "@phosphor-icons/react/dist/ssr";
import { Button, message } from "@/app/lib/antd";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { app } from "@/app/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import useAppRouter from "@/app/hooks/useAppRouter";

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
        data.password
      );
      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      message.success("Login successful", 1).then(() => router.push("/links"));
    } catch (e) {
      message.error((e as Error).message);
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
              <EnvelopeSimple size={16} weight="fill" className="text-grey" />
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
            prefix={<LockKey size={16} weight="fill" className="text-grey" />}
          />
        )}
      />
      {/* TODO: Fix background color on hover */}
      <Button
        loading={loading}
        htmlType="submit"
        // form="auth-form"
        type="primary"
        className="p-3 h-[46px] heading-s rounded-lg"
        // onClick={handleSubmit(onSubmit)}
      >
        Login
      </Button>
      <p className="text-center body-m">
        <span className="text-grey">Don't have an account?</span>
        <Link href={"/register"} className="text-primary">
          {" "}
          Create account
        </Link>
      </p>
    </AuthForm>
  );
};

export default Login;
