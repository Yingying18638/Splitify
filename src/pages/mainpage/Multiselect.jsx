import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import useStore from "../../utility/hooks/useStore";
const Multiselect = ({ setSelected, selected, options }) => {
  const { newExpense, setNewExpense, group, setsomeNewExpense } = useStore();
  const { participants_customized, participants } = newExpense;
  const cusAmountArr = Object.values(participants_customized);
  const cusAmountTotal = cusAmountArr.reduce((acc, cur) => acc + cur, 0);
  useEffect(() => {
    const newArr = selected?.map((item) => item.value);
    setsomeNewExpense(newArr, "participants");
    // setNewExpense({
    //   ...newExpense,
    //   participants: newArr,
    // });
  }, [selected]);
  // useEffect(() => {
  //   // setSelected([]);
  // }, [participants_customized]);
  const customValueRenderer = (selected) => {
    if (cusAmountTotal > 0) return "自訂";
    return selected?.length ? `平分（共${selected?.length}人）` : "選擇分款人";
  };
  function handleOnChange(selected) {
    console.log(cusAmountTotal);
    if (cusAmountTotal) {
      alert("請先清除自訂分擔金額");
      return;
    }
    return setSelected(selected);
  }
  return (
    <>
      <MultiSelect
        className="w-[180px]"
        valueRenderer={customValueRenderer}
        options={options}
        value={selected}
        // disableSearch
        onChange={handleOnChange}
        labelledBy="Select"
      />
    </>
  );
};

export default Multiselect;
