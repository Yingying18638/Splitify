import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Link as LinkIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { addDocWithId, useListenUsers } from "../../utility/handleFirestore";
import useStore from "../../utility/hooks/useStore";
const AddGroupForm = ({ className }) => {
  const { tempUser, setTempUser } = useStore();
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupId, setNewGroupId] = useState("");
  const { inGroup, ...userForGroup } = tempUser;
  const INITIANL_GROUP = {
    groupName: "",
    groupId: "",
    users: [userForGroup],
    expenses: [],
    totalBill: {},
    flow: [],
    history: [],
  };
  useListenUsers();
  function handleGetGroupUrl(e) {
    e.preventDefault();
    const id = uuidv4();
    setNewGroupId(id);
  }
  async function handleGroupSubmit(e) {
    e.preventDefault();
    const newTempUser = {
      ...tempUser,
      inGroup: { ...inGroup, [newGroupId]: newGroupName },
    };
    setTempUser(newTempUser);
    const newGroupData = {
      ...INITIANL_GROUP,
      groupName: newGroupName,
      groupId: newGroupId,
    };

    await addDocWithId(tempUser.uid, "users", newTempUser);
    await addDocWithId(newGroupId, "groups", newGroupData);
    console.log(newGroupData);
    alert("新增成功");
  }
  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={(e) => handleGroupSubmit(e)}
    >
      <div className="grid gap-2">
        <Label htmlFor="groupName">名稱</Label>
        <Input
          id="groupName"
          placeholder="吃貨群組"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <Button variant="secondary" onClick={(e) => handleGetGroupUrl(e)}>
          生成群組連結
        </Button>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">連結</Label>
        <div className="flex">
          <p className="flex h-10 w-[calc(100%-40px)] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300">
            https:/......
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button>確認</Button>
    </form>
  );
};

export default AddGroupForm;
