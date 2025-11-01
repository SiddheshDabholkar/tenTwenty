"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DateTimeInputProps = {
  dateLabel: string;
  timeLabel: string;
  dateTime: Date;
  setDateTime: React.Dispatch<React.SetStateAction<Date>>;
};

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  dateLabel,
  timeLabel,
  dateTime,
  setDateTime,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const newDate = new Date(dateTime);
    newDate.setUTCFullYear(selectedDate.getFullYear());
    newDate.setUTCMonth(selectedDate.getMonth());
    newDate.setUTCDate(selectedDate.getDate());
    setDateTime(newDate);
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes, seconds] = e.target.value.split(":").map(Number);
    const newDate = new Date(dateTime);
    newDate.setUTCHours(hours || 0);
    newDate.setUTCMinutes(minutes || 0);
    newDate.setUTCSeconds(seconds || 0);
    setDateTime(newDate);
  };

  const getUTCDateString = () => {
    // This ensures the date shown matches the UTC date
    return new Date(
      Date.UTC(
        dateTime.getUTCFullYear(),
        dateTime.getUTCMonth(),
        dateTime.getUTCDate()
      )
    ).toLocaleDateString("en-GB", { timeZone: "UTC" });
  };

  const getUTCTimeString = () => {
    const hours = String(dateTime.getUTCHours()).padStart(2, "0");
    const minutes = String(dateTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getUTCSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="date-picker" className="px-1 text-[0.7rem]">
          {dateLabel}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {getUTCDateString()}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTime}
              captionLayout="dropdown"
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="time-picker" className="px-1 text-[0.7rem]">
          {timeLabel}
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={getUTCTimeString()}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};

export default DateTimeInput;
