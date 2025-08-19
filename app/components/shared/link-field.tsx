import Image from "next/image";
import Input from "./input";
import { Link } from "@phosphor-icons/react/dist/ssr";
import Select from "./select";
import { Control, Controller } from "react-hook-form";
import { LinkFields } from "@/app/(main)/page";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { platformOptions } from "@/app/static";

interface Props {
  index: number;
  control: Control<LinkFields, any>;
  onRemove: () => void;
}

const PlatformOptionLabel = ({
  text,
  icon,
}: {
  text: string;
  icon: string;
}) => (
  <div className="flex items-center gap-x-3 h-6">
    <Image
      width={16}
      height={16}
      src={`/icons/${icon}`}
      alt={`${text.toLowerCase()} icon`}
      style={{
        color: "#737373",
        fill: "#737373",
      }}
      className=""
    />
    <span className="">{text}</span>
  </div>
);

const LinkField = ({ control, index, onRemove }: Props) => {
  return (
    <div className="rounded-xl p-5 bg-grey-light flex flex-col gap-y-3">
      <div className="flex items-center justify-between text-grey">
        <div className="flex items-center gap-x-2">
          <Image
            width={12}
            height={6}
            src="/icons/drag-handle.svg"
            alt="drag handle"
            className="cursor-move my-[9px]"
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
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onChange={onChange}
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
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChange={onChange}
            prefix={<Link size={16} weight="bold" className="text-grey-dark" />}
            label="Link"
            className="body-m text-grey-dark"
          />
        )}
      />
    </div>
  );
};

export default LinkField;
