import { useToast } from "@/components/ui/use-toast";
import { Link as LinkIcon } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { addDocWithId } from "@/utility/handleFirestore";
import useZustandStore from "@/utility/hooks/useZustandStore";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const AddGroupForm = ({ className, setOpen }) => {
  const { toast } = useToast();
  const { tempUser, setTempUser } = useZustandStore();
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupId, setNewGroupId] = useState("");
  const [groupUrl, setGroupUrl] = useState("https:/......");
  const { inGroup, ...userForGroup } = tempUser;
  const isNoUrl = groupUrl === "https:/......";
  const INITIAL_GROUP = {
    groupName: "",
    groupId: "",
    users: [userForGroup],
    expenses: [],
    totalBill: {},
    flow: [],
    history: [],
  };
  const handleCopyURL = async (hashedUrl) => {
    try {
      if (isNoUrl) return;
      await navigator.clipboard.writeText(hashedUrl);
      setIsUrlCopied(true);
    } catch (error) {
      console.log(error);
      setIsUrlCopied(false);
    }
  };
  function handleGetGroupUrl(e) {
    e.preventDefault();
    const id = uuidv4();
    setNewGroupId(id);
    const url = `${window.location.origin}?id=${id}`;
    setGroupUrl(url);
  }
  async function handleGroupSubmit(e) {
    e.preventDefault();
    try {
      const newTempUser = {
        ...tempUser,
        inGroup: { ...inGroup, [newGroupId]: newGroupName },
      };
      setTempUser(newTempUser);
      const newGroupData = {
        ...INITIAL_GROUP,
        groupName: newGroupName,
        groupId: newGroupId,
      };
      await addDocWithId(tempUser.uid, "users", newTempUser);
      await addDocWithId(newGroupId, "groups", newGroupData);
      setOpen(false);
      toast({ title: "新增成功" });
    } catch (error) {
      toast({ title: "新增失敗" });
      console.log(error);
    }
  }
  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={(e) => handleGroupSubmit(e)}
    >
      <div className="grid gap-2">
        <Label htmlFor="groupName">名稱</Label>
        <Input
          required
          id="groupName"
          placeholder="吃貨群組（限15字以內）"
          maxLength="15"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <Button
          variant={newGroupId ? "secondary" : ""}
          onClick={(e) => handleGetGroupUrl(e)}
        >
          生成群組連結
        </Button>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">連結</Label>
        <div className="flex">
          <p className="flex h-14  w-[calc(100%-40px)]  rounded-md border border-slate-200 bg-white px-3 py-2 text-sm  ">
            {groupUrl}
          </p>
          <Button
            disabled={isNoUrl}
            className="h-14 xl:h-14"
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              handleCopyURL(groupUrl);
            }}
          >
            <Popover>
              <PopoverTrigger>
                <LinkIcon className="h-4" />
              </PopoverTrigger>
              <PopoverContent className="w-[150px] text-sm">
                {isUrlCopied ? "連結已複製" : "複製失敗"}
              </PopoverContent>
            </Popover>
          </Button>
        </div>
      </div>
      <Button disabled={!newGroupId ? true : false} type="submit">
        完成
      </Button>
    </form>
  );
};

export default AddGroupForm;
