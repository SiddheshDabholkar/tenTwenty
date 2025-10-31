"use client";

import PrizeBody from "@/components/dashboard/prizes/PrizeBody";
import axiosInstance from "@/lib/axios";
import { Maybe } from "@/types/common";
import { PrizeType } from "@/types/schemas";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const EditPrize = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Maybe<PrizeType>>(null);

  const fetchData = async (id: string) => {
    const handleError = () => {
      setIsLoading(false);
      setData(null);
      toast.error("Something went wrong! Please try again.");
    };

    try {
      setIsLoading(true);
      const { data: respData } = await axiosInstance.get(`prize/${id}`);
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

  return <PrizeBody data={data} />;
};

export default EditPrize;
