"use client";

import {
  SignOutIcon,
  LinkIcon,
  UserCircleIcon,
  EyeIcon,
} from "@phosphor-icons/react";
import Logo from "../shared/logo";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app, db } from "@/app/firebase";
import useAppRouter from "@/app/hooks/useAppRouter";
import { useTokens } from "@/app/context/tokens";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

const Navbar = () => {
  const tokens = useTokens();
  const pathname = usePathname();
  const router = useAppRouter();

  // State to hold the preferred routing identifier (username or UID)
  const [profileId, setProfileId] = useState<string>("");

  useEffect(() => {
    const uid = tokens?.decodedToken.uid;
    if (!uid) return;

    // Listen to user document changes to get the latest username
    const userDocRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // Priority: Use username if it exists, otherwise fallback to UID
        setProfileId(data.username || uid);
      } else {
        setProfileId(uid);
      }
    });

    return () => unsubscribe();
  }, [tokens?.decodedToken.uid]);

  const navLinks = [
    {
      title: "Links",
      href: "/",
      icon: <LinkIcon size={20} weight="bold" />,
    },
    {
      title: "Profile Details",
      href: "/profile-details",
      icon: <UserCircleIcon size={20} weight="bold" />,
    },
  ];

  const handleLogout = async () => {
    await signOut(getAuth(app));
    await fetch("/api/logout");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-10 bg-grey-light sm:p-6">
      <div className="flex items-center justify-between rounded-xl bg-white p-4 pl-6">
        <Logo
          variant="small"
          textClassName="hidden sm:block"
          iconClassName="mr-0 min-[440px]:mr-12 sm:mr-0"
        />
        <div className="flex items-center lg:gap-x-4">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={i}
                href={link.href}
                className={`heading-s flex h-[42px] items-center gap-x-2 px-[27px] py-[11px] duration-200 ease-in hover:text-primary sm:h-[46px] ${
                  isActive
                    ? "rounded-lg bg-primary-light text-primary"
                    : "text-grey"
                }`}
              >
                <span>{link.icon}</span>
                <span className="hidden md:block">{link.title}</span>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <Link
            // Use the profileId (username or UID) dynamically
            href={`/u/${profileId || tokens?.decodedToken.uid || ""}`}
            className="heading-s flex h-[42px] items-center justify-center rounded-lg border border-primary px-4 py-[11px] font-semibold text-primary sm:h-[46px] sm:px-[27px] sm:py-[9px]"
          >
            <EyeIcon
              size={20}
              weight="bold"
              className="block text-primary sm:hidden"
            />
            <span className="hidden sm:block">Preview</span>
          </Link>
          <Button
            type="primary"
            className="!h-[42px] !w-[42px] !rounded-lg !px-3 sm:!h-[46px] sm:!w-[46px] sm:!px-3.5"
            onClick={handleLogout}
          >
            <SignOutIcon size={24} weight="bold" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
