"use client";

import Footer from "@/app/components/layout/footer";
import LinkField from "@/app/components/shared/link-field";
import { useTokens } from "@/app/context/tokens";
import { Button } from "@/app/lib/antd";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
  const { control, handleSubmit } = useForm<LinkFields>({
    resolver: zodResolver(LinkFieldsSchema),
    defaultValues: {
      fields: [
        {
          platform: "facebook",
          link: "https://facebook.com",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray<LinkFields>({
    control,
    name: "fields",
  });

  const onSubmit: SubmitHandler<LinkFields> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <section className="p-10 flex-grow flex flex-col gap-y-10 justify-between">
        <div>
          <p className="mb-2 heading-m text-grey-dark">Customize your links</p>
          <p className="body-m text-grey">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>
        <div className="flex flex-col gap-y-6 flex-1">
          <Button
            className="heading-s text-primary h-auto py-[11px] px-[27px] border-primary hover:!bg-primary-light hover:!border-primary hover:!text-primary"
            onClick={() => append({ platform: "", link: "" })}
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
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them.
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
                    platform={field.platform}
                    link={field.link}
                    control={control}
                    onRemove={() => remove(index)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </section>
      <Footer buttonEnabled={false} />
    </form>
  );
};

export default Links;
