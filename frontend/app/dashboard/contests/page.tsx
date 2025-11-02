"use client";

import ContestCard from "@/components/dashboard/contests/ContestCard";
import Empty from "@/components/Empty";
import LoadingList from "@/components/LoadingList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { USER_ROLE } from "@/constant/enums";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import { useUser } from "@/hooks/useUser";
import axiosInstance from "@/lib/axios";
import { getErrorMessage } from "@/lib/common";
import { Maybe, MaybeArray, TranslateKey } from "@/types/common";
import { ContestType } from "@/types/schemas";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";

const LIMIT = 10;

const Contests = () => {
  const { user } = useUser();
  const isAdmin = user?.role === USER_ROLE.ADMIN;
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebouncedSearch({ search });
  const [data, setData] = useState<MaybeArray<ContestType>>([]);

  type fetchDataProps = {
    skip: number;
    search: string;
  };
  const fetchData = async ({ skip, search }: fetchDataProps) => {
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
      const { data } = await axiosInstance.get("contest/get/by-user", {
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
      search: debouncedSearch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between gap-2 flex-wrap">
          <div className="flex flex-row items-center gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contests"
              required
              className="max-w-[300px]"
            />
          </div>
        </div>
        <div>
          {isAdmin && (
            <Link href="/dashboard/contests/create">
              <Button>Create</Button>
            </Link>
          )}
        </div>
      </div>

      {isLoading ? (
        <LoadingList />
      ) : data.length === 0 ? (
        <Empty
          title="No contests found"
          description="Please refresh the page or try again later."
        />
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
                return (
                  <ContestCard
                    isPublic={false}
                    isAdmin={isAdmin}
                    data={m}
                    key={i}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default Contests;
