"use client";

import LeaderboardCard from "@/components/dashboard/contests/LeaderboardCard";
import Empty from "@/components/Empty";
import LoadingList from "@/components/LoadingList";
import axiosInstance from "@/lib/axios";
import { getErrorMessage } from "@/lib/common";
import { Maybe, MaybeArray, TranslateKey } from "@/types/common";
import { SubmissionType } from "@/types/schemas";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Leaderboard = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MaybeArray<SubmissionType>>([]);

  const fetchData = async (id: string) => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsLoading(false);
    };

    setIsLoading(true);
    try {
      const { data: respData } = await axiosInstance.get(
        `submission/get/leaderboard/${id}`
      );
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

  if (!data.length) {
    return (
      <Empty
        title="No submissions found"
        description="Please refresh the page or try again later."
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {data.map((m, i) => {
          return <LeaderboardCard index={i} data={m} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
