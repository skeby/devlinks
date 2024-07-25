"use client";

import { SignOut } from "@phosphor-icons/react";
import Logo from "../shared/logo";
import { Link as ILink, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/app/lib/antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/app/firebase";
import useAppRouter from "@/app/hooks/useAppRouter";

const Navbar = () => {
  const pathname = usePathname();
  const router = useAppRouter();

  const navLinks = [
    {
      title: "Links",
      href: "/links",
      icon: <ILink size={16} weight="bold" />,
    },
    {
      title: "Profile Details",
      href: "/profile",
      icon: <UserCircle size={16} weight="bold" />,
    },
  ];

  const handleLogout = async () => {
    await signOut(getAuth(app));
    await fetch("/api/logout");
    router.push("/login");
  };

  return (
    <nav className="p-6 sticky top-0 z-10">
      <div className="bg-white rounded-xl p-4 pl-6 flex items-center justify-between">
        <Logo variant="small" />
        <div className="flex items-center gap-x-4">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={i}
                {...link}
                className={`py-[11px] px-[27px] heading-s flex items-center gap-x-2 ${
                  isActive
                    ? "bg-primary-light rounded-lg text-primary"
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
            href={"/preview"}
            className="heading-s text-primary py-[11px] px-[27px] rounded-lg border border-primary"
          >
            Preview
          </Link>
          <Button
            type="primary"
            className="h-12 w-12 px-3.5 rounded-lg"
            onClick={handleLogout}
          >
            <SignOut size={24} weight="bold" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
