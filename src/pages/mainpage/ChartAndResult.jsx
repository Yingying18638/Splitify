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
import { useState } from "react";
import { Chart } from "./Chart";
import Result from "./Result";
import { HandCoins } from "lucide-react";

export default function ChartAndResult() {
  const [openResult, setOpenResult] = useState(false);
  const isDesktop = window.innerWidth >= 768;
  if (isDesktop) {
    return (
      <Dialog open={openResult} onOpenChange={setOpenResult}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
          >
            <HandCoins className="mr-1"></HandCoins>錢怎麼給
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>錢怎麼給</DialogTitle>
            <DialogDescription>誰要給誰多少錢</DialogDescription>
          </DialogHeader>
          <Chart></Chart>
          <Result></Result>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={openResult} onOpenChange={setOpenResult}>
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
        >
          <HandCoins className="mr-1"></HandCoins>錢怎麼給
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>錢怎麼給</DrawerTitle>
          <DrawerDescription>誰要給誰多少錢</DrawerDescription>
        </DrawerHeader>
       <div className="w-[360px] mx-auto"> <Chart></Chart></div>
        <Result></Result>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="secondary">關閉</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
