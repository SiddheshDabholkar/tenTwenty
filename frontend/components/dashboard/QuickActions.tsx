import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { ShieldQuestionMark, Trophy, Gamepad2 } from "lucide-react";

const adminList = [
  {
    id: 1,
    name: "Create Contest",
    href: "/dashboard/contests",
    icon: Gamepad2,
  },
  {
    id: 2,
    name: "Create Questions",
    href: "/dashboard/questions",
    icon: ShieldQuestionMark,
  },
  {
    id: 3,
    name: "Create Prizes",
    href: "/dashboard/prizes",
    icon: Trophy,
  },
];
const commonList = [
  {
    id: 11,
    name: "Join Contest",
    href: "/dashboard/contests",
    icon: Gamepad2,
  },
  {
    id: 12,
    name: "View History",
    href: "/dashboard/history",
    icon: Trophy,
  },
];

type QuickActionsProps = React.FC<{
  isAdmin: boolean;
}>;
const QuickActions: QuickActionsProps = ({ isAdmin }) => {
  const list = isAdmin ? [...adminList, ...commonList] : commonList;
  return (
    <div className="mt-6">
      <h4 className="scroll-m-20 text-[0.85rem] font-semibold tracking-tight">
        Quick Actions
      </h4>
      <div className="flex flex-row flex-wrap items-center gap-4 mt-2">
        {list.map((m, i) => (
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
