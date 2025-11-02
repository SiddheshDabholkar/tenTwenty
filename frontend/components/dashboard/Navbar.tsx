"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

const Navbar = () => {
  const { removeUser, user, isFetching } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isFetching) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isFetching]);

  return (
    <div className={cn("mx-auto px-2 container flex-col flex relative mt-4")}>
      <header className="w-full flex flex-row items-center justify-between">
        <h1 className="font-extrabold text-[1.5rem] flex flex-row items-center gap-2">
          <Link href="/dashboard">Contests</Link>
          <div className="flex flex-row items-center gap-2 bg-blue-100 p-1 rounded-lg">
            <Badge>{user?.role}</Badge>
            <p className="text-gray text-[0.75rem]">{user?.email}</p>
          </div>
        </h1>
        <div className="flex flex-row items-center gap-2">
          <Button variant="outline" onClick={removeUser}>
            <LogOut />
            Logout
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
