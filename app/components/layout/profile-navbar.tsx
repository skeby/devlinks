"use client";

import { LinkIcon } from "@phosphor-icons/react";
import { Button, message } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../shared/logo";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/app/firebase";

const ProfileNavbar = ({ u }: { u: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLinkShare = () => {
    navigator.clipboard.writeText(`${window.origin}/u/${u}`).then(() =>
      message.success({
        content: "The link has been copied to your clipboard!",
        icon: <LinkIcon size={20} weight="bold" className="text-grey" />,
      }),
    );
  };

  return (
    <nav className="sticky top-0 z-20 p-0 sm:p-6">
      <div className="flex items-center justify-between gap-4 rounded-xl bg-white p-4 pl-6 shadow-none sm:shadow-[0px_0px_12px_0px_#0000001A]">
        {isLoading ? (
          <span />
        ) : user ? (
          <Link href="/" className="">
            <Button className="heading-s !h-[46px] !rounded-lg border !border-primary px-[27px] py-[9px] !text-base !font-semibold !text-primary">
              Back to Editor
            </Button>
          </Link>
        ) : (
          <Logo variant="small" />
        )}
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
