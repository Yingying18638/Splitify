import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "a", value: "a" },
  { label: "b", value: "b" },
  { label: "c", value: "c" },
];

const Multiselect = () => {
  const [selected, setSelected] = useState([]);
  const customValueRenderer = (selected) => {
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
