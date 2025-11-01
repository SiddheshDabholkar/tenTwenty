import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionType } from "@/types/schemas";
import { ShieldQuestionMark } from "lucide-react";
import Link from "next/link";
import React from "react";

type QuestionCardProps = React.FC<{
  data: QuestionType;
  isSelect: boolean;
  onSelect: (question: QuestionType) => void;
  selectedQuestions: QuestionType[];
}>;
const QuestionCard: QuestionCardProps = ({
  data,
  selectedQuestions,
  isSelect,
  onSelect,
}) => {
  return (
    <Wrapper
      data={data}
      isSelect={isSelect}
      onSelect={onSelect}
      selectedQuestions={selectedQuestions}
    />
  );
};

type QuestionInfoType = React.FC<{ data: QuestionType }>;
const QuestionInfo: QuestionInfoType = ({ data }) => {
  return (
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
  );
};

type WrapperProps = React.FC<{
  data: QuestionType;
  isSelect: boolean;
  onSelect: (question: QuestionType) => void;
  selectedQuestions: QuestionType[];
}>;
const Wrapper: WrapperProps = ({
  data,
  selectedQuestions,
  isSelect,
  onSelect,
}) => {
  const isSelected = selectedQuestions.some((m) => m._id === data._id);

  if (isSelect) {
    return (
      <div
        className="flex flex-row items-center gap-2"
        onClick={() => {
          onSelect(data);
        }}
      >
        <div className="flex items-center gap-3">
          <Checkbox
            id="terms"
            checked={isSelected}
            onCheckedChange={() => {
              onSelect(data);
            }}
          />
        </div>
        <QuestionInfo data={data} />
      </div>
    );
  }
  return (
    <Link href={`/dashboard/questions/edit/${data._id}`}>
      <QuestionInfo data={data} />
    </Link>
  );
};

export default QuestionCard;
