import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MaybeArray } from "@/types/common";
import useQuestions from "@/hooks/useQuestions";
import QuestionsList from "../questions/QuestionsList";
import { QuestionType } from "@/types/schemas";

type SelectQuestionsModalProps = React.FC<{
  questions: MaybeArray<QuestionType>;
  onSelect: (question: QuestionType) => void;
}>;
const SelectQuestionsModal: SelectQuestionsModalProps = ({
  onSelect,
  questions,
}) => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Select Question</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Questions</DialogTitle>
          <DialogDescription>
            Select questions for your contest
          </DialogDescription>
        </DialogHeader>
        <QuestionsList
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          data={data}
          fetchData={fetchData}
          hasMore={hasMore}
          debouncedSearch={debouncedSearch}
          isSelect
          skip={skip}
          onSelect={onSelect}
          selectedQuestions={questions}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectQuestionsModal;
