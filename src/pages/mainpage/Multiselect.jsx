import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { group, users } from "../../schema_example";
import useStore from "../../utility/useStore";
const options = group?.users.map(({ name }) => {
  return { label: name, value: name };
});

const Multiselect = () => {
  const { newExpense, setNewExpense } = useStore();
  const { participants } = newExpense;
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const newArr = selected.map((item) => item.value);
    setNewExpense({
      ...newExpense,
      participants: newArr,
    });
  }, [selected]);
  const customValueRenderer = (selected) => {
    return selected.length ? `平分（共${selected.length}人）` : "全部平分";
  };
  // console.log(newExpense.participants);
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
