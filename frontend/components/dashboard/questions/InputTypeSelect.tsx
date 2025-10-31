import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUESTIONS_TYPES } from "@/constant/enums";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const list = [
  {
    id: 1,
    name: "Radio",
    value: QUESTIONS_TYPES.RADIO,
  },
  {
    id: 2,
    name: "Checkbox",
    value: QUESTIONS_TYPES.CHECKBOX,
  },
  {
    id: 3,
    name: "Switch",
    value: QUESTIONS_TYPES.SWITCH,
  },
];

type InputTypeSelectProps = React.FC<{
  value: QUESTIONS_TYPES;
  onChange: (value: QUESTIONS_TYPES) => void;
  label: string;
  className?: string;
}>;
const InputTypeSelect: InputTypeSelectProps = ({
  value,
  onChange,
  label,
  className,
}) => {
  return (
    <Field className={cn("gap-1", className)}>
      <FieldLabel htmlFor="checkout-7j9-card-name-43j">{label}</FieldLabel>
      <Select
        value={value}
        onValueChange={(v) => {
          if (v) {
            onChange(v as QUESTIONS_TYPES);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Input type</SelectLabel>
            {list.map((m, i) => (
              <SelectItem key={i} value={m.value}>
                {m.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
};

export default InputTypeSelect;
