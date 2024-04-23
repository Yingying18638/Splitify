import React, { useState } from "react";
//---------------------- zustand
import useStore from "../../utility/hooks/useStore";
import getExpensesArranged from "../../utility/getExpensesArranged";
//----------------------component
import LittleHeader from "./LittleHeader";
import AddExpense from "./AddExpense";
import DetailedExpenses from "./DetailedExpenses";
//---------------------- shadcn ui
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
  const [displayDetail, setDisplayDetail] = useState(initialDetailDisplay);
  const [imgSrc, setImgSrc] = useState("");
  const expensesArrToRender = getExpensesArranged(expenses);
  return (
    <>
      <main className="p-5">
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
            />
          </TabsContent>
          <TabsContent value="calculation">
            <LittleHeader
              displayAddExpense={displayAddExpense}
              setDisplayAddExpense={setDisplayAddExpense}
            />
            calculation.
          </TabsContent>
          {/* <TabsContent value="friend">好友</TabsContent> */}
        </Tabs>
        <AddExpense
          displayAddExpense={displayAddExpense}
          setDisplayAddExpense={setDisplayAddExpense}
        />
      </main>
    </>
  );
};

export default Mainpage;
