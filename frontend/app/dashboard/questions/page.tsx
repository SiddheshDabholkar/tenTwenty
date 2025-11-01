"use client";

import QuestionsList from "@/components/dashboard/questions/QuestionsList";
import useQuestions from "@/hooks/useQuestions";
import React, { useEffect } from "react";

const Questions = () => {
  const {
    data,
    isLoading,
    hasMore,
    skip,
    search,
    setSearch,
    fetchData,
    debouncedSearch,
  } = useQuestions();

  useEffect(() => {
    fetchData({
      skip: 0,
      search: debouncedSearch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <QuestionsList
      search={search}
      setSearch={setSearch}
      isLoading={isLoading}
      data={data}
      fetchData={fetchData}
      hasMore={hasMore}
      debouncedSearch={debouncedSearch}
      isSelect={false}
      onSelect={() => {}}
      skip={skip}
      selectedQuestions={[]}
    />
  );
};

export default Questions;
