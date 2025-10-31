import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type TabProps = React.FC<{
  href: string;
  name: string;
  isActive: boolean;
  className?: string;
}>;

const Tab: TabProps = ({ href, isActive, name, className }) => {
  return (
    <Link
      key={name}
      href={href}
      className={cn(
        "whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium transition-colors",
        isActive
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground  hover:text-foreground",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {name}
    </Link>
  );
};

export default Tab;
