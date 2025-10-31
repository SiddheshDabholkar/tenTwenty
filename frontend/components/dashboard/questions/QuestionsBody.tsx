"use client";

import { QUESTIONS_TYPES } from "@/constant/enums";
import { Maybe } from "@/types/common";
import { QuestionType } from "@/types/schemas";
import React, { useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputTypeSelect from "./InputTypeSelect";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import TrueFalseOptions from "./TrueFalseOptions";
import RadioOptions from "./RadioOptions";
import CheckboxOptions from "./CheckboxOptions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { getAnswerOptions } from "@/lib/common";

type QuestionsBodyProps = React.FC<{
  data: Maybe<QuestionType>;
}>;
const QuestionsBody: QuestionsBodyProps = ({ data }) => {
  const router = useRouter();
  const isEdit = !!data?._id;
  const [question, setQuestion] = useState("");
  const [type, setType] = useState(QUESTIONS_TYPES.CHECKBOX);
  const [options, setOptions] = useState<
    {
      option: string;
      isCorrect: boolean;
    }[]
  >([]);

  console.log({
    options,
    type,
    question,
    data,
  });

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    const handleError = () => {
      toast.error("Something went wrong! Please try again.");
      setIsUpdating(false);
    };
    try {
      setIsUpdating(true);
      const { data: respData } = await axiosInstance.put("question/update", {
        _id: data?._id,
        question,
        type,
        options,
      });
      if (respData.success) {
        toast.success("Question updated successfully!");
        router.push("/dashboard/questions");
      } else {
        handleError();
      }
      setIsUpdating(false);
    } catch (error) {
      handleError();
    }
  };

  const handleCreate = async () => {
    const handleError = () => {
      toast.error("Something went wrong! Please try again.");
      setIsCreating(false);
    };
    try {
      setIsCreating(true);
      const { data: respData } = await axiosInstance.post("question/create", {
        question,
        type,
        options,
      });
      if (respData.success) {
        toast.success("Question created successfully!");
        router.push("/dashboard/questions");
      } else {
        handleError();
      }
      setIsCreating(false);
    } catch (error) {
      handleError();
    }
  };

  useEffect(() => {
    if (data) {
      setQuestion(data.question);
      console.log("data.type", data.type);
      setType(data.type);
      const formattedOptions = getAnswerOptions(data.options);
      setOptions(formattedOptions);
    }
  }, [data]);

  return (
    <div>
      <div className="w-full max-w-md">
        <form>
          <FieldGroup>
            <FieldSet>
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-[2rem] mb-0">
                  {isEdit ? "Update" : "Create"} Question
                </h2>
                <p>
                  Enter your details to create prize. You can later reuse this
                  prize in various contets
                </p>
              </div>
              <FieldGroup className="gap-4">
                <Field className="gap-1">
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    title
                  </FieldLabel>
                  <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    id="checkout-7j9-card-name-43j"
                    placeholder="Enter title"
                    required
                  />
                </Field>

                <InputTypeSelect
                  className="mt-2"
                  label="Input type"
                  value={type}
                  onChange={setType}
                />
                {type === QUESTIONS_TYPES.RADIO && (
                  <RadioOptions
                    isEdit={isEdit}
                    options={options}
                    setOptions={setOptions}
                  />
                )}
                {type === QUESTIONS_TYPES.CHECKBOX && (
                  <CheckboxOptions
                    isEdit={isEdit}
                    options={options}
                    setOptions={setOptions}
                  />
                )}
                {type === QUESTIONS_TYPES.SWITCH && (
                  <TrueFalseOptions
                    isEdit={isEdit}
                    options={options}
                    setOptions={setOptions}
                  />
                )}
              </FieldGroup>
            </FieldSet>
            <div className="flex flex-col items-center">
              {isEdit ? (
                <Button
                  onClick={handleUpdate}
                  type="button"
                  className="w-full cursor-pointer"
                >
                  {isUpdating ? (
                    <>
                      <Spinner />
                      Updating...
                    </>
                  ) : (
                    <>Update</>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleCreate}
                  type="button"
                  className="w-full cursor-pointer"
                >
                  {isCreating ? (
                    <>
                      <Spinner />
                      Creating...
                    </>
                  ) : (
                    <>Create</>
                  )}
                </Button>
              )}
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default QuestionsBody;
