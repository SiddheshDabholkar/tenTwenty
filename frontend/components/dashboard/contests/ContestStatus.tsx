import { Button } from "@/components/ui/button";
import { ContestType } from "@/types/schemas";
import Link from "next/link";
import React from "react";

type ContestStatusProps = React.FC<{
  data: ContestType;
}>;
const ContestStatus: ContestStatusProps = ({ data }) => {
  const nowUTC = new Date();
  const contestStartUTC = new Date(data.startDateTime);
  const contestEndUTC = new Date(data.endDateTime);

  const isContestsNotStarted = nowUTC < contestStartUTC;
  const isContestEnded = nowUTC >= contestEndUTC;

  // Format dates to display in user's local timezone
  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <div>
      <div className="pb-4">
        <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-foreground">
          {data.name}
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {data.description}
        </p>
        {isContestsNotStarted && (
          <p className="text-red-500 mt-2">
            Contest has not started yet. Please check back later.
          </p>
        )}
        {isContestEnded && (
          <p className="text-red-500 mt-2">
            Contest has ended. Thank you for your interest!
          </p>
        )}
      </div>

      <div className="border-b pb-4 mt-4">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Contest Details
        </h2>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Start Date & Time</span>
          <span className="text-muted-foreground">
            {formatDateTime(contestStartUTC)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold">End Date & Time</span>
          <span className="text-muted-foreground">
            {formatDateTime(contestEndUTC)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/dashboard/contests">
          <Button>View other contests</Button>
        </Link>
      </div>
    </div>
  );
};

export default ContestStatus;
