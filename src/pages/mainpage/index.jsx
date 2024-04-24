import React, { useState } from "react";
//---------------------- functions and hooks --------------------------------
import useStore from "../../utility/hooks/useStore";
import getExpensesArranged from "../../utility/getExpensesArranged";
//----------------------component------------------------------------------------
import LittleHeader from "./LittleHeader";
import AddExpense from "./AddExpense";
import DetailedExpenses from "./DetailedExpenses";
import EditExpense from "./EditExpense";
import Result from "./Result";
//---------------------- shadcn ui------------------------------------------------
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
const Mainpage = () => {
  const { group } = useStore();
  const { expenses } = group;
  const initialDetailDisplay = expenses?.reduce((acc, cur) => {
    const { time } = cur;
    acc[time] = "hidden";
    return acc;
  }, {});
  const [displayAddExpense, setDisplayAddExpense] = useState("hidden");
  const [displayEditExpense, setDisplayEditExpense] = useState("hidden");
  const [displayDetail, setDisplayDetail] = useState(initialDetailDisplay);
  const [imgSrc, setImgSrc] = useState("");
  const expensesArrToRender = getExpensesArranged(expenses);
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
            <DetailedExpenses
              expensesArrToRender={expensesArrToRender}
              displayDetail={displayDetail}
              setDisplayDetail={setDisplayDetail}
              displayEditExpense={displayEditExpense}
              setDisplayEditExpense={setDisplayEditExpense}
            />
          </TabsContent>
          <TabsContent value="calculation">
            <LittleHeader
              displayAddExpense={displayAddExpense}
              setDisplayAddExpense={setDisplayAddExpense}
            />
            <Result></Result>
          </TabsContent>
          {/* <TabsContent value="friend">好友</TabsContent> */}
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
