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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import MobileSimEmail from "@/app/components/shared/mobile-sim/mobile-sim-email";
import MobileSimImage from "@/app/components/shared/mobile-sim/mobile-sim-image";
import MobileSimLink from "@/app/components/shared/mobile-sim/mobile-sim-link";
import MobileSimName from "@/app/components/shared/mobile-sim/mobile-sim-name";
import { platformOptions } from "@/app/static";
import Input from "@/app/components/shared/input";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { LinkFields } from "../page";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db, storage } from "@/app/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FloppyDiskIcon from "@/app/assets/icons/floppy-disk.svg";

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
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");

  const [fields, setFields] = useState<LinkFields["fields"]>([]);
  const [newProfileFile, setNewProfileFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        const unsubscribeDoc = onSnapshot(userDocRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            const firestoreLinks = data.links || [];

            // Only reset if values are different
            if (JSON.stringify(firestoreLinks) !== JSON.stringify(fields)) {
              setFields(firestoreLinks);
            }

            // load profile picture & form values
            setValue("profilePicture", data.profilePicture || "");
            setValue("firstName", data.firstName || "");
            setValue("lastName", data.lastName || "");
            setValue("email", data.email || "");
          }
        });

        return () => unsubscribeDoc();
      }
    });

    return () => unsubscribeAuth();
  }, [setValue]);

  const onSubmit: SubmitHandler<ProfileDetailsFields> = async (data) => {
    const decodedToken = tokens?.decodedToken;
    if (!decodedToken) return;
    setLoading(true);

    try {
      let photoURL = data.profilePicture;

      // 👇 Only upload if a new file is picked
      if (newProfileFile) {
        // ✅ Always overwrite the same path, so old pic is replaced
        const storageRef = ref(
          storage,
          `users/${decodedToken.uid}/profile.jpg`,
        );

        // Upload (overwrite if already exists)
        await uploadBytes(storageRef, newProfileFile);

        // Get fresh download URL
        photoURL = await getDownloadURL(storageRef);
      }

      // ✅ Update Firestore
      const userDocRef = doc(db, "users", decodedToken.uid);
      await updateDoc(userDocRef, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        profilePicture: photoURL || null,
      });

      message.success({
        content: "Your changes have been successfully saved!",
        icon: <FloppyDiskIcon />,
      });
      setNewProfileFile(null); // reset temp file
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
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
          if (img.width / img.height !== 1) {
            message.error("Image must be aspect ratio 1:1");
            resolve(false);
          } else {
            resolve(true);
          }
        };
        img.onerror = () => resolve(false);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

    if (isValidDimensions) {
      const blobUrl = URL.createObjectURL(file);
      setValue("profilePicture", blobUrl);
      setNewProfileFile(file); // store file for later upload
    }

    return false;
  };

  return (
    <div className="relative flex flex-1 gap-x-6 p-4 sm:p-6 sm:pt-0">
      <section className="sticky top-[126px] hidden h-fit w-[40%] justify-center gap-10 rounded-xl bg-white py-10 lg:flex">
        <div className="relative">
          <Image
            priority
            src={"/images/phone-frame.svg"}
            width={307}
            height={631}
            alt="phone frame"
          />
          <div className="no-scrollbar absolute bottom-[53.5px] left-[34.5px] right-[35.5px] top-[63.5px] flex w-[237px] flex-col items-center justify-between gap-y-14 overflow-y-auto">
            <div className="flex w-full flex-col items-center">
              <MobileSimImage
                skeleton={!profilePicture}
                src={profilePicture}
                className={`mb-[25px]`}
              />
              <MobileSimName
                skeleton={!firstName || !lastName}
                name={`${firstName || ""} ${lastName || ""}`}
                className={`mb-[13px]`}
              />
              <MobileSimEmail skeleton={!email} name={email} />
            </div>
            <div className="flex w-full flex-col gap-y-5">
              {fields
                .filter((field) => field.platform) // only include filled links
                .map((field, index) => (
                  <MobileSimLink
                    key={index}
                    href={field.link}
                    platform={field.platform}
                  />
                ))}
              {fields.filter((field) => field.platform).length < 5 &&
                Array.from({
                  length: 5 - fields.filter((field) => field.platform).length,
                }).map((_, index) => (
                  <MobileSimLink key={`skeleton-${index}`} skeleton />
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full rounded-xl bg-white lg:w-[60%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col"
        >
          <div className="flex flex-grow flex-col justify-between gap-y-10 p-6 sm:p-10">
            <div>
              <p className="heading-m mb-2 text-2xl text-grey-dark sm:text-[32px]">
                Profile Details
              </p>
              <p className="body-m text-grey">
                Add your details to create a personal touch to your profile.
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-y-6">
              <div className="flex flex-col gap-4 rounded-xl bg-grey-light p-5 sm:flex-row sm:items-center">
                <label className="body-m w-full shrink-0 text-grey sm:w-[180px] md:w-[240px]">
                  Profile picture
                </label>
                <div className="flex flex-col gap-6">
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
                              priority
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
                  <p className="body-s text-wrap text-xs text-grey">
                    Image must be below 1024x1024px. Use PNG or JPG format.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-3 rounded-xl bg-grey-light p-5">
                <div className="flex items-center gap-x-4">
                  <label className="body-m hidden w-full text-grey sm:block sm:max-w-[180px] md:max-w-[240px]">
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
                        label="First name*"
                        value={value}
                        onChange={onChange}
                        error={error?.message || undefined}
                        className="body-m"
                        rootClassName="w-full"
                        labelClassName="sm:hidden block"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-x-4">
                  <label className="body-m hidden w-full text-grey sm:block sm:max-w-[180px] md:max-w-[240px]">
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
                        label="Last name*"
                        value={value}
                        onChange={onChange}
                        error={error?.message || undefined}
                        className="body-m"
                        rootClassName="w-full"
                        labelClassName="sm:hidden block"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-x-4">
                  <label className="body-m hidden w-full text-grey sm:block sm:max-w-[180px] md:max-w-[240px]">
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
                        disabled
                        name="email"
                        label="Email"
                        value={value}
                        onChange={onChange}
                        error={error?.message || undefined}
                        className="body-m"
                        rootClassName="w-full"
                        labelClassName="sm:hidden block"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D9D9D9] p-4 sm:px-10 sm:py-6">
            <Button
              loading={loading}
              htmlType="submit"
              type="primary"
              disabled={false}
              className="heading-s !h-auto !w-full !rounded-lg !px-[27px] !py-[11px] disabled:!bg-[#633CFF40] disabled:!text-white sm:float-right sm:!w-auto"
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
