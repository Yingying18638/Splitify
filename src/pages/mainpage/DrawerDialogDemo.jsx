import * as React from "react";
import AddGroupForm from "./AddGroupForm";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

export function DrawerDialogDemo({ btnClass }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = window.innerWidth >= 768;
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {/* <Button variant="outline" className="relative z-50 left-10"> */}
          <Button
            variant="secondary"
            className={btnClass ? "fixed" : "relative z-50 left-10 mt-6"}
          >
            建立群組
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>建立群組</DialogTitle>
            <DialogDescription>
              分享群組連結給好友，登入後立即加入群組！
            </DialogDescription>
          </DialogHeader>
          <AddGroupForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className={btnClass ? "fixed" : "relative z-50 left-10 mt-6"}
        >
          建立群組
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>建立群組</DrawerTitle>
          <DrawerDescription>
            分享群組連結給好友，登入後即加入群組！
          </DrawerDescription>
        </DrawerHeader>
        <AddGroupForm className="px-4" setOpen={setOpen}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">取消</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
