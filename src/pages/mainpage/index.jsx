import React, { useState } from "react";
//---------------------- functions and hooks --------------------------------
import { Toaster } from "@/components/ui/toaster";
import getExpensesArranged from "@/utility/getExpensesArranged";
import useUserData from "@/utility/hooks/useUserData";
import useZustandStore from "@/utility/hooks/useZustandStore";
import { useAuth, useUser } from "@clerk/clerk-react";
//----------------------component------------------------------------------------
import Record from "./detailAndRecord/Record";
import ExpenseForm from "./expenseForm";
import JoinGroupDialog from "./joinGroupDialog/JoinGroupDialog";
import SideBar from "./sideBar/SideBar";
import ToolBar from "./toolBar";
//---------------------- shadcn ui------------------------------------------------
import { Button } from "@/components/ui/button";
import { ChevronsDown, ChevronsUp, Smile } from "lucide-react";
const Mainpage = ({
  isSideBarOpen,
  setIsSideBarOpen,
  sideBarClass,
  setSideBarClass,
}) => {
  const { group, tempGroupId } = useZustandStore();
  const { expenses, history } = group;
  const initialDetailDisplay = expenses?.reduce((acc, cur) => {
    const { time } = cur;
    acc[time] = "hidden";
    return acc;
  }, {});
  const [displayAddExpense, setDisplayAddExpense] = useState("hidden");
  const [isEditingExpense, setIsEditingExpense] = useState(false);
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
  const indexOfAt = email.indexOf("@");
  const emailName = email.substring(0, indexOfAt);
  const userObj = {
    uid: userId,
    name: fullName || username || emailName,
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
        />
        <div
          className=" mt-20 mx-auto w-[99%] xs:w-[340px] sm:w-[600px]  md:ml-[calc((100%-600px)/2+80px)] 
          xl:w-[750px] xl:ml-[calc((100%-750px)/2+7rem)] xl:text-lg
          flex flex-col items-center justify-center  flex-wrap "
        >
          <section className="w-full">
            <ToolBar
              displayHistory={displayHistory}
              setDisplayHistory={setDisplayHistory}
              setDisplayAddExpense={setDisplayAddExpense}
            />
            <div className="mt-24">
              {expenses.length ? (
                <Record
                  setIsEditingExpense={setIsEditingExpense}
                  setDisplayHistory={setDisplayHistory}
                  expensesArrToRender={expensesArrToRender}
                  displayDetail={displayDetail}
                  setDisplayDetail={setDisplayDetail}
                  setDisplayAddExpense={setDisplayAddExpense}
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
              setDisplayAddExpense={setDisplayAddExpense}
            />
          </section>
        </div>
        <Toaster />
        <ExpenseForm
          isEditingExpense={isEditingExpense}
          setIsEditingExpense={setIsEditingExpense}
          displayAddExpense={displayAddExpense}
          setDisplayAddExpense={setDisplayAddExpense}
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
