"use client";

import LinkField from "@/app/components/shared/link-field";
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
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
  snapCenterToCursor,
} from "@dnd-kit/modifiers";
import FloppyDiskIcon from "@/app/assets/icons/floppy-disk.svg";
import nprogress from "nprogress";

const LinkFieldsSchema = z
  .object({
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
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>();
    data.fields.forEach((field, index) => {
      const key = `${field.platform}-${field.link}`;
      if (seen.has(key)) {
        ctx.addIssue({
          code: "custom",
          message: "You've already added this link",
          path: ["fields", index, "link"], // highlight the link field
        });
      } else {
        seen.add(key);
      }
    });
  });

export type LinkFields = z.infer<typeof LinkFieldsSchema>;

const Links = () => {
  const form = useForm<LinkFields>({
    resolver: zodResolver(LinkFieldsSchema),
    defaultValues: {
      fields: [],
    },
    shouldFocusError: true,
  });

  const { control, handleSubmit, watch, reset, getValues } = form;

  const [isSavePending, setSavePending] = useState(false);

  useEffect(() => {
    nprogress.start();

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
            nprogress.done();
          }
        });

        return () => {
          unsubscribeDoc();
          nprogress.done();
        };
      }
    });

    return () => {
      unsubscribeAuth();
      nprogress.done();
    };
  }, [reset, getValues]);

  const { fields, prepend, remove, move } = useFieldArray<LinkFields>({
    control,
    name: "fields",
  });

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const watchedFields = watch("fields");

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over || active.id === over.id) {
      return;
    }
    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over?.id);
    move(oldIndex, newIndex);
  };

  const onSubmit: SubmitHandler<LinkFields> = async (data) => {
    setSavePending(true);
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
      setSavePending(false);
    } finally {
      setSavePending(false);
    }
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
              <MobileSimImage skeleton className={`mb-[25px]`} />
              <MobileSimName skeleton className={`mb-[13px]`} />
              <MobileSimEmail skeleton />
            </div>
            <div className="flex w-full flex-col gap-y-5">
              {watchedFields
                .filter((field) => field.platform) // only include filled links
                .map((field, index) => (
                  <MobileSimLink
                    key={index}
                    href={field.link}
                    platform={field.platform}
                  />
                ))}
              {watchedFields.filter((field) => field.platform).length < 5 &&
                Array.from({
                  length:
                    5 - watchedFields.filter((field) => field.platform).length,
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
                Customize your links
              </p>
              <p className="body-m text-grey">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-y-6">
              <Button
                className="heading-s !h-[46px] !border-primary !px-[27px] !py-[11px] !text-primary hover:!border-primary hover:!bg-primary-light hover:!text-primary"
                onClick={() => {
                  // if (fields.length === 5) {
                  //   message.error("You can only add up to 5 links.");
                  // } else {
                  prepend({ platform: "", link: "" });
                  message.success("New link added");
                  // }
                }}
              >
                + Add a new link
              </Button>
              <div className="flex h-full flex-col gap-y-6">
                {fields.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-6 rounded-xl bg-grey-light px-5 py-[46.5px] sm:gap-10 sm:py-[62.5px]">
                    <Image
                      alt="Get started image"
                      width={125}
                      height={80}
                      src={"/images/links-get-started.svg"}
                      className="sm:h-[160px] sm:w-[250px]"
                    />
                    <div className="text-center">
                      <p className="heading-m mb-6 text-2xl text-grey-dark sm:text-[32px]">
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
                  <DndContext
                    collisionDetection={closestCenter}
                    sensors={sensors}
                    onDragEnd={onDragEnd}
                    modifiers={[
                      restrictToVerticalAxis,
                      // restrictToParentElement,
                      // snapCenterToCursor,
                    ]}
                  >
                    <SortableContext
                      items={fields}
                      strategy={rectSortingStrategy}
                    >
                      {fields.map((field, index) => (
                        <LinkField
                          key={field.id}
                          index={index}
                          id={field.id}
                          platform={watchedFields[index].platform}
                          control={control}
                          onRemove={() => remove(index)}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-[#D9D9D9] p-4 sm:px-10 sm:py-6">
            <Button
              loading={isSavePending}
              htmlType="submit"
              type="primary"
              disabled={fields.length === 0}
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

export default Links;
