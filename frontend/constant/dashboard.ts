import { ShieldQuestionMark, Trophy, Gamepad2 } from "lucide-react";

const quickActionsList = [
  {
    id: 1,
    name: "Contests",
    href: "/dashboard/contests",
    icon: Gamepad2,
  },
  {
    id: 2,
    name: "Questions",
    href: "/dashboard/questions",
    icon: ShieldQuestionMark,
  },
  {
    id: 3,
    name: "Prizes",
    href: "/dashboard/prizes",
    icon: Trophy,
  },
];

export { quickActionsList };
