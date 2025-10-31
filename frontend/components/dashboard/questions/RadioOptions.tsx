import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect } from "react";

const INITIAL_VALUES = [
  { option: "", isCorrect: false },
  { option: "", isCorrect: false },
  { option: "", isCorrect: false },
  { option: "", isCorrect: true },
];

type RadioOptionsProps = {
  isEdit: boolean;
  options: { option: string; isCorrect: boolean }[];
  setOptions: React.Dispatch<
    React.SetStateAction<{ option: string; isCorrect: boolean }[]>
  >;
};

const RadioOptions: React.FC<RadioOptionsProps> = ({
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

  return (
    <div>
      {options.map((m, i) => (
        <div key={i} className="flex items-center gap-2 my-2">
          <Input
            value={m.option}
            placeholder="Enter option text over here"
            onChange={(e) => {
              setOptions((prev) =>
                prev.map((item, j) =>
                  j === i ? { ...item, option: e.target.value } : item
                )
              );
            }}
          />
          <Switch
            checked={m.isCorrect}
            onCheckedChange={(checked) => {
              setOptions((prev) =>
                prev.map((item, j) => ({
                  ...item,
                  isCorrect: j === i ? checked : false, // ensure only one true
                }))
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RadioOptions;
