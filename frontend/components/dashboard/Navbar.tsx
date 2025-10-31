"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

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
        <h1 className="font-extrabold text-[1.5rem]">
          <Link href="/dashboard">Contests</Link>
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
