"use client";

import { PrizeType } from "@/types/schemas";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { Maybe } from "@/types/common";

type PrizeBodyProps = React.FC<{
  data: Maybe<PrizeType>;
}>;
const PrizeBody: PrizeBodyProps = ({ data }) => {
  const isEdit = !!data?._id;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCreate = async () => {
    const handleError = () => {
      toast.error("Something went wrong! Please try again.");
      setIsCreating(false);
    };
    try {
      const { data: respData } = await axiosInstance.post("prize/create", {
        title,
        description,
      });
      if (respData.success) {
        toast.success("Prize updated successfully!");
        router.push("/dashboard/prizes");
      } else {
        handleError();
      }
      setIsCreating(false);
    } catch (error) {
      handleError();
    }
  };

  const handleUpdate = async () => {
    const handleError = () => {
      toast.error("Something went wrong! Please try again.");
      setIsUpdating(false);
    };
    try {
      setIsUpdating(true);
      const { data: respData } = await axiosInstance.put("prize/update", {
        _id: data?._id,
        title,
        description,
      });
      if (respData.success) {
        toast.success("Prize updated successfully!");
        router.push("/dashboard/prizes");
      } else {
        handleError();
      }
      setIsUpdating(false);
    } catch (error) {
      handleError();
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
    }
  }, [data]);

  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-[2rem] mb-0">
                {isEdit ? "Update" : "Create"} Prize
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
  );
};

export default PrizeBody;
