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
//---------------------- shadcn ui------------------------------------------------
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
const Mainpage = () => {
  const { group } = useStore();
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
    groupIds: [],
  };
  useClerkDataToFirestore(userId, userObj);
  return (
    <>
      <main className="p-5">
        <div className="bg-green-100 w-40 h-full fixed  top-0 left-0 hidden md:block ">
          <nav className="pt-20 pl-10">
            <div>
              群組
              <div className="pt-5 pl-2">group1</div>
              <div className="pt-5 pl-2">group2</div>
            </div>
            <div className="pt-5">
              好友
              <div className="pt-5 pl-2">friend1</div>
              <div className="pt-5 pl-2">friend2</div>
            </div>
          </nav>
        </div>

        <Tabs
          defaultValue="account"
          className="w-[360px] md:w-[600px] mt-20 mx-auto flex flex-col items-center justify-center flex-wrap"
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
      </main>
    </>
  );
};

export default Mainpage;
