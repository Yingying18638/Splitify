import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { group, users } from "../../schema_example";
import useStore from "../../utility/useStore";
const options = group.users.map(({ name }) => {
  return { label: name, value: name };
});
const Multiselect = () => {
  const { expenseData, setExpenseData } = useStore();
  const { participants } = expenseData;
  const [selected, setSelected] = useState([]);
  console.log("分擔者", participants);
  console.log("selected", selected);

  useEffect(() => {
    const newArr = selected.map((item) => ({ name: item.value }));
    setExpenseData({
      ...expenseData,
      participants: newArr,
    });
  }, [selected]);
  const customValueRenderer = (selected) => {
    return selected.length ? `平分（共${selected.length}人）` : "全部平分";
  };
  // console.log(expenseData.participants);
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
