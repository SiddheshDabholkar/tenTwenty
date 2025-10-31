import { ShieldQuestionMark, Trophy, Gamepad2 } from "lucide-react";

const quickActionsList = [
  {
    id: 1,
    name: "Create Contest",
    href: "/dashboard/contests/create",
    icon: Gamepad2,
  },
  {
    id: 2,
    name: "Create Question",
    href: "/dashboard/question/create",
    icon: ShieldQuestionMark,
  },
  {
    id: 3,
    name: "Create Prize",
    href: "/dashboard/prize/create",
    icon: Trophy,
  },
];

export { quickActionsList };
