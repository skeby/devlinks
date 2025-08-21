"use client";

import LinkField from "@/app/components/shared/link-field";
import { useTokens } from "@/app/context/tokens";
import { Button, message } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import MobileSimEmail from "../components/shared/mobile-sim/mobile-sim-email";
import MobileSimImage from "../components/shared/mobile-sim/mobile-sim-image";
import MobileSimLink from "../components/shared/mobile-sim/mobile-sim-link";
import MobileSimName from "../components/shared/mobile-sim/mobile-sim-name";
import { platformOptions } from "../static";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../firebase";
import { FirebaseError } from "firebase/app";
import FloppyDiskIcon from "../../public/icons/floppy-disk.svg";

const LinkFieldsSchema = z.object({
  fields: z
    .object({
      platform: z.string().min(1, { message: "Can't be empty" }),
      link: z.string().min(1, { message: "Can't be empty" }),
    })
    .refine(
      (field) =>
        platformOptions
          .find((option) => option.value === field.platform)
          ?.regex.test(field.link) || false,
      {
        message: "Please check the URL",
        path: ["link"],
      },
    )
    .array(),
});

export type LinkFields = z.infer<typeof LinkFieldsSchema>;

const Links = () => {
  const tokens = useTokens();
  const form = useForm<LinkFields>({
    resolver: zodResolver(LinkFieldsSchema),
    defaultValues: {
      fields: [],
    },
  });

  const { control, handleSubmit, watch, reset, getValues } = form;

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        const unsubscribeDoc = onSnapshot(userDocRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            const firestoreLinks = data.links || [];

            // Get current form state
            const currentLinks = getValues("fields");

            // Only reset if values are different
            if (
              JSON.stringify(firestoreLinks) !== JSON.stringify(currentLinks)
            ) {
              reset({ fields: firestoreLinks });
            }
          }
        });

        return () => unsubscribeDoc();
      }
    });

    return () => unsubscribeAuth();
  }, [reset, getValues]);

  const { fields, append, remove } = useFieldArray<LinkFields>({
    control,
    name: "fields",
  });

  const watchedFields = watch("fields");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LinkFields> = async (data) => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;

      if (!user) {
        message.error("User not logged in");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);

      await updateDoc(userDocRef, { links: data.fields });

      message.success({
        content: "Your changes have been successfully saved!",
        icon: <FloppyDiskIcon />,
      });
    } catch (e) {
      message.error("Failed to save links. Please try again.");
      if (e instanceof FirebaseError) {
        console.error(e.message);
      } else {
        console.error("Error saving links:", e);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-1 gap-x-6 px-6 pb-6">
      <section className="sticky top-20 flex h-fit w-[40%] justify-center gap-10 rounded-xl bg-white py-10">
        <div className="relative">
          <Image
            priority
            src={"/images/phone-frame.svg"}
            width={307}
            height={631}
            alt="phone frame"
          />
          <div className="no-scrollbar absolute bottom-[53.5px] left-[34.5px] right-[35.5px] top-[63.5px] flex w-[237px] flex-col items-center justify-between gap-y-14 overflow-auto">
            <div className="flex w-full flex-col items-center">
              <MobileSimImage skeleton className={`mb-[25px]`} />
              <MobileSimName skeleton className={`mb-[13px]`} />
              <MobileSimEmail skeleton />
            </div>
            <div className="flex w-full flex-col gap-y-5">
              {watchedFields
                .filter((field) => field.platform) // Only include fields with a selected platform
                .slice(0, 5) // Limit to 5 items
                .map((field, index) => (
                  <MobileSimLink
                    key={index}
                    href={field.link}
                    platform={field.platform}
                  />
                ))}
              {Array.from({
                length:
                  5 - watchedFields.filter((field) => field.platform).length,
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
              <p className="heading-m mb-2 text-grey-dark">
                Customize your links
              </p>
              <p className="body-m text-grey">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-y-6">
              <Button
                className="heading-s !h-auto !border-primary !px-[27px] !py-[11px] !text-primary hover:!border-primary hover:!bg-primary-light hover:!text-primary"
                onClick={() => {
                  if (fields.length === 5) {
                    message.error("You can only add up to 5 links.");
                  } else {
                    append({ platform: "", link: "" });
                  }
                }}
              >
                + Add a new link
              </Button>
              <div className="flex h-full flex-col gap-y-6 overflow-auto">
                {fields.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center rounded-xl bg-grey-light px-5 py-[62.5px]">
                    <Image
                      alt="get started image"
                      width={250}
                      height={160}
                      src={"/images/links-get-started.svg"}
                    />
                    <div className="text-center">
                      <p className="heading-m mb-6 text-grey-dark">
                        Let&apos;s get you started
                      </p>
                      <p className="body-m text-grey">
                        Use the “Add new link” button to get started. Once you
                        have more than one link, you can reorder and edit them.
                        We&apos;re here to help you share your profiles with
                        everyone!
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {fields.map((field, index) => (
                      <LinkField
                        index={index}
                        key={field.id}
                        platform={watchedFields[index].platform}
                        control={control}
                        onRemove={() => remove(index)}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-[#D9D9D9] px-10 py-6">
            <Button
              loading={loading}
              htmlType="submit"
              type="primary"
              disabled={loading}
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

export default Links;
