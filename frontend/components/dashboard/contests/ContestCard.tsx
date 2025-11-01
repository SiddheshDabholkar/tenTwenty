import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ContestType } from "@/types/schemas";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type ContestCardProps = React.FC<{
  data: ContestType;
}>;
const ContestCard: ContestCardProps = ({ data }) => {
  return (
    <Link href={`/dashboard/contests/edit/${data._id}`}>
      <Card className="w-full flex flex-row  items-center p-4 gap-4 shadow-none">
        <span className="bg-blue-100 p-3 h-12 w-12 rounded-full">
          <Gamepad2 />
        </span>
        <div>
          <CardTitle className="mb-2">{data.name}</CardTitle>
          <CardDescription className="mt-0 line-clamp-2">
            {data.description}
          </CardDescription>
          <Link href={`/dashboard/contests/leaderboard/${data._id}`}>
            <Button>View Leaderboard</Button>
          </Link>
        </div>
      </Card>
    </Link>
  );
};

export default ContestCard;
