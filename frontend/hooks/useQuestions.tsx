"use client";

import { useState } from "react";
import useDebouncedSearch from "./useDebouncedSearch";
import { MaybeArray } from "@/types/common";
import { QuestionType } from "@/types/schemas";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const LIMIT = 10;

const useQuestions = () => {
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebouncedSearch({ search });
  const [data, setData] = useState<MaybeArray<QuestionType>>([]);

  type fetchDataProps = {
    skip: number;
    search: string;
  };
  const fetchData = async ({ skip, search }: fetchDataProps) => {
    const handleError = () => {
      toast.error("Something went wrong. Please try again later.");
      setIsLoading(false);
    };
    try {
      if (skip === 0) {
        setIsLoading(true);
        setData([]);
        setSkip(0);
      }
      const { data } = await axiosInstance.get("question/get/all", {
        params: {
          skip,
          limit: LIMIT,
          search,
        },
      });
      if (data.success) {
        const length = data?.data?.length;
        setData((prev) => [...prev, ...data.data]);
        setHasMore(length >= LIMIT);
        setSkip(+skip + LIMIT);
      } else {
        handleError();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleError();
    }
  };

  return {
    data,
    isLoading,
    hasMore,
    skip,
    search,
    setSearch,
    fetchData,
    debouncedSearch,
  };
};

export default useQuestions;
