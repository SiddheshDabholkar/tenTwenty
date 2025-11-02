"use client";

import ContestBody from "@/components/dashboard/contests/ContestBody";
import Empty from "@/components/Empty";
import LoadingList from "@/components/LoadingList";
import axiosInstance from "@/lib/axios";
import { getErrorMessage } from "@/lib/common";
import { Maybe, TranslateKey } from "@/types/common";
import { ContestType } from "@/types/schemas";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const EditContest = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Maybe<ContestType>>(null);

  const fetchData = async (id: string) => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      setIsLoading(false);
      setData(null);
      toast.error(getErrorMessage(msg));
    };

    try {
      setIsLoading(true);
      const { data: respData } = await axiosInstance.get(`contest/${id}`);
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
        title="Contest not found"
        description="Please refresh the page or try again later."
      />
    );
  }

  return <ContestBody data={data} />;
};

export default EditContest;
