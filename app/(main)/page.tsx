"use client";

import LinkField from "@/app/components/shared/link-field";
import { useTokens } from "@/app/context/tokens";
import { Button, message } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import MobileSimEmail from "../components/shared/mobile-sim/mobile-sim-email";
import MobileSimImage from "../components/shared/mobile-sim/mobile-sim-image";
import MobileSimLink from "../components/shared/mobile-sim/mobile-sim-link";
import MobileSimName from "../components/shared/mobile-sim/mobile-sim-name";
import { platformOptions } from "../static";

const LinkFieldsSchema = z.object({
  fields: z
    .object({
      platform: z.string().min(1, { message: "Can't be empty" }),
      link: z.string().min(1, { message: "Can't be empty" }),
    })
    .array(),
});

export type LinkFields = z.infer<typeof LinkFieldsSchema>;

const Links = () => {
  const tokens = useTokens();
  const { control, handleSubmit, watch } = useForm<LinkFields>({
    resolver: zodResolver(LinkFieldsSchema),
    defaultValues: {
      fields: [],
    },
  });

  const { fields, append, remove } = useFieldArray<LinkFields>({
    control,
    name: "fields",
  });

  const watchedFields = watch("fields");

  const onSubmit: SubmitHandler<LinkFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex relative gap-x-6 px-6 flex-1 pb-6">
      <section className="bg-white sticky top-20 h-fit rounded-xl w-[40%] flex justify-center gap-10 py-10">
        <div className="relative">
          <Image
            src={"/images/phone-frame.svg"}
            width={307}
            height={631}
            alt="phone frame"
          />
          <div className="w-[237px] absolute top-[63.5px] bottom-[53.5px] left-[34.5px] right-[35.5px] flex flex-col justify-between items-center gap-y-14 no-scrollbar overflow-auto">
            <div className="flex items-center flex-col w-full">
              <MobileSimImage skeleton className={`mb-[25px] size-24`} />
              <MobileSimName skeleton className={`mb-[13px]`} />
              <MobileSimEmail skeleton />
            </div>
            <div className="flex flex-col gap-y-5 w-full">
              {watchedFields
                .filter((field) => field.platform) // Only include fields with a selected platform
                .slice(0, 5) // Limit to 5 items
                .map((field, index) => {
                  const platform = platformOptions.find(
                    (o) => o.value === field.platform
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
                length:
                  5 - watchedFields.filter((field) => field.platform).length,
              }).map((_, index) => (
                <MobileSimLink key={`skeleton-${index}`} skeleton />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl w-[60%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col"
        >
          <div className="p-10 flex-grow flex flex-col gap-y-10 justify-between">
            <div>
              <p className="mb-2 heading-m text-grey-dark">
                Customize your links
              </p>
              <p className="body-m text-grey">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>
            </div>
            <div className="flex flex-col gap-y-6 flex-1">
              <Button
                className="heading-s !text-primary !h-auto !py-[11px] !px-[27px] !border-primary hover:!bg-primary-light hover:!border-primary hover:!text-primary"
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
              <div className="h-full overflow-auto flex flex-col gap-y-6">
                {fields.length === 0 ? (
                  <div className="h-full rounded-xl bg-grey-light px-5 py-[62.5px] flex justify-center items-center flex-col">
                    <Image
                      alt="get started image"
                      width={250}
                      height={160}
                      src={"/images/links-get-started.svg"}
                    />
                    <div className="text-center">
                      <p className="mb-6 heading-m text-grey-dark">
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
                        control={control}
                        onRemove={() => remove(index)}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="py-6 px-10 border-t border-[#D9D9D9]">
            <Button
              htmlType="submit"
              type="primary"
              disabled={true}
              className="float-right !h-auto !py-[11px] !px-[27px] heading-s !rounded-lg disabled:!bg-[#633CFF40] disabled:!text-white"
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
