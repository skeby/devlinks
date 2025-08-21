"use client";

import { LinkIcon } from "@phosphor-icons/react";
import { Button, message } from "antd";
import Link from "next/link";
import React from "react";

const ProfileNavbar = ({ u }: { u: string }) => {
  const handleLinkShare = () => {
    navigator.clipboard.writeText(`${window.origin}/u/${u}`).then(() =>
      message.success({
        content: "The link has been copied to your clipboard!",
        icon: <LinkIcon size={20} weight="bold" className="text-grey" />,
      }),
    );
  };

  return (
    <nav className="sticky top-0 z-20 p-6">
      <div className="flex items-center justify-between rounded-xl bg-white p-4 pl-6 shadow-[0px_0px_12px_0px_#0000001A]">
        <Link href="/" className="">
          <Button className="heading-s !h-[46px] !rounded-lg border !border-primary px-[27px] py-[9px] !text-base !font-semibold !text-primary">
            Back to Editor
          </Button>
        </Link>
        <Button
          type="primary"
          className="heading-s !h-[46px] !rounded-lg !border-none !bg-primary px-[27px] py-[9px] !text-base !font-semibold !text-white"
          onClick={() => handleLinkShare()}
        >
          Share Link
        </Button>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
