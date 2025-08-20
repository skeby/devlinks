"use client";

import LinkField from "@/app/components/shared/link-field";
import { useTokens } from "@/app/context/tokens";
import { Button, message } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ImageIcon } from "@phosphor-icons/react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import MobileSimEmail from "@/app/components/shared/mobile-sim/mobile-sim-email";
import MobileSimImage from "@/app/components/shared/mobile-sim/mobile-sim-image";
import MobileSimLink from "@/app/components/shared/mobile-sim/mobile-sim-link";
import MobileSimName from "@/app/components/shared/mobile-sim/mobile-sim-name";
import { platformOptions } from "@/app/static";
import Input from "@/app/components/shared/input";

const ProfileDetailsSchema = z.object({
  firstName: z.string().min(1, { message: "Can't be empty" }),
  lastName: z.string().min(1, { message: "Can't be empty" }),
  email: z.string().optional(),
});

type ProfileDetailsFields = z.infer<typeof ProfileDetailsSchema>;

const Settings = () => {
  const tokens = useTokens();
  const { control, handleSubmit, watch } = useForm<ProfileDetailsFields>({
    resolver: zodResolver(ProfileDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const fields = [] as any[];

  const onSubmit: SubmitHandler<ProfileDetailsFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="relative flex flex-1 gap-x-6 px-6 pb-6">
      <section className="sticky top-20 flex h-fit w-[40%] justify-center gap-10 rounded-xl bg-white py-10">
        <div className="relative">
          <Image
            src={"/images/phone-frame.svg"}
            width={307}
            height={631}
            alt="phone frame"
          />
          <div className="no-scrollbar absolute bottom-[53.5px] left-[34.5px] right-[35.5px] top-[63.5px] flex w-[237px] flex-col items-center justify-between gap-y-14 overflow-auto">
            <div className="flex w-full flex-col items-center">
              <MobileSimImage skeleton className={`mb-[25px] size-24`} />
              <MobileSimName skeleton className={`mb-[13px]`} />
              <MobileSimEmail skeleton />
            </div>
            <div className="flex w-full flex-col gap-y-5">
              {fields
                .filter((field) => field.platform) // Only include fields with a selected platform
                .slice(0, 5) // Limit to 5 items
                .map((field, index) => {
                  const platform = platformOptions.find(
                    (o) => o.value === field.platform,
                  );
                  return (
                    <MobileSimLink
                      key={index}
                      title={platform?.label}
                      color={platform?.color}
                      icon={platform?.icon}
                      href={field.link}
                    />
                  );
                })}
              {Array.from({
                length: 5 - fields.filter((field) => field.platform).length,
              }).map((_, index) => (
                <MobileSimLink key={`skeleton-${index}`} skeleton />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-[60%] rounded-xl bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col"
        >
          <div className="flex flex-grow flex-col justify-between gap-y-10 p-10">
            <div>
              <p className="heading-m mb-2 text-grey-dark">Profile Details</p>
              <p className="body-m text-grey">
                Add your details to create a personal touch to your profile.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-y-6">
              <div className="flex items-center gap-x-4 p-5">
                <label className="body-m w-full max-w-[240px] text-grey">
                  Profile picture
                </label>
                <div className="flex items-center gap-6">
                  {/* Upload buton */}
                  <Button className="flex !size-[193px] shrink-0 flex-col items-center justify-center gap-y-2 rounded-xl !border-none !bg-[#EFEBFF]">
                    <ImageIcon className="size-10 text-primary" />
                    <span className="heading-s text-base font-semibold text-primary">
                      + Upload Image
                    </span>
                  </Button>
                  <div className="body-s text-xs text-grey">
                    <p>Image must be below 1024x1024px.</p>
                    <p>Use PNG or JPG format.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-3 p-5">
                <div className="flex items-center gap-x-4">
                  <label className="body-m w-full max-w-[240px] text-grey">
                    First name*
                  </label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <Input
                        name="firstName"
                        value={value}
                        onChange={onChange}
                        error={error?.message || undefined}
                        className="body-m"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D9D9D9] px-10 py-6">
            <Button
              htmlType="submit"
              type="primary"
              disabled={false}
              className="heading-s float-right !h-auto !rounded-lg !px-[27px] !py-[11px] disabled:!bg-[#633CFF40] disabled:!text-white"
            >
              Save
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Settings;
