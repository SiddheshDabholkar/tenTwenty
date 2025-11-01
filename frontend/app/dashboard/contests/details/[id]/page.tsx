"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QUESTIONS_TYPES } from "@/constant/enums";
import axiosInstance from "@/lib/axios";
import { getQuestions, getQuestionsOptions } from "@/lib/common";
import { Maybe } from "@/types/common";
import { ContestType, QuestionType } from "@/types/schemas";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type AnswerState = {
  [questionId: string]: string[];
};

const ContestDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Maybe<ContestType>>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submissionId, setSubmissionId] = useState<Maybe<string>>(null);

  const triggerSubmission = async (contestId: string) => {
    try {
      const { data: respData } = await axiosInstance.post(
        "submission/trigger",
        { contestId }
      );
      if (respData.success) {
        setSubmissionId(respData.data._id);
        return respData.data._id;
      } else if (respData.data) {
        setSubmissionId(respData.data._id);
        return respData.data._id;
      }
    } catch (error) {
      console.error("triggerSubmission error", error);
      toast.error("Failed to start contest. Please try again.");
    }
    return null;
  };

  const fetchData = useCallback(async (id: string) => {
    const handleError = () => {
      setIsLoading(false);
      setData(null);
      toast.error("Something went wrong! Please try again.");
    };

    try {
      setIsLoading(true);
      const { data: respData } = await axiosInstance.get(`contest/${id}`);
      if (respData.success) {
        setData(respData.data);
        // Trigger submission when contest data is loaded
        await triggerSubmission(id);
      } else {
        handleError();
      }
      setIsLoading(false);
    } catch {
      handleError();
    }
  }, []);

  const handleSubmit = async () => {
    const handleError = () => {
      toast.error("Something went wrong! Please try again.");
      setIsSubmitting(false);
    };

    try {
      if (!submissionId) {
        toast.error("No submission found. Please refresh the page.");
        return;
      }

      if (!data) {
        toast.error("Contest data not loaded.");
        return;
      }

      setIsSubmitting(true);

      const typedQuestions = getQuestions(data.questions);

      const questionsAnswers = typedQuestions.map((question) => {
        const userAnswerIds = answers[question._id] || [];

        return {
          questionId: question._id,
          userAnswer: userAnswerIds,
        };
      });

      const { data: respData } = await axiosInstance.put("submission/update", {
        _id: submissionId,
        questionsAnswers,
      });

      if (respData.success) {
        toast.success("Submission successful!");
        router.push("/dashboard/contests");
      } else {
        handleError();
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("handleSubmit error", error);
      handleError();
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(String(id));
    }
  }, [id, fetchData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const typedQuestions = getQuestions(data.questions);

  const handleAnswerChange = (
    questionId: string,
    optionId: string,
    isRadio: boolean
  ) => {
    setAnswers((prev) => {
      if (isRadio) {
        return { ...prev, [questionId]: [optionId] };
      } else {
        const currentAnswers = prev[questionId] || [];
        const isSelected = currentAnswers.includes(optionId);

        if (isSelected) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((id) => id !== optionId),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionId],
          };
        }
      }
    });
  };

  return (
    <div>
      <div className="border-b pb-4">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {data.name}
        </h2>
        <p className="leading-7 ">{data.description}</p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {typedQuestions.map((m) => (
          <Card key={m._id} className="p-3 gap-0">
            <p className="mt-2 text-[1rem]">{m.question}</p>
            <div className="mt-2">
              {(m.type === QUESTIONS_TYPES.SWITCH ||
                m.type === QUESTIONS_TYPES.RADIO) && (
                <CustomInput
                  isRadio
                  question={m}
                  selectedAnswers={answers[m._id] || []}
                  onAnswerChange={handleAnswerChange}
                />
              )}

              {m.type === QUESTIONS_TYPES.CHECKBOX && (
                <CustomInput
                  isRadio={false}
                  question={m}
                  selectedAnswers={answers[m._id] || []}
                  onAnswerChange={handleAnswerChange}
                />
              )}
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/contests")}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

type CustomInputProps = React.FC<{
  isRadio: boolean;
  question: QuestionType;
  selectedAnswers: string[];
  onAnswerChange: (
    questionId: string,
    optionId: string,
    isRadio: boolean
  ) => void;
}>;
const CustomInput: CustomInputProps = ({
  isRadio,
  question,
  selectedAnswers,
  onAnswerChange,
}) => {
  const options = getQuestionsOptions(question.options);
  console.log("options", options);

  const handleChange = (optionId: string) => {
    onAnswerChange(question._id, optionId, isRadio);
  };

  return (
    <RadioGroup
      value={selectedAnswers[0] || ""}
      onValueChange={(value) => handleChange(value)}
    >
      {options.map((m) => (
        <Field key={m._id} orientation="horizontal">
          {isRadio ? (
            <RadioGroupItem value={m._id} id={m._id} />
          ) : (
            <Checkbox
              id={m._id}
              checked={selectedAnswers.includes(m._id)}
              onCheckedChange={() => handleChange(m._id)}
            />
          )}
          <FieldLabel htmlFor={m._id} className="text-[0.95rem]">
            {m.option}
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  );
};

export default ContestDetails;
