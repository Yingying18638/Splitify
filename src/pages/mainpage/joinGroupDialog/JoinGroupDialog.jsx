import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  addDocWithId,
  justGetData,
  updateOneField,
} from "@/utility/handleFirestore";
import useZustandStore from "@/utility/hooks/useZustandStore";
const JoinGroupDialog = ({ isGrpDialogOpen, setIsGrpDialogOpen }) => {
  const { tempUser, setTempUser } = useZustandStore();
  const { uid } = tempUser;
  const [grpNameToJoin, setGrpNameToJoin] = useState("");
  useEffect(() => {
    async function getGrpName() {
      try {
        const gId = localStorage.getItem("groupIdCreated");
        const grpData = await justGetData("groups", gId);
        const grpName = grpData?.groupName;
        setGrpNameToJoin(grpName);
      } catch (e) {
        console.log(e);
      }
    }
    getGrpName();
  }, []);
  async function handleJoinGroup() {
    const gId = localStorage.getItem("groupIdCreated");
    const { inGroup, ...dataForGrp } = tempUser;
    const dataForUsr = {
      ...tempUser,
      inGroup: { ...inGroup, [gId]: grpNameToJoin },
    };
    // update group and user data
    await updateOneField("groups", gId, "users", dataForGrp);
    await addDocWithId(uid, "users", dataForUsr);
    // setState
    setTempUser(dataForUsr);
    handleCloseModal();
  }
  function handleCloseModal() {
    localStorage.removeItem("groupIdCreated");
    setIsGrpDialogOpen(false);
  }
  return (
    <Dialog
      defaultOpen
      open={isGrpDialogOpen}
      onOpenChange={setIsGrpDialogOpen}
    >
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>要加入{grpNameToJoin}嗎？</DialogTitle>
          <DialogDescription>加入後即可參與分帳</DialogDescription>
        </DialogHeader>
        <Button variant="secondary" onClick={handleCloseModal}>
          取消
        </Button>
        <Button onClick={handleJoinGroup}>好</Button>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupDialog;
