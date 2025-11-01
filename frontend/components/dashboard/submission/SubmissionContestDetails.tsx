import { getContestDetails } from "@/lib/common";
import { MaybeString } from "@/types/common";
import { ContestType } from "@/types/schemas";
import React from "react";

type SubmissionContestDetailsProps = React.FC<{
  data: MaybeString<ContestType>;
}>;
const SubmissionContestDetails: SubmissionContestDetailsProps = ({ data }) => {
  const contestDetails = getContestDetails(data);

  if (!contestDetails) {
    return null;
  }

  const contestDescription = contestDetails.description;
  return (
    <div className="pb-4">
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-foreground">
        {contestDetails.name}
      </h2>
      {contestDescription && (
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {contestDescription}
        </p>
      )}
    </div>
  );
};

export default SubmissionContestDetails;
