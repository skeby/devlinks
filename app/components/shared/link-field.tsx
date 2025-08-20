import Image from "next/image";
import Input from "./input";
import { LinkIcon } from "@phosphor-icons/react";
import Select from "./select";
import { Control, Controller } from "react-hook-form";
import { LinkFields } from "@/app/(main)/page";
import { ConfigProvider } from "antd";
import { platformOptions } from "@/app/static";

interface Props {
  index: number;
  platform: string;
  control: Control<LinkFields, any>;
  onRemove: () => void;
}

const PlatformOptionLabel = ({
  text,
  icon: IconComponent,
}: {
  text: string;
  icon: any;
}) => (
  <div className="flex h-6 items-center gap-x-3">
    <IconComponent className="text-grey" />
    <span className="">{text}</span>
  </div>
);

const LinkField = ({ control, index, onRemove, platform }: Props) => {
  const platformOption = platformOptions.find(
    (option) => option.value === platform,
  );
  return (
    <div className="flex flex-col gap-y-3 rounded-xl bg-grey-light p-5">
      <div className="flex items-center justify-between text-grey">
        <div className="flex items-center gap-x-2">
          <Image
            width={12}
            height={6}
            src="/icons/drag-handle.svg"
            alt="drag handle"
            className="my-[9px] cursor-move"
          />
          <p className="font-bold leading-6">Link #{index + 1}</p>
        </div>
        <p className="body-m cursor-pointer" onClick={onRemove}>
          Remove
        </p>
      </div>
      <ConfigProvider
        theme={{
          token: { fontSize: 16 },
          components: {
            Select: {
              optionActiveBg: "none",
              optionSelectedColor: "#633CFF",
              optionSelectedBg: "transparent",
            },
          },
        }}
      >
        {/* TODO: Make the design of the options rendered pixel perfect */}
        <Controller
          control={control}
          name={`fields.${index}.platform`}
          // rules={{
          //   validate: (value) => validateLink(value),
          // }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              value={value}
              onChange={onChange}
              error={error?.message || undefined}
              label="Platform"
              options={platformOptions.map((option) => ({
                label: (
                  <PlatformOptionLabel text={option.label} icon={option.icon} />
                ),
                value: option.value,
              }))}
              className="!text-base"
              rootClassName="!text-base"
            />
          )}
        />
      </ConfigProvider>
      <Controller
        control={control}
        name={`fields.${index}.link`}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <Input
              name="link"
              value={value}
              onChange={onChange}
              error={error?.message || undefined}
              prefix={
                <LinkIcon size={16} weight="bold" className="text-grey-dark" />
              }
              label="Link"
              className="body-m"
            />
            {/* {error?.message && (
              <p className="text-xs text-grey mt-1">
                Hint: {platformOption?.hint}
              </p>
            )} */}
          </div>
        )}
      />
    </div>
  );
};

export default LinkField;
