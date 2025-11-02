"use client";

import ContestsWon from "@/components/dashboard/ContestsWon";
import QuickActions from "@/components/dashboard/QuickActions";
import { USER_ROLE } from "@/constant/enums";
import { useUser } from "@/hooks/useUser";
import { getUserFullName } from "@/lib/common";
import React from "react";

const Dashboard = () => {
  const { user, isFetching } = useUser();
  const isAdmin = user?.role === USER_ROLE.ADMIN;

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h4 className="scroll-m-20 text-[1rem] font-semibold tracking-tight">
        Hey {getUserFullName(user)} 👋
      </h4>
      <p className="leading-7 text-[0.85rem]">
        Let’s make today productive — here’s what’s happening on your dashboard.
      </p>
      <QuickActions isAdmin={isAdmin} />
      <ContestsWon />
    </div>
  );
};

export default Dashboard;
