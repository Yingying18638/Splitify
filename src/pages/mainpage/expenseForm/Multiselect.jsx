import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, X } from "lucide-react";
import React, { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import useZustandStore from "@/utility/hooks/useZustandStore";
const Multiselect = ({ setSelected, selected, options }) => {
  const { tempExpense, setOnePropInTempExpense } = useZustandStore();
  const { participants_customized } = tempExpense;
  const cusAmountArr = Object.values(participants_customized);
  const cusAmountTotal = cusAmountArr.reduce((acc, cur) => acc + cur, 0);
  const { toast } = useToast();

  useEffect(() => {
    const newArr = selected?.map((item) => item.value);
    setOnePropInTempExpense(newArr, "participants");
  }, [selected]);
  const customValueRenderer = (selected) => {
    if (cusAmountTotal > 0) return "自訂";
    return selected?.length ? `平分（共${selected?.length}人）` : "選擇分款人";
  };
  function handleOnChange(selected) {
    if (cusAmountTotal) {
      toast({ title: "請先清除自訂分擔金額", variant: "destructive" });
      return;
    }
    return setSelected(selected);
  }
  const ArrowRenderer = () => <ChevronDown className="w-4 opacity-60" />;
  const CustomClearIcon = () => <X className="w-4 opacity-60" />;
  return (
    <>
      <MultiSelect
        className="w-[180px]"
        valueRenderer={customValueRenderer}
        options={options}
        value={selected}
        ArrowRenderer={ArrowRenderer}
        ClearIcon={<CustomClearIcon />}
        ClearSelectedIcon={<CustomClearIcon />}
        onChange={handleOnChange}
        labelledBy="Select"
      />
    </>
  );
};

export default Multiselect;
