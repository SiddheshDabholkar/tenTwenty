import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PrizeType } from "@/types/schemas";
import { Trophy } from "lucide-react";
import Link from "next/link";
import React from "react";

type PrizeCardProps = React.FC<{
  data: PrizeType;
}>;
const PrizeCard: PrizeCardProps = ({ data }) => {
  return (
    <Link href={`/dashboard/prizes/edit/${data._id}`}>
      <Card className="w-full flex flex-row items-center p-4 gap-4 shadow-none">
        <span className="bg-blue-300 p-3 h-12 w-12 rounded-full">
          <Trophy />
        </span>
        <div>
          <CardTitle className="mb-2">{data.title}</CardTitle>
          <CardDescription className="mt-0 line-clamp-2">
            {data.description}
          </CardDescription>
        </div>
      </Card>
    </Link>
  );
};

export default PrizeCard;
