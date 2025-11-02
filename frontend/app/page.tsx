/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { Maybe, MaybeArray, TranslateKey } from "@/types/common";
import { ContestType } from "@/types/schemas";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import ContestCard from "@/components/dashboard/contests/ContestCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getErrorMessage } from "@/lib/common";
import LoadingList from "@/components/LoadingList";
import Empty from "@/components/Empty";

const LIMIT = 10;

const HomePage = () => {
  const [hasMore, setHasMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MaybeArray<ContestType>>([]);

  type fetchDataProps = {
    skip: number;
  };
  const fetchData = async ({ skip }: fetchDataProps) => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsLoading(false);
    };
    try {
      if (skip === 0) {
        setIsLoading(true);
        setData([]);
        setSkip(0);
      }
      const { data } = await axiosInstance.get("contest/get/public/all", {
        params: {
          skip,
          limit: LIMIT,
        },
      });
      if (data.success) {
        const length = data?.data?.length;
        setData((prev) => [...prev, ...data.data]);
        setHasMore(length >= LIMIT);
        setSkip(+skip + LIMIT);
      } else {
        handleError(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleError(null);
    }
  };

  useEffect(() => {
    fetchData({
      skip: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("mx-auto px-2 container flex-col flex relative mt-4")}>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-[3rem] font-extrabold">Contests</h1>
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      </div>
      <h4 className="scroll-m-20 text-[1rem] font-semibold tracking-tight">
        Hey there 👋
      </h4>
      <p className="leading-7 text-[0.85rem]">
        Welcome to Wafer, the platform that helps you win big! Whether you're a
        student, a professional, or just someone who loves to learn, Wafer has
        something for you.
      </p>

      {isLoading ? (
        <LoadingList />
      ) : data.length === 0 ? (
        <Empty
          title="Contests not found"
          description="Please refresh the page or try again later."
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
            <div className="w-full flex flex-row flex-wrap items-center justify-center gap-3 mt-4">
              {data.map((m, i) => {
                return (
                  <div key={i} className="w-full  md:w-[46%] lg:w-[30%] ">
                    <ContestCard isPublic isAdmin={false} data={m} />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default HomePage;
