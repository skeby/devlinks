import Image from "next/image";
import Input from "./input";
import { Link } from "@phosphor-icons/react/dist/ssr";
import Select from "./select";
import { Control, Controller } from "react-hook-form";
import { LinkFields } from "@/app/(main)/links/page";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";

interface Props {
  index: number;
  platform: string;
  link: string;
  control: Control<LinkFields, any>;
  onRemove: () => void;
}

const PlatformOptionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-x-3 h-6">
    <Image
      width={16}
      height={16}
      src={`/icons/${text.toLowerCase().replaceAll(" ", "-")}.svg`}
      alt={`${text.toLowerCase()} icon`}
      className=""
    />
    <span className="">{text}</span>
  </div>
);

const LinkField = ({ platform, control, link, index, onRemove }: Props) => {
  const platformOptions = [
    {
      label: <PlatformOptionLabel text="GitHub" />,
      value: "github",
    },
    {
      label: <PlatformOptionLabel text="Frontend Mentor" />,
      value: "frontend-mentor",
    },
    {
      label: <PlatformOptionLabel text="Twitter" />,
      value: "twitter",
    },
    {
      label: <PlatformOptionLabel text="LinkedIn" />,
      value: "linkedin",
    },
    {
      label: <PlatformOptionLabel text="YouTube" />,
      value: "youtube",
    },
    {
      label: <PlatformOptionLabel text="Facebook" />,
      value: "Facebook",
    },
    {
      label: <PlatformOptionLabel text="Twitch" />,
      value: "Twitch",
    },
    {
      label: <PlatformOptionLabel text="Dev.to" />,
      value: "Dev.to",
    },
    {
      label: <PlatformOptionLabel text="Codewars" />,
      value: "Codewars",
    },
    {
      label: <PlatformOptionLabel text="Codepen" />,
      value: "Codepen",
    },
    {
      label: <PlatformOptionLabel text="freeCodeCamp" />,
      value: "freeCodeCamp",
    },
    {
      label: <PlatformOptionLabel text="GitLab" />,
      value: "GitLab",
    },
    {
      label: <PlatformOptionLabel text="Hashnode" />,
      value: "Hashnode",
    },
    {
      label: <PlatformOptionLabel text="Stack Overflow" />,
      value: "stack-overflow",
    },
  ];
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
        <Select
          label="Platform"
          options={platformOptions}
          className="!text-base"
          rootClassName="!text-base"
          // optionRender={({ label }) => <div>{label}</div>}
          // optionLabelProp="sa"
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
