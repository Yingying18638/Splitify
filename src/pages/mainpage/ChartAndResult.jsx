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
import { HandCoins, ChevronsRight } from "lucide-react";

export default function ChartAndResult() {
  const [openResult, setOpenResult] = useState(false);
  const isDesktop = window.innerWidth >= 768;
  if (isDesktop) {
    return (
      <Dialog open={openResult} onOpenChange={setOpenResult}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <HandCoins className="mr-1"></HandCoins>錢怎麼給
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[425px] max-h-[80vh] w-[50vw] block">
          <DialogHeader className="mb-5">
            <DialogTitle className='text-center'>錢怎麼給</DialogTitle>
            <DialogDescription className='text-center'>誰要給誰多少錢</DialogDescription>
          </DialogHeader>  <div className="mt-12">
            <Result></Result>
          </div>
          <div className="max-w-[360px] mx-auto mt-10">
            <Chart></Chart>
          </div>
        
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={openResult} onOpenChange={setOpenResult}>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <HandCoins className="mr-1"></HandCoins>錢怎麼給
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[60vh]">
        <DrawerHeader className="">
          <DrawerTitle>錢怎麼給</DrawerTitle>
          <DrawerDescription>誰要給誰多少錢</DrawerDescription>
        </DrawerHeader>
       
        <Result></Result> <div className="w-[360px] mx-auto mt-10">
          <Chart></Chart>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="secondary">關閉</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
