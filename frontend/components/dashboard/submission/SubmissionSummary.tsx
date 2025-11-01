import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatTime, timeTaken } from "@/lib/date";
import { SubmissionType } from "@/types/schemas";
import { Award, Calendar, Clock } from "lucide-react";
import React from "react";

type SubmissionSummaryProps = React.FC<{
  data: SubmissionType;
}>;
const SubmissionSummary: SubmissionSummaryProps = ({ data }) => {
  return (
    <Card className="shadow-none border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Award className="w-5 h-5" />
          Submission Summary
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Overview of your performance and attempt details
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryItem
          label="Score"
          value={`${data.score} / ${data.questionsAnswers.length}`}
          highlight
        />
        <SummaryItem
          label="Time Taken"
          icon={<Clock className="w-4 h-4 text-orange-500" />}
          value={timeTaken(data.timeTaken)}
        />
        <SummaryItem
          label="Submitted"
          icon={<Calendar className="w-4 h-4 text-green-500" />}
          value={`${formatDate(data.submittedAt)} • ${formatTime(
            data.submittedAt
          )}`}
        />
        <SummaryItem
          label="Started"
          icon={<Calendar className="w-4 h-4 text-gray-500" />}
          value={`${formatDate(data.contestOpenedAt)} • ${formatTime(
            data.contestOpenedAt
          )}`}
        />
      </CardContent>
    </Card>
  );
};

const SummaryItem = ({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) => (
  <Card className="flex shadow-none flex-col justify-center gap-1 p-3 rounded-xl ">
    <div className="flex items-center gap-2 text-[0.75rem] text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
    <span
      className={`text-[0.85rem] font-semibold ${
        highlight ? "text-blue-600 dark:text-blue-400" : "text-foreground"
      }`}
    >
      {value}
    </span>
  </Card>
);

export default SubmissionSummary;
