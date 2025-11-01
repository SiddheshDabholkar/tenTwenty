import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ContestType } from "@/types/schemas";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type ContestCardProps = React.FC<{
  data: ContestType;
  isAdmin: boolean;
}>;
const ContestCard: ContestCardProps = ({ data, isAdmin }) => {
  return (
    <Link href={`/dashboard/contests/edit/${data._id}`}>
      <Card className="w-full flex flex-row  items-center p-4 gap-4 shadow-none">
        <span className="bg-blue-100 p-3 h-12 w-12 rounded-full">
          <Gamepad2 />
        </span>
        <div className="flex flex-col">
          <CardTitle className="mb-2">{data.name}</CardTitle>
          <CardDescription className="mt-0 line-clamp-2">
            {data.description}
          </CardDescription>
          <div className="flex flex-row gap-2 mt-2">
            <Link href={`/dashboard/contests/leaderboard/${data._id}`}>
              <Button variant="secondary">View Leaderboard</Button>
            </Link>
            {isAdmin && (
              <Link href={`/dashboard/contests/edit/${data._id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
            )}

            <Link href={`/dashboard/contests/details/${data._id}`}>
              <Button variant="secondary">Join</Button>
            </Link>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ContestCard;
