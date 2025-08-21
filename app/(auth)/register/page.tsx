"use client";

import AuthForm from "@/app/components/shared/auth-form";
import Input from "@/app/components/shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeSimple, LockKey } from "@phosphor-icons/react";
import { Button, message } from "antd";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app, db } from "@/app/firebase";
import { useState } from "react";
import useAppRouter from "@/app/hooks/useAppRouter";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const SignUpSchema = z
  .object({
    email: z.string().email().min(1, { message: "Can't be empty" }),
    password: z.string().min(1, { message: "Can't be empty" }),
    confirmPassword: z.string().min(8, { message: "Can't be empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "No match",
    path: ["confirmPassword"],
  });

type SignUpFields = z.infer<typeof SignUpSchema>;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useAppRouter();
  const methods = useForm<SignUpFields>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(app),
        data.email,
        data.password,
      );

      const user = userCredential.user;

      // Reference to Firestore doc
      const userRef = doc(db, "users", user.uid);

      // Store additional user info in Firestore
      await setDoc(
        userRef,
        {
          email: user.email,
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );

      message
        .success("Account created successfully", 1)
        .then(() => router.push("/login"));
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
    <AuthForm<SignUpFields>
      title="Create account"
      subtitle="Let's get you started sharing your links!"
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
            name="email"
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
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChange={onChange}
            error={errors.confirmPassword?.message}
            type="password"
            label="Confirm password"
            placeholder="Enter your password"
            prefix={<LockKey size={16} weight="fill" className="text-grey" />}
          />
        )}
      />

      <p className="body-s text-grey">
        Password must contains at least 8 characters
      </p>

      {/* TODO: Fix background color on hover */}
      <Button
        loading={loading}
        htmlType="submit"
        type="primary"
        className="heading-s !h-[46px] !rounded-lg !p-3 hover:!bg-[#BEADFF]"
      >
        Create new account
      </Button>
      <p className="body-m text-center">
        <span className="text-grey">Already have an account?</span>
        <Link href={"/login"} className="text-primary">
          {" "}
          Login
        </Link>
      </p>
    </AuthForm>
  );
};

export default SignUp;
