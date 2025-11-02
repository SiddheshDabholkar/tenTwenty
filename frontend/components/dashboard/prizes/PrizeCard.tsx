import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Maybe } from "@/types/common";
import { PrizeType } from "@/types/schemas";
import { Trophy } from "lucide-react";
import Link from "next/link";
import React from "react";

type PrizeCardProps = React.FC<{
  isSelect: boolean;
  onSelect: (prize: PrizeType) => void;
  selectedPrize: Maybe<PrizeType>;
  data: PrizeType;
}>;
const PrizeCard: PrizeCardProps = ({
  data,
  isSelect,
  onSelect,
  selectedPrize,
}) => {
  return (
    <Wrapper
      {...{
        data,
        isSelect,
        onSelect,
        selectedPrize,
      }}
    />
  );
};

const Wrapper: PrizeCardProps = ({
  data,
  selectedPrize,
  isSelect,
  onSelect,
}) => {
  const isSelected = selectedPrize?._id === data._id;
  if (isSelect) {
    return (
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => {
          onSelect(data);
        }}
      >
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isSelected}
            // onCheckedChange={() => {
            //   onSelect(data);
            // }}
          />
        </div>
        <PrizeInfo data={data} />
      </div>
    );
  }
  return (
    <Link href={`/dashboard/prizes/edit/${data._id}`}>
      <PrizeInfo data={data} />
    </Link>
  );
};

type PrizeInfoProps = React.FC<{
  data: PrizeType;
}>;
const PrizeInfo: PrizeInfoProps = ({ data }) => {
  return (
    <Card className="w-full flex flex-row items-center p-4 gap-4 shadow-none">
      <span className="bg-blue-100 p-3 h-12 w-12 rounded-full">
        <Trophy />
      </span>
      <div>
        <CardTitle className="mb-2">{data.title}</CardTitle>
        <CardDescription className="mt-0 line-clamp-2">
          {data.description}
        </CardDescription>
      </div>
    </Card>
  );
};

export default PrizeCard;
