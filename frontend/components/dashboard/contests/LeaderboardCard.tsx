import { Card } from "@/components/ui/card";
import { getUserDetails, getUserFullName } from "@/lib/common";
import { timeTaken } from "@/lib/date";
import { SubmissionType } from "@/types/schemas";
import React from "react";

type LeaderboardCardProps = React.FC<{
  data: SubmissionType;
  index: number;
}>;
const LeaderboardCard: LeaderboardCardProps = ({ data, index }) => {
  const userData = getUserDetails(data.userId);
  if (!userData) {
    return null;
  }
  return (
    <Card className="p-2 gap-0 flex flex-row items-center justify-between text-[0.9rem] w-full">
      <div className="w-1/12">{index + 1}</div>
      <div className="w-6/12">{getUserFullName(userData)}</div>
      <div className="w-3/12">{data.score}</div>
      <div className="w-2/12">{timeTaken(data.timeTaken)}</div>
    </Card>
  );
};

export default LeaderboardCard;
