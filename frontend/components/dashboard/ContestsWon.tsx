"use client";

import axiosInstance from "@/lib/axios";
import { MaybeArray } from "@/types/common";
import { ContestType, WonbyType } from "@/types/schemas";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingList from "../LoadingList";
import Empty from "../Empty";
import ContestCard from "./contests/ContestCard";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 10;

const ContestsWon = () => {
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState<MaybeArray<WonbyType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async ({ skip = 0 }) => {
    const handleError = () => {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again later.");
    };
    try {
      if (skip === 0) {
        setIsLoading(true);
        setData([]);
        setSkip(0);
      }
      const { data } = await axiosInstance.get("user/get/contests-won", {
        params: {
          skip,
          limit: LIMIT,
        },
      });
      if (data.success) {
        const length = data?.data?.length;
        setData((prev) => [...prev, ...data.data]);
        setHasMore(length >= LIMIT);
        setSkip(skip + LIMIT);
        setIsLoading(false);
      } else {
        handleError();
      }
      setIsLoading(false);
    } catch (error) {
      handleError();
    }
  };

  useEffect(() => {
    fetchData({ skip: 0 });
  }, []);

  return (
    <>
      <div className="mt-6">
        <h4 className="scroll-m-20 text-[0.85rem] font-semibold tracking-tight">
          Contests won
        </h4>
        {isLoading ? (
          <LoadingList />
        ) : data.length === 0 ? (
          <Empty
            small
            title="No contests won"
            description="Join contests to win prizes."
          />
        ) : (
          <>
            <InfiniteScroll
              dataLength={data.length}
              next={() => fetchData({ skip })}
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
                  if (!m.contestId) {
                    return null;
                  }
                  const contestDetails = m.contestId as ContestType;
                  return (
                    <ContestCard
                      isPublic={false}
                      isAdmin={false}
                      data={contestDetails}
                      key={i}
                    />
                  );
                })}
              </div>
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  );
};

export default ContestsWon;
