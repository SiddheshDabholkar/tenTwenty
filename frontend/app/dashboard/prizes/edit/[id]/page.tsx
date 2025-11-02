"use client";

import PrizeBody from "@/components/dashboard/prizes/PrizeBody";
import Empty from "@/components/Empty";
import LoadingList from "@/components/LoadingList";
import axiosInstance from "@/lib/axios";
import { getErrorMessage } from "@/lib/common";
import { Maybe, TranslateKey } from "@/types/common";
import { PrizeType } from "@/types/schemas";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const EditPrize = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Maybe<PrizeType>>(null);

  const fetchData = async (id: string) => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsLoading(false);
      setData(null);
    };

    try {
      setIsLoading(true);
      const { data: respData } = await axiosInstance.get(`prize/${id}`);
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
        title="Prize not found"
        description="Please refresh the page or try again later."
      />
    );
  }

  return <PrizeBody data={data} />;
};

export default EditPrize;
