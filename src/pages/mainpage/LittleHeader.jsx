import React, { useEffect, useState } from "react";
import groupImg from "../../assets/group.png";
import link from "../../assets/link.png";
import { Button } from "../../components/ui/button";
import useStore from "../../utility/hooks/useStore";
import {
  updateGroupData,
  useListenUsers,
  addDocWithId,
  justGetData,
} from "../../utility/handleFirestore";
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
import ChartAndResult from "./ChartAndResult";

import { ArrowBigLeftDash, BadgeAlert, Plus, UserMinus } from "lucide-react";

const LittleHeader = ({ displayAddExpense, setDisplayAddExpense }) => {
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const { group, tempGroupId, tempUser, setTempGroupId, resetGroup } =
    useStore();
  const { inGroup } = tempUser;
  const { users, groupId } = group;
  const { groupName, expenses, history } = group;
  const groupIds = Object.keys(inGroup).length ? Object.keys(inGroup) : [];
  const isInAnyGroup = groupIds.length > 0;
  useListenUsers();
  useEffect(() => {
    if (openMember) return;
    setIsUrlCopied(false);
  }, [openMember]);
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
  async function handleRemoveMember(name, uid) {
    try {
      const isTempUserLeaving = uid === tempUser.uid;
      const newGroupData = {
        ...group,
        users: users.filter((user) => user.name !== name),
      };
      await updateGroupData(tempGroupId, newGroupData);
      if (isTempUserLeaving) {
        setTempGroupId("");
        resetGroup();
      }
    } catch (error) {
      alert(error, "刪除失敗(更新群組)");
    }
    try {
      const removedUser = await justGetData("users", uid);
      const { inGroup } = removedUser;
      const { [tempGroupId]: _, ...newInGroup } = inGroup;
      const newRemovedUser = { ...removedUser, inGroup: newInGroup };
      await addDocWithId(uid, "users", newRemovedUser);
      setOpenMember(false)
      alert("刪除成功");
    } catch (error) {
      alert(error, "刪除失敗(更新成員)");
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
    // <div className="flex fixed  left-[50%] bg-[#eabf8e] translate-x-[-50%]  md:ml-[80px] w-[60%] rounded shadow-md flex-wrap items-center justify-center mt-8 p-2">
    //  <div className="flex mt-4 bg-[#f9e9d7] gap-2 sm:w-[650px] rounded-lg shadow-md flex-wrap items-center justify-between mx-auto  p-2 mb-[-80px]">
    <>
      <h1 className=" rounded-md inline-block shadow-md bg-[#FBECCC] px-3 py-1 mt-4 text-md font-medium">
        群組｜{groupName}
      </h1>
      <div className="flex   rounded-lg  flex-wrap items-center justify-between mx-auto  py-4 px-2 mb-[-80px]">
        <div className="flex gap-6">
          <Button
            className=""
            onClick={() => {
              setDisplayAddExpense("block");
            }}
          >
            <Plus className="w-5 mr-1"></Plus>花費
            {/* <span className="text-lg font-extrabold"> ＋ </span><span>花費</span> */}
          </Button>
          <Popover defaultOpen={false} open={openMember} onOpenChange={setOpenMember}>
            <PopoverTrigger>
              <Button variant="secondary">
                <img
                  id="seeMembers"
                  src={groupImg}
                  alt="group"
                  className="w-6  mx-1"
                />
                成員
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-7">
              <p className="border-b pb-2">群組成員</p>
              {users.map(({ name, uid }) => {
                return (
                  <div key={name} className="flex justify-between px-3 items-center">
                    <p className="my-2" >
                      {name}
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger
                        disabled={expenses.length ? true : ""}
                      >
                        <Button
                          className="h-8 w-10"
                          variant="destructive"
                          disabled={expenses.length ? true : ""}
                        >
                          刪除
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            確定要刪除{name}嗎？
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            請記得跟{name}說再見
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveMember(name, uid)}
                          >
                            確定
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                );
              })}
              <div className="text-xs text-slate-400 py-2 px-3">
                {expenses.length ? "註：請先銷帳才能刪除成員" : ""}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={handleCopyUrl}>
                  <img
                    id="copyLink"
                    src={link}
                    alt="link"
                    className="w-5  mx-1"
                  />
                  複製邀請連結
                </Button>
                <p className="text-sm "> {isUrlCopied ? "連結已複製!" : ""}</p>
              </div>
            </PopoverContent>
          </Popover>
          <ChartAndResult></ChartAndResult>
          <AlertDialog>
            <AlertDialogTrigger disabled={!expenses.length ? true : ""}>
              <Button
                variant="destructive"
                disabled={!expenses.length ? true : ""}
              >
                <BadgeAlert className="mr-1"></BadgeAlert>銷帳
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>確定要銷帳嗎？</AlertDialogTitle>
                <AlertDialogDescription>
                  這個動作會把目前帳務結清，誰都不相欠，並歸到已結清紀錄中
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={handleClear}>
                  確定
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default LittleHeader;
