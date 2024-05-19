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
import { Button } from "@/components/ui/button";
import { BadgeAlert } from "lucide-react";
import React from "react";

import useZustandStore from "@/utility/hooks/useZustandStore";
const ClearBtn = ({ handleClear }) => {
  const { group } = useZustandStore();
  const { expenses } = group;
  return (
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
  );
};

export default ClearBtn;
