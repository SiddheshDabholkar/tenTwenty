"use client";

import QuestionsBody from "@/components/dashboard/questions/QuestionsBody";
import Empty from "@/components/Empty";
import LoadingList from "@/components/LoadingList";
import axiosInstance from "@/lib/axios";
import { getErrorMessage } from "@/lib/common";
import { Maybe, TranslateKey } from "@/types/common";
import { QuestionType } from "@/types/schemas";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const EditQuestion = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Maybe<QuestionType>>(null);

  const fetchData = async (id: string) => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsLoading(false);
      setData(null);
    };

    try {
      setIsLoading(true);
      const { data: respData } = await axiosInstance.get(`question/${id}`);
      if (respData.success) {
        setData(respData.data);
      } else {
        handleError(respData.message);
      }
      setIsLoading(false);
    } catch (error) {
      handleError(null);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(String(id));
    }
  }, [id]);

  if (isLoading) {
    return <LoadingList />;
  }

  if (!data) {
    return (
      <Empty
        title="Question not found"
        description="Please refresh the page or try again later."
      />
    );
  }

  return <QuestionsBody data={data} />;
};

export default EditQuestion;
