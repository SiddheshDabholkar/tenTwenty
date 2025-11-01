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
import { Maybe } from "@/types/common";
import { PrizeType } from "@/types/schemas";
import usePrizes from "@/hooks/usePrizes";
import PrizesList from "../prizes/PrizesList";

type SelectPrizeModalProps = React.FC<{
  prize: Maybe<PrizeType>;
  onSelect: (prize: PrizeType) => void;
}>;
const SelectPrizeModal: SelectPrizeModalProps = ({ onSelect, prize }) => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Select Prize</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Select Prize</DialogTitle>
          <DialogDescription>Select prize for your contest</DialogDescription>
        </DialogHeader>
        <PrizesList
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
          selectedPrize={prize}
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

export default SelectPrizeModal;
