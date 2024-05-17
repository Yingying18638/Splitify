import groupImg from "@/assets/group2.png";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useStore from "@/utility/hooks/useStore";
import {
    CircleUserRound
} from "lucide-react";
import React from "react";
const Member = ({ handleRemoveMember,openMember,setOpenMember}) => {
  const { group } = useStore();
  const { expenses, users } = group;
  function getImg(name) {
    const user = users.find((item) => item.name === name);
    return user?.img;
  }
  return (
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
                    <AlertDialogTitle>確定要移除{name}嗎？</AlertDialogTitle>
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
  );
};

export default Member;
