"use client";
import axiosInstance from "@/lib/axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import DateTimeInput from "../DateTimeInput";

const ContestBody = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [role, setRole] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCreateContest = async () => {
    const handleError = () => {
      toast.error("Something went wrong! Please try again.");
      setIsCreating(false);
    };

    try {
      setIsCreating(true);
      const { data: respData } = await axiosInstance.post("contest/create", {
        title,
        description,
        startDateTime,
        endDateTime,
        role,
        questions,
      });
      if (respData.success) {
        toast.success("Contest created successfully!");
        router.push("/dashboard");
      } else {
        handleError();
      }
      setIsCreating(false);
    } catch (error) {
      handleError();
    }
  };

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

              <DateTimeInput dateLabel="Start Date" timeLabel="Start Time" />
              <DateTimeInput dateLabel="End Date" timeLabel="End Time" />
            </FieldGroup>
          </FieldSet>
          <div className="flex flex-col items-center">
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
            <Link className="text-[0.85rem] underline mt-2" href="/">
              Already have an account?
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ContestBody;
