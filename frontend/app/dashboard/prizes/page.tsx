"use client";

import React, { useEffect } from "react";
import usePrizes from "@/hooks/usePrizes";
import PrizesList from "@/components/dashboard/prizes/PrizesList";

const Prizes = () => {
  const {
    data,
    isLoading,
    hasMore,
    skip,
    search,
    setSearch,
    fetchData,
    debouncedSearch,
  } = usePrizes();

  useEffect(() => {
    fetchData({
      skip: 0,
      search: debouncedSearch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <PrizesList
      search={search}
      setSearch={setSearch}
      isLoading={isLoading}
      data={data}
      fetchData={fetchData}
      hasMore={hasMore}
      debouncedSearch={debouncedSearch}
      isSelect={false}
      onSelect={() => {}}
      selectedPrize={null}
      skip={skip}
    />
  );
};

export default Prizes;
