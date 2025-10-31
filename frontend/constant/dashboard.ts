import { ShieldQuestionMark, Trophy, Gamepad2 } from "lucide-react";

const quickActionsList = [
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

export { quickActionsList };
