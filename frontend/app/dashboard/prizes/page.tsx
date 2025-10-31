"use client";

import { Input } from "@/components/ui/input";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import axiosInstance from "@/lib/axios";
import { MaybeArray } from "@/types/common";
import { PrizeType } from "@/types/schemas";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import PrizeCard from "@/components/dashboard/prizes/PrizeCard";

const LIMIT = 10;

const Prizes = () => {
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebouncedSearch({ search });
  const [data, setData] = useState<MaybeArray<PrizeType>>([]);

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
      const { data } = await axiosInstance.get("prize/get/all", {
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
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleError();
    }
  };

  useEffect(() => {
    fetchData({
      skip: 0,
      search: debouncedSearch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, status]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between gap-2 flex-wrap">
          <div className="flex flex-row items-center gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search todo"
              required
              className="max-w-[300px]"
            />
          </div>
        </div>
        <div>
          <Link href="/dashboard/prizes/create">
            <Button>Create</Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p>loading....</p>
      ) : data.length === 0 ? (
        <p>Empty data</p>
      ) : (
        <>
          <InfiniteScroll
            dataLength={data.length}
            next={() => fetchData({ skip, search: debouncedSearch })}
            hasMore={hasMore}
            loader={<p style={{ textAlign: "center" }}>Loading</p>}
            endMessage={
              <p
                style={{ textAlign: "center" }}
                className="text-[0.75rem] mt-3"
              >
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="w-full flex flex-col justify-center gap-3 mt-4">
              {data.map((m, i) => {
                return <PrizeCard data={m} key={i} />;
              })}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default Prizes;
