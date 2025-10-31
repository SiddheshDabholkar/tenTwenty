import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";

type TrueFalseOptionsProps = {
  isEdit: boolean;
  options: { option: string; isCorrect: boolean }[];
  setOptions: React.Dispatch<
    React.SetStateAction<{ option: string; isCorrect: boolean }[]>
  >;
};

const INITIAL_VALUES = [
  { option: "True", isCorrect: true },
  { option: "False", isCorrect: false },
];

const TrueFalseOptions: React.FC<TrueFalseOptionsProps> = ({
  options,
  setOptions,
  isEdit,
}) => {
  useEffect(() => {
    if (!isEdit) {
      setOptions(INITIAL_VALUES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const handleSelect = (index: number) => {
    setOptions((prev) =>
      prev.map((item, i) => ({ ...item, isCorrect: i === index }))
    );
  };

  return (
    <div className="flex gap-3">
      {options.map((opt, i) => (
        <Card
          key={i}
          onClick={() => handleSelect(i)}
          role="radio"
          aria-checked={opt.isCorrect}
          className={`flex items-center gap-3 px-4 py-2 w-36 cursor-pointer transition rounded-md ${
            opt.isCorrect ? "border-blue-500 bg-blue-50" : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="true-false"
            checked={opt.isCorrect}
            onChange={() => handleSelect(i)}
            className="sr-only"
            aria-hidden={false}
          />
          <span className="text-sm font-medium select-none">{opt.option}</span>
        </Card>
      ))}
    </div>
  );
};

export default TrueFalseOptions;
