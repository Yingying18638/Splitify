import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { group, users } from "../../schema_example";
import useStore from "../../utility/useStore";
// const usersOptions = group?.users.map(({ name }) => {
//   return { label: name, value: name };
// });
const options = group?.users.map(({ name }) => {
  return { label: name, value: name };
});
// const options = [...usersOptions, { label: "其他", value: "其他" }];
const Multiselect = () => {
  const { newExpense, setNewExpense } = useStore();
  const { participants_customized } = newExpense;
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const newArr = selected.map((item) => item.value);
    setNewExpense({
      ...newExpense,
      participants: newArr,
    });
  }, [selected]);
  useEffect(() => {
    setSelected([]);
  }, [participants_customized]);
  const customValueRenderer = (selected) => {
    // const hasOther = selected.find((obj) =>
    //   Object.values(obj).includes("其他")
    // );
    // const isAllSelected = selected.length === options.length;
    // if (hasOther && !isAllSelected) return "其他";
    // if (hasOther)
    //   return selected.length
    //     ? `平分（共${selected.length - 1}人）`
    //     : "全部平分";
    const cusAmountArr = Object.values(participants_customized);
    const cusAmountTotal = cusAmountArr.reduce((acc, cur) => acc + cur, 0);
    if (cusAmountTotal > 0) return "自訂";
    return selected.length ? `平分（共${selected.length}人）` : "全部平分";
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
