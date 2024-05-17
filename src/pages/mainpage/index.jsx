import React, { useState } from "react";
//---------------------- functions and hooks --------------------------------
import { Toaster } from "@/components/ui/toaster";
import { useAuth, useUser } from "@clerk/clerk-react";
import getExpensesArranged from "../../utility/getExpensesArranged";
import {
  useUserData,
} from "../../utility/handleFirestore";
import useStore from "../../utility/hooks/useStore";
//----------------------component------------------------------------------------
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import JoinGroupDialog from "./JoinGroupDialog";
import LittleHeader from "./LittleHeader";
import Record from "./Record";
import SideBar from "./SideBar";
//---------------------- shadcn ui------------------------------------------------
import { ChevronsDown, ChevronsUp, Smile } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Tabs,
} from "../../components/ui/tabs";
const Mainpage = ({
  isSideBarOpen,
  setIsSideBarOpen,
  sideBarClass,
  setSideBarClass,
}) => {
  const { group, setTempUser, setTempGroupId, tempGroupId } = useStore();
  const { expenses, history } = group;
  const initialDetailDisplay = expenses?.reduce((acc, cur) => {
    const { time } = cur;
    acc[time] = "hidden";
    return acc;
  }, {});
  const [displayAddExpense, setDisplayAddExpense] = useState("hidden");
  const [displayEditExpense, setDisplayEditExpense] = useState("hidden");
  const [displayDetail, setDisplayDetail] = useState(initialDetailDisplay);
  const [displayHistory, setDisplayHistory] = useState({
    display: "hidden",
    text: "查看",
  });
  const [isGrpDialogOpen, setIsGrpDialogOpen] = useState(false);
  const expensesArrToRender = getExpensesArranged(expenses);
  const clearedExpensesToRender = getExpensesArranged(history);
  function handleDisplayHistory() {
    if (displayHistory?.display === "hidden") {
      setDisplayHistory({ display: "block", text: "收起" });
    } else {
      setDisplayHistory({ display: "hidden", text: "查看" });
    }
  }
  //get user from clerk
  const userId = useAuth()?.userId;
  const user = useUser()?.user;
  const { fullName, imageUrl, emailAddresses, username } = user && user;
  const email = emailAddresses[0].emailAddress;
  const userObj = {
    uid: userId,
    name: fullName || username,
    email,
    img: imageUrl,
    inGroup: {},
  };
  useUserData(userId, userObj, setIsGrpDialogOpen);
  return (
    <>
      <main className="min-h-[calc(100vh-80px)] bg-[#fefae0] ">
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          sideBarClass={sideBarClass}
          setSideBarClass={setSideBarClass}
        ></SideBar>
        <Tabs
          defaultValue="account"
          className=" mt-20 mx-auto  w-[360px] sm:w-[600px]  md:ml-[calc((100%-600px)/2+80px)] 
          xl:w-[750px] xl:ml-[calc((100%-750px)/2+7rem)] xl:text-lg
          flex flex-col items-center justify-center  flex-wrap "
        >
          <section value="account" className="w-full">
            <LittleHeader
              displayHistory={displayHistory}
              setDisplayHistory={setDisplayHistory}
              setDisplayAddExpense={setDisplayAddExpense}
            />
            <div className="mt-24">
              {expenses.length ? (
                <Record
                  setDisplayHistory={setDisplayHistory}
                  expensesArrToRender={expensesArrToRender}
                  displayDetail={displayDetail}
                  setDisplayDetail={setDisplayDetail}
                  setDisplayEditExpense={setDisplayEditExpense}
                  children={true}
                />
              ) : tempGroupId ? (
                <p className="justify-center flex gap-1 p-2">
                  目前尚無新花費
                  <Smile />
                </p>
              ) : (
                ""
              )}
            </div>
            {clearedExpensesToRender.length !== 0 && (
              <Button
                variant="secondary"
                className="flex  tracking-wide mx-auto my-3  rounded-md  "
                onClick={handleDisplayHistory}
              >
                {displayHistory?.text === "查看" ? (
                  <ChevronsDown />
                ) : (
                  <ChevronsUp />
                )}
                {displayHistory?.text}已結清紀錄
              </Button>
            )}
            <Record
              displayHistory={displayHistory}
              expensesArrToRender={clearedExpensesToRender}
              displayDetail={displayDetail}
              setDisplayDetail={setDisplayDetail}
              setDisplayEditExpense={setDisplayEditExpense}
            />
          </section>
        </Tabs>
        <Toaster></Toaster>
        <AddExpense
          displayAddExpense={displayAddExpense}
          setDisplayAddExpense={setDisplayAddExpense}
        />
        <EditExpense
          displayEditExpense={displayEditExpense}
          setDisplayEditExpense={setDisplayEditExpense}
        />
        {isGrpDialogOpen ? (
          <JoinGroupDialog
            isGrpDialogOpen={isGrpDialogOpen}
            setIsGrpDialogOpen={setIsGrpDialogOpen}
          />
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Mainpage;
