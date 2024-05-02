import React, { useState } from "react";
import groupImg from "../../assets/group.png";
import link from "../../assets/link.png";
import { Button } from "../../components/ui/button";
import useStore from "../../utility/hooks/useStore";
import { updateGroupData } from "../../utility/handleFirestore";
import { DrawerDialogDemo } from "./DrawerDialogDemo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ArrowBigLeftDash } from "lucide-react";

const LittleHeader = ({ displayAddExpense, setDisplayAddExpense }) => {
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const { group, tempGroupId, tempUser } = useStore();
  const { inGroup } = tempUser;
  const { users, groupId } = group;
  const { groupName, expenses, history } = group;
  const groupIds = Object.keys(inGroup).length ? Object.keys(inGroup) : [];
  const isInAnyGroup = groupIds.length > 0;

  async function handleClear() {
    // expenses 放入history, 清空expenses, totalBill, flow
    try {
      const newGroupData = {
        ...group,
        totalBill: {},
        flow: [],
        expenses: [],
        history: [...history, ...expenses],
      };
      // 整筆group更新到火基地
      await updateGroupData(tempGroupId, newGroupData);
      alert("帳目已結清！");
    } catch (error) {
      alert(error, "銷帳失敗");
    }
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
  if (!isInAnyGroup || !tempGroupId) {
    return (
      <div className="mt-24 flex w-56 translate-x-[-50%] content-center flex-wrap fixed left-[50%] gap-2">
        <ArrowBigLeftDash></ArrowBigLeftDash>
        <p>左側選擇群組 或</p>
        <div className="mt-[-10px]">
          <DrawerDialogDemo btnClass></DrawerDialogDemo>
        </div>
      </div>
    );
  }
  return (
    <div className="flex fixed  left-[50%] bg-[#eabf8e] translate-x-[-50%]  md:ml-[80px] w-full flex-wrap items-center justify-center mt-8 p-2">
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
      {/* <Button onClick={handleClear}>銷帳</Button> */}
      <AlertDialog>
        <AlertDialogTrigger>
          <Button>銷帳</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要銷帳嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              這個動作會把目前帳務結清，誰都不相欠，結清帳目後就只能查看
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear}>確定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LittleHeader;
