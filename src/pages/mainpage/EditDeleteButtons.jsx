import React from "react";
import { Button } from "../../components/ui/button";
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

function EditDeleteButtons({ handleEditExpense, handleDeleteExpense, time }) {
  return (
    <div className="md:self-center  left-36  sm:left-48">
      <Button variant="secondary" className='' onClick={() => handleEditExpense(time)}>
        編輯
      </Button>
     
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" className='' >刪除</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除這筆帳目嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              帳目刪除後將無法復原，也會直接重新結算
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteExpense(time)}>
              確定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
export { EditDeleteButtons };
