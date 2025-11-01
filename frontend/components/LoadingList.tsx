import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

const LoadingList = () => {
  return (
    <div className="flex flex-col gap-2">
      {new Array(3).fill("").map((m, i) => (
        <SingleCard key={m} />
      ))}
    </div>
  );
};

export default LoadingList;

const SingleCard = () => {
  return (
    <Card className="p-3 shadow-none mt-4">
      <div className="flex items-center space-x-4">
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-2 w-[80%]" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-2 w-[80%]" />
          <Skeleton className="h-2 w-[80%]" />
        </div>
      </div>
    </Card>
  );
};
