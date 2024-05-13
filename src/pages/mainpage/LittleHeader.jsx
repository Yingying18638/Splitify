import React, { useEffect, useState } from "react";
import groupImg from "../../assets/group2.png";
import { useToast } from "@/components/ui/use-toast";

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

import {
  ArrowBigLeftDash,
  BadgeAlert,
  Plus,
  CircleUserRound,
  Link as LinkIcon,
  LoaderCircle,
} from "lucide-react";

const LittleHeader = ({ setDisplayHistory, setDisplayAddExpense }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
      await updateGroupData(tempGroupId, newGroupData);
      toast({ title: "帳目已結清！" });
    } catch (error) {
      toast({ title: "銷帳失敗" });
      console.log(error);
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
      setIsLoading(true);
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
      toast({ title: "移除失敗" });
      console.log(error);
    }
    try {
      const removedUser = await justGetData("users", uid);
      const { inGroup } = removedUser;
      const { [tempGroupId]: _, ...newInGroup } = inGroup;
      const newRemovedUser = { ...removedUser, inGroup: newInGroup };
      await addDocWithId(uid, "users", newRemovedUser);
      setOpenMember(false);
      toast({ title: "移除成功" });
    } catch (error) {
      toast({ title: "移除失敗" });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  function getImg(name) {
    const user = users.find((item) => item.name === name);
    return user?.img;
  }
  if (!isInAnyGroup || !tempGroupId) {
    return (
      <div className="mt-24 flex max-w-[16rem] xl:max-w-[20rem] gap-2  content-center flex-wrap mx-auto">
        <ArrowBigLeftDash className="animate-leftArrow"></ArrowBigLeftDash>
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
    <div className="mx-auto w-full ">
      <h1 className=" rounded-md inline-block shadow-md bg-[#FBECCC] px-3 py-1 mt-4 text-md font-medium max-w-full truncate">
        群組｜{groupName}
      </h1>
      <div className="flex  rounded-lg  flex-wrap items-center sm:justify-between mx-auto gap-2 py-4 px-2 mb-[-80px]">
        <Button
          className=""
          onClick={() => {
            setDisplayAddExpense("block");
            setDisplayHistory({ display: "hidden", text: "查看" })
          }}
        >
          <Plus className="w-5 mr-1"></Plus>花費
          {/* <span className="text-lg font-extrabold"> ＋ </span><span>花費</span> */}
        </Button>
        <ChartAndResult></ChartAndResult>
        <Popover>
          <PopoverTrigger>
            <Button variant="secondary" onClick={handleCopyUrl}>
              <LinkIcon
                id="copyLink"
                className="w-5  mx-1 "
                strokeWidth={2.5}
              />
              邀請連結
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px]">
            {isUrlCopied ? "連結已複製" : ""}
          </PopoverContent>
        </Popover>
        <Popover
          defaultOpen={false}
          open={openMember}
          onOpenChange={setOpenMember}
        >
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
          <PopoverContent className="px-7 w-[288px]">
            <p className="border-b pb-2">群組成員</p>
            {/* {isLoading?<LoaderCircle  className="animate-spin h-3 w-3 mr-2"/>:''} */}

            {users.map(({ name, uid }) => {
              return (
                <div
                  key={name}
                  className="flex justify-between px-3 items-center w-full"
                >
                  <div className="flex gap-2 items-center ">
                    <div className="rounded-full bg-gray-200 w-6 h-6">
                      {getImg(name) ? (
                        <img
                          src={getImg(name)}
                          alt=""
                          className="rounded-full  w-6 h-6"
                        />
                      ) : (
                        <CircleUserRound />
                      )}
                    </div>
                    <p className="my-2 truncate w-[calc(224px-76px)]">{name}</p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger disabled={expenses.length ? true : ""}>
                      <Button
                        className="h-8 w-10 text-sm "
                        variant="destructive"
                        disabled={expenses.length ? true : ""}
                      >
                        移除
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          確定要移除{name}嗎？
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {name}將無法再查看群組帳目
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
              {expenses.length ? "註：請先銷帳才能移除成員" : ""}
            </div>
          </PopoverContent>
        </Popover>
        <AlertDialog>
          <AlertDialogTrigger disabled={!expenses.length ? true : ""}>
            <Button
              className="bg-[#FEB838]  hover:bg-[#FEB838]/80"
              disabled={!expenses.length ? true : ""}
            >
              <BadgeAlert className="mr-1"></BadgeAlert>銷帳
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>確定要銷帳嗎？</AlertDialogTitle>
              <AlertDialogDescription>
                這個動作會把目前帳務結清，並歸到已結清紀錄中
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={handleClear}>確定</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default LittleHeader;
