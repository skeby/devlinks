"use client";

import { useTokens } from "@/app/context/tokens";
import {
  Button,
  GetProp,
  message,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
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
import { RcFile } from "antd/es/upload";
import { useState } from "react";

const ProfileDetailsSchema = z.object({
  profilePicture: z.string().optional(),
  firstName: z.string().min(1, { message: "Can't be empty" }),
  lastName: z.string().min(1, { message: "Can't be empty" }),
  email: z.string().optional(),
});

type ProfileDetailsFields = z.infer<typeof ProfileDetailsSchema>;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Settings = () => {
  const tokens = useTokens();
  const { control, handleSubmit, watch, setValue } =
    useForm<ProfileDetailsFields>({
      resolver: zodResolver(ProfileDetailsSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
      },
    });
  const profilePicture = watch("profilePicture");

  const fields = [] as any[];

  const onSubmit: SubmitHandler<ProfileDetailsFields> = (data) => {
    console.log(data);
  };

  const onImagePreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    if (typeof window !== "undefined") {
      const image = new window.Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    }
  };

  const beforeImageUpload = async (
    file: RcFile,
    fileList: RcFile[],
  ): Promise<void | boolean | string | Blob | File> => {
    const maxSize = 2.5 * 1024 * 1024; // 2.5 MB in bytes
    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(file.type)) {
      message.error("Only PNG or JPEG images are allowed");
      return false;
    }

    if (file.size > maxSize) {
      message.error("Maximum allowed image size is 2.5mb");
      return false;
    }

    // Check image dimensions
    const isValidDimensions = await new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          console.log(`${img.width}x${img.height}`);
          resolve(true);

          // if (img.width > 1024 || img.height > 1024) {
          //   message.error("Image must be below 1024x1024px");
          //   resolve(false);
          // } else {
          //   resolve(true);
          // }
        };
        img.onerror = () => resolve(false);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

    if (isValidDimensions) {
      const blobUrl = URL.createObjectURL(file);
      setValue("profilePicture", blobUrl);
    }

    return isValidDimensions;
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
                  <ImgCrop
                    modalCancel="Go back"
                    modalOk="Continue"
                    rotationSlider
                  >
                    {/* TODO: Try to show a loader when image is uploading */}
                    <Upload
                      fileList={[
                        {
                          url: profilePicture,
                          name: "Profile picture",
                          uid: "profile-picture",
                        },
                      ]}
                      name="file"
                      accept="png,jpg,jpeg"
                      multiple={false}
                      // action={`${API_BASE_URL}${paths.upload}`}
                      onPreview={onImagePreview}
                      beforeUpload={beforeImageUpload}
                      // headers={{
                      //   Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                      // }}
                      showUploadList={false}
                      maxCount={1}
                    >
                      <Button className="relative !size-[193px] shrink-0 rounded-xl !border-none !bg-[#EFEBFF]">
                        {profilePicture && (
                          <>
                            <Image
                              alt="Profile picture"
                              src={profilePicture}
                              width={193}
                              height={193}
                              className="absolute inset-0 rounded-xl object-cover"
                            />
                            <div className="absolute inset-0 rounded-xl bg-black/50"></div>
                          </>
                        )}
                        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-y-2">
                          <ImageIcon
                            className={`size-10 ${profilePicture ? "text-white" : "text-primary"}`}
                          />
                          <span
                            className={`heading-s text-base font-semibold ${profilePicture ? "text-white" : "text-primary"}`}
                          >
                            + {profilePicture ? "Change" : "Upload"} Image
                          </span>
                        </div>
                      </Button>
                    </Upload>
                  </ImgCrop>
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
                        rootClassName="w-full"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-x-4">
                  <label className="body-m w-full max-w-[240px] text-grey">
                    Last name*
                  </label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <Input
                        name="lastName"
                        value={value}
                        onChange={onChange}
                        error={error?.message || undefined}
                        className="body-m"
                        rootClassName="w-full"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-x-4">
                  <label className="body-m w-full max-w-[240px] text-grey">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <Input
                        name="email"
                        value={value}
                        onChange={onChange}
                        error={error?.message || undefined}
                        className="body-m"
                        rootClassName="w-full"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D9D9D9] px-10 py-6">
            <Button
              loading={false}
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
