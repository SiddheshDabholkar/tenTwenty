import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import QuestionCard from "./QuestionCard";
import { QuestionType } from "@/types/schemas";
import { MaybeArray } from "@/types/common";

type QuestionsListProps = React.FC<{
  search: string;
  setSearch: (search: string) => void;
  isLoading: boolean;
  data: MaybeArray<QuestionType>;
  fetchData: (props: { skip: number; search: string }) => void;
  hasMore: boolean;
  debouncedSearch: string;
  isSelect: boolean;
  onSelect: (question: QuestionType) => void;
  selectedQuestions: QuestionType[];
  skip: number;
}>;

const QuestionsList: QuestionsListProps = ({
  search,
  setSearch,
  isLoading,
  data,
  fetchData,
  hasMore,
  debouncedSearch,
  isSelect,
  onSelect,
  selectedQuestions,
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
              placeholder="Search Question"
              required
              className="max-w-[300px]"
            />
          </div>
        </div>
        <div>
          <Link href="/dashboard/questions/create">
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
                return (
                  <QuestionCard
                    data={m}
                    key={i}
                    isSelect={isSelect}
                    onSelect={onSelect}
                    selectedQuestions={selectedQuestions}
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

export default QuestionsList;
