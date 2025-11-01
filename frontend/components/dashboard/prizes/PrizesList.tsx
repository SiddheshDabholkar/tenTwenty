"use client";
import { Input } from "@/components/ui/input";
import { Maybe, MaybeArray } from "@/types/common";
import { PrizeType } from "@/types/schemas";
import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import PrizeCard from "@/components/dashboard/prizes/PrizeCard";
import LoadingList from "@/components/LoadingList";
import Empty from "@/components/Empty";

type PrizesListProps = React.FC<{
  search: string;
  setSearch: (search: string) => void;
  isLoading: boolean;
  data: MaybeArray<PrizeType>;
  fetchData: (props: { skip: number; search: string }) => void;
  hasMore: boolean;
  debouncedSearch: string;
  isSelect: boolean;
  onSelect: (prize: PrizeType) => void;
  selectedPrize: Maybe<PrizeType>;
  skip: number;
}>;
const PrizesList: PrizesListProps = ({
  search,
  setSearch,
  isLoading,
  data,
  fetchData,
  hasMore,
  debouncedSearch,
  isSelect,
  onSelect,
  selectedPrize,
  skip,
}) => {
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
        <LoadingList />
      ) : data.length === 0 ? (
        <Empty
          title="No prizes found"
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
                  <PrizeCard
                    isSelect={isSelect}
                    onSelect={onSelect}
                    selectedPrize={selectedPrize}
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

export default PrizesList;
