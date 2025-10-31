"use client";

import QuickActions from "@/components/dashboard/QuickActions";
import YourContests from "@/components/dashboard/YourContests";
import { useUser } from "@/hooks/useUser";
import { getUserFullName } from "@/lib/common";
import React from "react";

const Dashboard = () => {
  const { user, isFetching } = useUser();

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
      <QuickActions />
    </div>
  );
};

export default Dashboard;
