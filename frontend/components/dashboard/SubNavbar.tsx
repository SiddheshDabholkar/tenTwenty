"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Tab from "../Tab";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { USER_ROLE } from "@/constant/enums";

const SubNavbar = () => {
  const { user } = useUser();
  const isAdmin = user?.role === USER_ROLE.ADMIN;
  const path = usePathname();

  const lists = (() => {
    const commonNavs = [
      {
        id: 1,
        name: "Overview",
        href: "/dashboard",
      },
      {
        id: 2,
        name: "Contests",
        href: "/dashboard/contests",
      },
      {
        id: 3,
        name: "History",
        href: "/dashboard/history",
      },
    ];
    const adminNavs = [
      {
        id: 4,
        name: "Prizes",
        href: "/dashboard/prizes",
      },
      {
        id: 5,
        name: "Questions",
        href: "/dashboard/questions",
      },
      {
        id: 6,
        name: "Users",
        href: "/dashboard/users",
      },
    ];
    const navs = [...commonNavs];
    if (isAdmin) {
      navs.push(...adminNavs);
    }
    return navs;
  })();
  const activeTab = lists.find((m) => m.href === path);

  return (
    <div
      className={cn("mx-auto px-2 container flex-col flex relative border-b")}
    >
      <header className="w-full flex flex-row items-center gap-5">
        {lists.map((m) => (
          <Tab
            key={m.id}
            name={m.name}
            href={m.href}
            isActive={activeTab?.id === m.id}
          />
        ))}
      </header>
    </div>
  );
};

export default SubNavbar;
