import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { quickActionsList } from "@/constant/dashboard";

const QuickActions = () => {
  return (
    <div className="mt-6">
      <h4 className="scroll-m-20 text-[0.85rem] font-semibold tracking-tight">
        Quick Actions
      </h4>
      <div className="flex flex-row flex-wrap items-center gap-4 mt-2">
        {quickActionsList.map((m, i) => (
          <Link href={m.href} key={i}>
            <Card className="w-[250px] h-[100px] shadow-none">
              <CardHeader>
                <m.icon />
                <CardTitle className="text-[0.85rem]">{m.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
