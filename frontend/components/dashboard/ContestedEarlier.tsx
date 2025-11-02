import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Empty from "../Empty";

const ContestedEarlier = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Empty
        description="You have already submitted your response."
        title="Response already submitted"
        small
      />
      <div className="flex flex-row items-center justify-center mt-4">
        <Link href="/dashboard/contests">
          <Button>View Contests</Button>
        </Link>
      </div>
    </div>
  );
};

export default ContestedEarlier;
