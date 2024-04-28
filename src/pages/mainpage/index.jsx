import React, { useState, useEffect } from "react";
//---------------------- functions and hooks --------------------------------
import useStore from "../../utility/hooks/useStore";
import getExpensesArranged from "../../utility/getExpensesArranged";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useClerkDataToFirestore } from "../../utility/handleFirestore";
//----------------------component------------------------------------------------
import LittleHeader from "./LittleHeader";
import AddExpense from "./AddExpense";
import Record from "./Record";
import EditExpense from "./EditExpense";
import Result from "./Result";
import { Chart } from "./Chart";
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
  const { group, setTempUser, setTempGroupId } = useStore();
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
  const { fullName, imageUrl, emailAddresses } = user && user;
  const email = emailAddresses[0].emailAddress;
  const userObj = {
    uid: userId,
    name: fullName,
    email,
    img: imageUrl,
    inGroup: {},
  };
  useClerkDataToFirestore(userId, userObj, setTempUser, setTempGroupId);
  return (
    <>
      <main className="">
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          sideBarClass={sideBarClass}
          setSideBarClass={setSideBarClass}
        ></SideBar>
        <Tabs
          defaultValue="account"
          className="w-[360px] md:w-[600px] mt-16 pt-4 mx-auto flex flex-col items-center justify-center flex-wrap"
        >
          <TabsList>
            <TabsTrigger value="account" className="w-32">
              帳目
            </TabsTrigger>
            <TabsTrigger value="calculation" className="w-32">
              結算
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <LittleHeader
              displayAddExpense={displayAddExpense}
              setDisplayAddExpense={setDisplayAddExpense}
            />
            <Record
              expensesArrToRender={expensesArrToRender}
              displayDetail={displayDetail}
              setDisplayDetail={setDisplayDetail}
              setDisplayEditExpense={setDisplayEditExpense}
              children={true}
            />
            <p
              className="block w-32  mx-auto mt-5"
              onClick={handleDisplayHistory}
            >
              {displayHistory?.text}已結清紀錄
            </p>
            <Record
              displayHistory={displayHistory}
              expensesArrToRender={clearedExpensesToRender}
              displayDetail={displayDetail}
              setDisplayDetail={setDisplayDetail}
              setDisplayEditExpense={setDisplayEditExpense}
            />
          </TabsContent>
          <TabsContent value="calculation">
            <LittleHeader
              displayAddExpense={displayAddExpense}
              setDisplayAddExpense={setDisplayAddExpense}
            />
            <Chart />
            <Result />
          </TabsContent>
        </Tabs>
        <AddExpense
          displayAddExpense={displayAddExpense}
          setDisplayAddExpense={setDisplayAddExpense}
        />
        <EditExpense
          displayEditExpense={displayEditExpense}
          setDisplayEditExpense={setDisplayEditExpense}
        />
        <JoinGroupDialog></JoinGroupDialog>
      </main>
    </>
  );
};

export default Mainpage;
