import React from "react";
import groupImg from "../../assets/group.png";
import link from "../../assets/link.png";
import { Button } from "../../components/ui/button";
import useStore from "../../utility/hooks/useStore";
import { updateGroupData } from "../../utility/handleFirestore";
const LittleHeader = ({ displayAddExpense, setDisplayAddExpense }) => {
  const { group, setGroup } = useStore();
  const { groupName, expenses } = group;
  const groupId = "R9jYevBIidQsWX4tR3PW";
  function handleClear() {
    // 清空expenses, totalBill, flow
    const newGroupData = { ...group, totalBill: {}, flow: [], expenses: [] };
    // 4. totalBill, flow 塞入group
    // 4.1 整筆group更新到火基地

    updateGroupData(groupId, newGroupData);
    // setGroup(newGroupData);
  }
  return (
    <div className="flex flex-wrap w-full justify-center">
      <div className="w-28  rounded-sm px-3 py-1 text-sm font-medium">
        {groupName}
      </div>
      <figure className="cursor-pointer mx-2">
        <img src={groupImg} alt="group" />
      </figure>
      <figure className="cursor-pointer">
        <img src={link} alt="link" className="w-[32px]" />
      </figure>
      <Button
        className="block mx-2"
        onClick={() => {
          setDisplayAddExpense("block");
        }}
      >
        + 花費
      </Button>
      <Button onClick={handleClear}>銷帳</Button>
    </div>
  );
};

export default LittleHeader;
