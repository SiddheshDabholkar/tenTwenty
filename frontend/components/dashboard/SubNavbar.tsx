"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Tab from "../Tab";
import { usePathname } from "next/navigation";

const lists = [
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
    name: "Prizes",
    href: "/dashboard/prizes",
  },
  {
    id: 4,
    name: "Questions",
    href: "/dashboard/questions",
  },
  {
    id: 5,
    name: "Users",
    href: "/dashboard/users",
  },
  {
    id: 6,
    name: "History",
    href: "/dashboard/history",
  },
];

const SubNavbar = () => {
  const path = usePathname();
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
