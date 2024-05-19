import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useZustandStore from "@/utility/hooks/useZustandStore";
const DatePicker = () => {
  const { setOnePropInTempExpense, date, setDate } = useZustandStore();
  useEffect(() => {
    setOnePropInTempExpense(format(date, "yyyyMMdd"), "date");
  }, [date]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] justify-start text-left font-normal xl:text-[14px] xl:px-4 xl:py-2",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
