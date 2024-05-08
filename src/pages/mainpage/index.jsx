import React, { useState, useEffect } from "react";
//---------------------- functions and hooks --------------------------------
import useStore from "../../utility/hooks/useStore";
import getExpensesArranged from "../../utility/getExpensesArranged";
import { useUser, useAuth } from "@clerk/clerk-react";
import {
  useUserData,
  useCheckUrlSetDialog,
} from "../../utility/handleFirestore";
import startGuide from "../../utility/userGuide";
//----------------------component------------------------------------------------
import LittleHeader from "./LittleHeader";
import AddExpense from "./AddExpense";
import Record from "./Record";
import EditExpense from "./EditExpense";
import SideBar from "./SideBar";
import { DrawerDialogDemo } from "./DrawerDialogDemo";
import JoinGroupDialog from "./JoinGroupDialog";
//---------------------- shadcn ui------------------------------------------------
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
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
  const [imgSrc, setImgSrc] = useState("");
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
  console.log(user, "來自clerk");
  const userObj = {
    uid: userId,
    name: fullName || username,
    email,
    img: imageUrl,
    inGroup: {},
  };
  useUserData(userId, userObj, setIsGrpDialogOpen);
  // useCheckUrlSetDialog(setIsGrpDialogOpen);
  return (
    <>
      <main className="min-h-screen bg-[#fefae0]">
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          sideBarClass={sideBarClass}
          setSideBarClass={setSideBarClass}
        ></SideBar>
        <Tabs
          defaultValue="account"
          className=" mt-20 mx-auto  w-[360px] sm:w-[600px]  md:ml-[calc((100%-600px)/2+80px)] flex flex-col items-center justify-center  flex-wrap "
          // className='w-[360px] sm:w-[600px] mt-20 mx-auto md:ml-[calc((100%-600px)/2+80px)]   flex flex-col items-center justify-center  flex-wrap '
        >
          <section value="account" className="w-full">
            <LittleHeader
              displayAddExpense={displayAddExpense}
              setDisplayAddExpense={setDisplayAddExpense}
            />
            <div className="mt-24">
              {expenses.length ? (
                <Record
                  expensesArrToRender={expensesArrToRender}
                  displayDetail={displayDetail}
                  setDisplayDetail={setDisplayDetail}
                  setDisplayEditExpense={setDisplayEditExpense}
                  children={true}
                />
              ) : tempGroupId ? (
                <p className="text-center">目前尚無花費！</p>
              ) : (
                ""
              )}
            </div>
            {clearedExpensesToRender.length !== 0 && (
              <p
                className="block w-32 tracking-wide mx-auto my-3 hover:underline hover:bg-[#FBECCC] p-1 rounded-md cursor-pointer "
                onClick={handleDisplayHistory}
              >
                {displayHistory?.text}已結清紀錄
              </p>
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
