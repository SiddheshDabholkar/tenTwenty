"use client";

import LeaderboardCard from "@/components/dashboard/contests/LeaderboardCard";
import axiosInstance from "@/lib/axios";
import { MaybeArray } from "@/types/common";
import { SubmissionType } from "@/types/schemas";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Leaderboard = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MaybeArray<SubmissionType>>([]);

  const fetchData = async (id: string) => {
    setIsLoading(true);
    try {
      const { data: respData } = await axiosInstance.get(
        `submission/get/leaderboard/${id}`
      );
      if (respData.success) {
        setData(respData.data);
      } else {
        toast.error("Failed to fetch leaderboard. Please try again.");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch leaderboard. Please try again.");
      setIsLoading(false);
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
