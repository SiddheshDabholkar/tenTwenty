import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { QuestionType } from "@/types/schemas";
import { ShieldQuestionMark } from "lucide-react";
import Link from "next/link";
import React from "react";

type QuestionCardProps = React.FC<{
  data: QuestionType;
}>;
const QuestionCard: QuestionCardProps = ({ data }) => {
  return (
    <Link href={`/dashboard/questions/edit/${data._id}`}>
      <Card className="w-full flex flex-row items-center p-4 gap-4 shadow-none">
        <span className="bg-blue-100 p-3 h-12 w-12 rounded-full">
          <ShieldQuestionMark />
        </span>
        <div>
          <CardTitle className="mb-2">{data.question}</CardTitle>
          <CardDescription className="mt-0 line-clamp-2">
            {data.type}
          </CardDescription>
        </div>
      </Card>
    </Link>
  );
};

export default QuestionCard;
