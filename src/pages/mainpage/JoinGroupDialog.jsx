import React from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const JoinGroupDialog = () => {
  return (
    <Dialog defaultOpen>
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
          <DialogTitle>要加入ＸＸＸ群組嗎？</DialogTitle>
          <DialogDescription>加入後即可參與分帳</DialogDescription>
        </DialogHeader>
        <Button variant="secondary">取消</Button>
        <Button>好</Button>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupDialog;
