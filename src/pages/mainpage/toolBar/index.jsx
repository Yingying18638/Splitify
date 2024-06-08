import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useListenUsers from "@/utility/hooks/useListenUsers";
import {
  addDocWithId,
  justGetData,
  updateGroupData,
} from "@/utility/handleFirestore";
import useZustandStore from "@/utility/hooks/useZustandStore";
import React, { useEffect, useState } from "react";
import { DrawerDialog } from "../../../common_components/DrawerDialog";
import ChartAndResult from "./ChartAndResult/ChartAndResult";
import ClearBtn from "./ClearBtn";
import CopyBtn from "./CopyBtn";
import Member from "./Member";
import { ArrowBigLeftDash, Plus } from "lucide-react";
const ToolBar = ({ setDisplayHistory, setDisplayAddExpense }) => {
  const { toast } = useToast();
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const { group, tempGroupId, tempUser, setTempGroupId, resetGroup } =
    useZustandStore();
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [tempGroupId]: _, ...newInGroup } = inGroup;
      const newRemovedUser = { ...removedUser, inGroup: newInGroup };
      await addDocWithId(uid, "users", newRemovedUser);
      setOpenMember(false);
      toast({ title: "移除成功" });
    } catch (error) {
      toast({ title: "移除失敗" });
      console.log(error);
    }
  }

  if (!isInAnyGroup || !tempGroupId) {
    return (
      <div className="mt-24 flex max-w-[16rem] xl:max-w-[20rem] gap-2  content-center flex-wrap mx-auto">
        <ArrowBigLeftDash className="animate-leftArrow"></ArrowBigLeftDash>
        <p>左側選擇群組 或</p>
        <div className="mt-[-10px]">
          <DrawerDialog btnClass></DrawerDialog>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto  ">
      <h1 className=" rounded-md inline-block shadow-md bg-[#FBECCC] px-3 py-1 mt-4 text-md font-medium max-w-full truncate">
        群組｜{groupName}
      </h1>
      <div className="flex  rounded-lg  flex-wrap items-center sm:justify-between mx-auto gap-2 py-4 px-2 mb-[-80px]">
        <Button
          className=""
          onClick={() => {
            setDisplayAddExpense("block");
            setDisplayHistory({ display: "hidden", text: "查看" });
          }}
        >
          <Plus className="w-5 mr-1"></Plus>花費
        </Button>
        <ChartAndResult />
        <CopyBtn isUrlCopied={isUrlCopied} handleCopyUrl={handleCopyUrl} />
        <Member
          handleRemoveMember={handleRemoveMember}
          openMember={openMember}
          setOpenMember={setOpenMember}
        />
        <ClearBtn handleClear={handleClear} />
      </div>
    </div>
  );
};

export default ToolBar;
