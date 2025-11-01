import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatTime, timeTaken } from "@/lib/date";
import { SubmissionType } from "@/types/schemas";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

type SubmissionCardProps = React.FC<{
  data: SubmissionType;
}>;

const SubmissionCard: SubmissionCardProps = ({ data }) => {
  const contestName =
    typeof data.contestId === "object" ? data.contestId?.name : "Contest";
  const contestDescription =
    typeof data.contestId === "object" ? data.contestId?.description : "";

  return (
    <Link href={`/dashboard/history/details/${data._id}`}>
      <Card className="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {contestName}
            </CardTitle>
            <CardDescription className="text-md text-gray-800">
              {contestDescription}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center justify-between">
            <span className="font-medium">Score:</span>
            <span className="text-gray-900 font-semibold">
              {data.score} / {data.questionsAnswers.length}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              Time Taken:
            </span>
            <span className="text-gray-900">{timeTaken(data.timeTaken)}</span>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-green-500" />
                Submitted At:
              </span>
              <span className="text-gray-900">
                {formatDate(data.submittedAt)} • {formatTime(data.submittedAt)}
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                Contest Opened:
              </span>
              <span className="text-gray-900">
                {formatDate(data.contestOpenedAt)} •{" "}
                {formatTime(data.contestOpenedAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubmissionCard;
