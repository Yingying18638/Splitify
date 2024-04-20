import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import useStore from "../../utility/useStore";
const Multiselect = () => {
  const { newExpense, setNewExpense, group } = useStore();
  const { participants_customized } = newExpense;
  const options = group?.users?.map(({ name }) => {
    return { label: name, value: name };
  });
  console.log(options);
  const [selected, setSelected] = useState(options);

  useEffect(() => {
    const newArr = selected?.map((item) => item.value);
    setNewExpense({
      ...newExpense,
      participants: newArr,
    });
  }, [selected]);
  // useEffect(() => {
  //   // setSelected([]);
  // }, [participants_customized]);
  const customValueRenderer = (selected) => {
    const cusAmountArr = Object.values(participants_customized);
    const cusAmountTotal = cusAmountArr.reduce((acc, cur) => acc + cur, 0);
    if (cusAmountTotal > 0) return "自訂";
    return selected?.length ? `平分（共${selected?.length}人）` : "全部平分";
  };
  return (
    <>
      <MultiSelect
        className="w-[180px]"
        valueRenderer={customValueRenderer}
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </>
  );
};

export default Multiselect;
