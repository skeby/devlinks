"use client";

import { SignOutIcon, LinkIcon, UserCircleIcon } from "@phosphor-icons/react";
import Logo from "../shared/logo";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/app/firebase";
import useAppRouter from "@/app/hooks/useAppRouter";
import { useTokens } from "@/app/context/tokens";

const Navbar = () => {
  const tokens = useTokens();
  const pathname = usePathname();
  const router = useAppRouter();

  const navLinks = [
    {
      title: "Links",
      href: "/",
      icon: <LinkIcon size={16} weight="bold" />,
    },
    {
      title: "Profile Details",
      href: "/profile-details",
      icon: <UserCircleIcon size={16} weight="bold" />,
    },
  ];

  const handleLogout = async () => {
    await signOut(getAuth(app));
    await fetch("/api/logout");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-10 p-6">
      <div className="flex items-center justify-between rounded-xl bg-white p-4 pl-6">
        <Logo variant="small" />
        <div className="flex items-center gap-x-4">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={i}
                {...link}
                className={`heading-s flex items-center gap-x-2 px-[27px] py-[11px] ${
                  isActive
                    ? "rounded-lg bg-primary-light text-primary"
                    : "text-grey"
                }`}
              >
                {link.icon}
                {link.title}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-x-4">
          <Link
            href={`/u/${tokens?.decodedToken.uid || ""}`}
            className="heading-s h-[46px] rounded-lg border border-primary px-[27px] py-[9px] font-semibold text-primary"
          >
            Preview
          </Link>
          <Button
            type="primary"
            className="!h-[46px] !w-[46px] !rounded-lg !bg-[#FF3939] !px-3.5"
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
