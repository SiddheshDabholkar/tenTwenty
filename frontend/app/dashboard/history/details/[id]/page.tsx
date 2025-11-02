"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { Maybe, TranslateKey } from "@/types/common";
import {
  AnswerOptionType,
  QuestionAnswerType,
  QuestionType,
  SubmissionType,
} from "@/types/schemas";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import SubmissionContestDetails from "@/components/dashboard/submission/SubmissionContestDetails";
import SubmissionSummary from "@/components/dashboard/submission/SubmissionSummary";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/lib/common";
import LoadingList from "@/components/LoadingList";
import Empty from "@/components/Empty";

const SubmissionDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Maybe<SubmissionType>>(null);

  const fetchData = useCallback(async (id: string) => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsLoading(false);
      setData(null);
    };

    try {
      setIsLoading(true);
      const { data: respData } = await axiosInstance.get(`submission/${id}`);
      if (respData.success) {
        setData(respData.data);
      } else {
        handleError(respData.message);
      }
      setIsLoading(false);
    } catch {
      handleError(null);
    }
  }, []);

  useEffect(() => {
    if (id) fetchData(String(id));
  }, [id, fetchData]);

  if (isLoading) {
    return <LoadingList />;
  }

  if (!data) {
    return (
      <Empty
        title="History not found"
        description="Please refresh the page or try again later."
      />
    );
  }

  return (
    <div className="space-y-8 mb-8">
      <SubmissionContestDetails data={data.contestId} />
      <SubmissionSummary data={data} />
      <div className="space-y-6">
        <h3 className="text-[1.2rem] font-semibold tracking-tight text-foreground">
          Questions & Answers
        </h3>
        {data.questionsAnswers.map((qa, index) => (
          <QuestionAnswerCard
            key={index}
            questionAnswer={qa}
            questionNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

const QuestionAnswerCard = ({
  questionAnswer,
  questionNumber,
}: {
  questionAnswer: QuestionAnswerType;
  questionNumber: number;
}) => {
  const question =
    typeof questionAnswer.questionId === "object"
      ? (questionAnswer.questionId as QuestionType)
      : null;

  if (!question) return null;

  const options =
    question.options?.map((opt) =>
      typeof opt === "object" ? (opt as AnswerOptionType) : null
    ) || [];

  const userAnswerIds = questionAnswer.userAnswer.map((ans) =>
    typeof ans === "object" ? ans._id : ans
  );

  const correctOptions = options.filter((opt) => opt?.isCorrect);
  const correctAnswerIds = correctOptions.map((opt) => opt?._id);
  const isCorrect = questionAnswer.isCorrect;

  return (
    <Card className="border-border/60 shadow-none gap-2 ">
      <CardHeader className="pb-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs font-medium">
              Q{questionNumber}
            </Badge>
            {isCorrect ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-medium">Correct</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <XCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Incorrect</span>
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-base md:text-lg font-semibold leading-snug text-foreground">
          {question.question}
        </CardTitle>
      </CardHeader>

      <Separator className="opacity-70" />

      <CardContent className="pt-4 space-y-2">
        {options.map((option) => {
          if (!option) return null;
          const isUserAnswer = userAnswerIds.includes(option._id);
          const isCorrectAnswer = correctAnswerIds.includes(option._id);
          const showAsCorrect = isCorrectAnswer && !isCorrect;
          const showAsWrong = isUserAnswer && !isCorrect && !isCorrectAnswer;
          const showAsSelected = isUserAnswer && isCorrect;

          return (
            <OptionDisplay
              key={option._id}
              option={option}
              showAsCorrect={showAsCorrect}
              showAsWrong={showAsWrong}
              showAsSelected={showAsSelected}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

const OptionDisplay = ({
  option,
  showAsCorrect,
  showAsWrong,
  showAsSelected,
}: {
  option: AnswerOptionType;
  showAsCorrect: boolean;
  showAsWrong: boolean;
  showAsSelected: boolean;
}) => {
  const icon = showAsWrong ? (
    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
  ) : showAsCorrect || showAsSelected ? (
    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
  ) : null;

  const label = showAsWrong ? (
    <Badge variant="destructive" className="text-xs">
      Your answer
    </Badge>
  ) : showAsCorrect ? (
    <Badge
      variant="outline"
      className="text-xs border-green-400 text-green-700"
    >
      Correct answer
    </Badge>
  ) : showAsSelected ? (
    <Badge
      variant="outline"
      className="text-xs border-green-400 text-green-700"
    >
      Your answer
    </Badge>
  ) : null;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border text-sm transition-all duration-200",
        showAsWrong
          ? "bg-red-100/60 dark:bg-red-950/40 border-red-300 dark:border-red-800"
          : showAsCorrect || showAsSelected
          ? "bg-green-100/60 dark:bg-green-950/40 border-green-300 dark:border-green-800"
          : "bg-background border-border/60 hover:bg-muted/40"
      )}
    >
      <div className="flex items-center gap-2 flex-1 text-foreground">
        {icon}
        <span className="truncate">{option.option}</span>
      </div>
      {label}
    </div>
  );
};

export default SubmissionDetails;
