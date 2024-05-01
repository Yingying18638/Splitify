import React, { useState } from "react";
import groupImg from "../../assets/group.png";
import link from "../../assets/link.png";
import { Button } from "../../components/ui/button";
import useStore from "../../utility/hooks/useStore";
import { updateGroupData } from "../../utility/handleFirestore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

const LittleHeader = ({ displayAddExpense, setDisplayAddExpense }) => {
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const { group, tempGroupId, tempUser } = useStore();
  const { inGroup } = tempUser;
  const { users, groupId } = group;
  const { groupName, expenses, history } = group;
  const groupIds = Object.keys(inGroup).length ? Object.keys(inGroup) : [];
  const isInAnyGroup = groupIds.length > 0;

  function handleClear() {
    // expenses 放入history, 清空expenses, totalBill, flow
    const newGroupData = {
      ...group,
      totalBill: {},
      flow: [],
      expenses: [],
      history: [...history, ...expenses],
    };
    // 整筆group更新到火基地
    updateGroupData(tempGroupId, newGroupData);
  }
  async function handleCopyUrl() {
    try {
      const url = `${window.location.origin}?id=${groupId}`;
      await navigator.clipboard.writeText(url);
      setIsUrlCopied(true);
    } catch (e) {
      console.log(e);
      setIsUrlCopied(false);
    }
  }
  if (!isInAnyGroup || !tempGroupId)
    return <div className="mt-20">左側選擇群組或新建群組</div>;
  return (
    <div className="flex fixed  left-[50%] bg-[#869456] translate-x-[-50%]  md:ml-[80px] w-full flex-wrap items-center justify-center mt-8 p-2">
      <div className="w-28  rounded-sm px-3 py-1 text-sm font-medium">
        {groupName}
      </div>
      <figure className="cursor-pointer mx-2">
        <Popover>
          <PopoverTrigger>
            <img src={groupImg} alt="group" className="hover:opacity-50" />
          </PopoverTrigger>
          <PopoverContent>
            {users.map(({ name, email }) => {
              return <p className="my-2">{name}</p>;
            })}
          </PopoverContent>
        </Popover>
      </figure>
      <figure className="cursor-pointer">
        <Popover>
          <PopoverTrigger>
            <img
              src={link}
              alt="link"
              className="w-[32px] hover:opacity-50"
              onClick={handleCopyUrl}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[150px]">
            {isUrlCopied ? "連結已複製" : ""}
          </PopoverContent>
        </Popover>
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
