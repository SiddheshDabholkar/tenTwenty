"use client";
import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import DateTimeInput from "../DateTimeInput";
import SelectRole from "./SelectRole";
import { USER_ROLE } from "@/constant/enums";
import SelectQuestionsModal from "./SelectQuestionsModal";
import { Maybe, MaybeArray, TranslateKey } from "@/types/common";
import { ContestType, PrizeType, QuestionType } from "@/types/schemas";
import { Card } from "@/components/ui/card";
import SelectPrizeModal from "./SelectPrizeModal";
import { getErrorMessage, getPrizeDetails, getQuestions } from "@/lib/common";

type ContestBodyProps = React.FC<{
  data: Maybe<ContestType>;
}>;

const ContestBody: ContestBodyProps = ({ data }) => {
  const isEdit = !!data?._id;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [role, setRole] = useState(USER_ROLE.NORMAL);
  const [questions, setQuestions] = useState<MaybeArray<QuestionType>>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [prize, setPrize] = useState<Maybe<PrizeType>>(null);

  const handleCreateContest = async () => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsCreating(false);
    };

    try {
      setIsCreating(true);
      const { data: respData } = await axiosInstance.post("contest/create", {
        name: title,
        description,
        startDateTime,
        endDateTime,
        role: [role],
        questions: questions.map((m) => m._id),
        prize: prize?._id,
      });
      if (respData.success) {
        toast.success("Contest created successfully!");
        router.push("/dashboard");
      } else {
        handleError(respData.message);
      }
      setIsCreating(false);
    } catch (error) {
      handleError(null);
    }
  };

  const handleUpdateContest = async () => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsUpdating(false);
    };

    try {
      setIsUpdating(true);
      const { data: respData } = await axiosInstance.put("contest/update", {
        _id: data?._id,
        name: title,
        description,
        startDateTime,
        endDateTime,
        role: [role],
        questions: questions.map((m) => m._id),
        prize: prize?._id,
      });
      if (respData.success) {
        toast.success("Contest updated successfully!");
        router.push("/dashboard/contests");
      } else {
        handleError(respData.message);
      }
      setIsUpdating(false);
    } catch (error) {
      handleError(null);
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data.name);
      setDescription(data.description);
      setStartDateTime(new Date(data.startDateTime));
      setEndDateTime(new Date(data.endDateTime));
      // setRole(data.allowedRoles[0]);
      setQuestions(getQuestions(data.questions));
      setPrize(getPrizeDetails(data.prizeId));
    }
  }, [data]);

  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-[2rem] mb-0">Create Contest</h2>
              <p>Enter your details to create contest</p>
            </div>
            <FieldGroup className="gap-4">
              <Field className="gap-1">
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  title
                </FieldLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="checkout-7j9-card-name-43j"
                  placeholder="Enter title"
                  required
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  description
                </FieldLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type your message here."
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  contest for
                </FieldLabel>
                <SelectRole onSelect={(v) => setRole(v)} selectedRole={role} />
              </Field>

              <Card className="p-2 gap-1 flex flex-row items-center shadow-none">
                <SelectQuestionsModal
                  questions={questions}
                  onSelect={(v) => {
                    const isAlreadyPresent = questions.some(
                      (m) => m._id === v._id
                    );
                    if (isAlreadyPresent) {
                      setQuestions((prev) =>
                        prev.filter((m) => m._id !== v._id)
                      );
                    } else {
                      setQuestions((prev) => [...prev, v]);
                    }
                  }}
                />
                <p className="bg-green-100 text-[0.85rem] w-fit px-2 rounded-sm py-1">
                  {questions.length} Questions selected
                </p>
              </Card>

              <Card className="p-2 gap-1 flex flex-row items-center shadow-none">
                <SelectPrizeModal
                  prize={prize}
                  onSelect={(v) => {
                    const isAlreadyPresent = prize?._id === v._id;
                    if (isAlreadyPresent) {
                      setPrize(null);
                    } else {
                      setPrize(v);
                    }
                  }}
                />
                <p className="bg-green-100 text-[0.85rem] w-fit px-2 rounded-sm py-1">
                  Prize selected
                </p>
              </Card>

              <DateTimeInput
                dateTime={startDateTime}
                setDateTime={setStartDateTime}
                dateLabel="Start Date"
                timeLabel="Start Time"
              />
              <DateTimeInput
                dateTime={endDateTime}
                setDateTime={setEndDateTime}
                dateLabel="End Date"
                timeLabel="End Time"
              />
            </FieldGroup>
          </FieldSet>
          <div className="flex flex-col items-center">
            {isEdit ? (
              <Button
                onClick={handleUpdateContest}
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
                onClick={handleCreateContest}
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
  );
};

export default ContestBody;
