import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useZustandStore from "@/utility/hooks/useZustandStore";
import { HandCoins, Smile } from "lucide-react";
import { useState } from "react";
import { Chart } from "./Chart";
import Result from "./Result";

export default function ChartAndResult() {
  const { group } = useZustandStore();
  const { users } = group;
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
            <DialogTitle className="text-center">錢怎麼給</DialogTitle>
            <DialogDescription className="text-center">
              誰要給誰多少錢
            </DialogDescription>
          </DialogHeader>{" "}
          <div className="mt-12">
            {users.length > 1 ? (
              <Result />
            ) : (
              <div className="justify-center flex flex-wrap gap-1">
                <p>群組只有一位成員</p> <Smile />
              </div>
            )}
          </div>
          <div className="max-w-[360px] mx-auto mt-10">
            {users.length > 1 ? <Chart /> : ""}
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
        {users.length > 1 ? (
          <Result />
        ) : (
          <div className="justify-center flex flex-wrap gap-1">
            <p>群組只有一位成員</p> <Smile />
          </div>
        )}
        <div className="w-[360px] mx-auto mt-10">
          {users.length > 1 ? <Chart /> : ""}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">關閉</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
