"use client";

import Logo from "../shared/logo";
import { Link as ILink, UserCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
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
  return (
    <nav className="p-6">
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
        <Link
          href={"/preview"}
          className="heading-s text-primary py-[11px] px-[27px] rounded-lg border border-primary"
        >
          Preview
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
