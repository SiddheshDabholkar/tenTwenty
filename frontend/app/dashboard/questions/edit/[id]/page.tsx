"use client";

import QuestionsBody from "@/components/dashboard/questions/QuestionsBody";
import axiosInstance from "@/lib/axios";
import { Maybe } from "@/types/common";
import { QuestionType } from "@/types/schemas";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const EditQuestion = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Maybe<QuestionType>>(null);

  const fetchData = async (id: string) => {
    const handleError = () => {
      setIsLoading(false);
      setData(null);
      toast.error("Something went wrong! Please try again.");
    };

    try {
      setIsLoading(true);
      const { data: respData } = await axiosInstance.get(`question/${id}`);
      if (respData.success) {
        setData(respData.data);
      } else {
        handleError();
      }
      setIsLoading(false);
    } catch (error) {
      handleError();
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(String(id));
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <QuestionsBody data={data} />;
};

export default EditQuestion;
