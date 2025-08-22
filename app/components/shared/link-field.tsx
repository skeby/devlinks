import Image from "next/image";
import Input from "./input";
import { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { LinkIcon } from "@phosphor-icons/react";
import Select from "./select";
import { Control, Controller } from "react-hook-form";
import { LinkFields } from "@/app/(main)/page";
import { ConfigProvider } from "antd";
import { platformOptions } from "@/app/static";

interface Props {
  id: string;
  index: number;
  platform: string;
  control: Control<LinkFields, any>;
  onRemove: () => void;
}

const PlatformOptionLabel = ({
  label,
  icon: IconComponent,
}: {
  label: string;
  icon: any;
}) => {
  return (
    <div className="flex h-6 items-center gap-x-3">
      {typeof IconComponent === "object" ? (
        <Image
          alt={`${label} icon`}
          src={IconComponent.src}
          width={IconComponent.width}
          height={IconComponent.height}
          className="text-grey"
        />
      ) : (
        <IconComponent className="text-grey" />
      )}
      <span className="">{label}</span>
    </div>
  );
};

const LinkField = ({ control, index, id, onRemove, platform }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id });
  const style: CSSProperties = {
    transition,
    transform: isDragging
      ? `${CSS.Transform.toString(transform)} scale(1.01)`
      : CSS.Transform.toString(transform),
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      key={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex flex-col gap-y-3 rounded-xl bg-grey-light p-5"
    >
      <div className="flex items-center justify-between text-grey">
        <div className="flex items-center gap-x-2">
          <button {...listeners} className="cursor-move px-2 py-[9px]">
            <Image
              width={12}
              height={6}
              src="/icons/drag-handle.svg"
              alt="drag handle"
            />
          </button>
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
                  <PlatformOptionLabel
                    label={option.label}
                    icon={option.icon}
                  />
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
              placeholder={
                platformOptions.find((option) => option.value === platform)
                  ?.hint || ""
              }
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
