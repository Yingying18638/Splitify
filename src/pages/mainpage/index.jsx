import React, { useState } from "react";
//---------------------- zustand
import useStore from "../../utility/useStore";
//----------------------image
import list from "../../assets/list.png";
//----------------------component
import LittleHeader from "./LittleHeader";
import AddExpense from "./AddExpense";
//---------------------- shadcn ui
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
const Mainpage = () => {
  const [displayAddExpense, setDisplayAddExpense] = useState("hidden");
  const [displayDetail, setDisplayDetail] = useState("hidden");
  const { expenseData, setExpenseData } = useStore();
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(expenseData.item);
    setDisplayAddExpense("hidden");
    // setExpenseData({});
  }

  return (
    <>
      <main className="p-5 min-h-[1200px]">
        <div className="bg-green-100 w-40 h-40 fixed top-44 left-6 hidden md:block ">
          <div>群組</div>
          {/* <div>好友</div> */}
        </div>
        <Tabs
          defaultValue="account"
          className="w-[360px] md:w-[600px]   mt-20 mx-auto flex flex-col items-center justify-center flex-wrap"
        >
          <TabsList>
            <TabsTrigger value="groups" className="w-32 md:hidden">
              群組
            </TabsTrigger>
            <TabsTrigger value="account" className="w-32">
              帳目
            </TabsTrigger>
            <TabsTrigger value="calculation" className="w-32">
              結算
            </TabsTrigger>
            {/* <TabsTrigger value="friend" className="w-32">
              好友
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="groups">groups.</TabsContent>
          <TabsContent value="account">
            <LittleHeader
              displayAddExpense={displayAddExpense}
              setDisplayAddExpense={setDisplayAddExpense}
            />
            <section>
              <h2>2024-4-14</h2>
              <div className="flex flex-wrap mt-3 cursor-pointer">
                <figure>
                  <img src={list} alt="icon" />
                </figure>
                <figcaption className="ml-2 w-[200px] md:w-[400px]">
                  <p>青菜</p>
                  <p>挖泥尼先付300元</p>
                  <p className="text-xs text-slate-400">2024-4-14</p>
                </figcaption>
                <div className="sm:ml-4">NT 300元</div>
              </div>
              <article className={`ml-20 w-[320px] ${displayDetail}`}>
                <div className="flex flex-wrap flex-col mt-3">
                  <figcaption className="w-[200px] md:w-[400px]">
                    <p>a欠款100元</p>
                    <p>b欠款100元</p>
                  </figcaption>

                  <figure className="flex flex-wrap gap-2">
                    <div className="text-slate-500 text-sm">
                      <p className="text-slate-500 text-sm">
                        挖泥尼在20240414建立
                      </p>
                      <p className="text-slate-500 text-sm">
                        這是挖泥尼的備註，不要加香菜
                      </p>
                    </div>
                    <div className="w-40 h-20 bg-slate-200">圖片</div>
                  </figure>
                  <div className="md:self-center">
                    <Button>編輯</Button>
                    <Button>刪除</Button>
                  </div>
                </div>
              </article>
              {/* <div className="flex flex-wrap mt-3">
                <figure>
                  <img src={list} alt="icon" />
                </figure>
                <figcaption className="ml-2 w-[200px] md:w-[400px]">
                  <p>青菜</p>
                  <p>挖泥尼哇哇嗚哇啊啊哇先付300元</p>
                </figcaption>
                <div className="sm:ml-4">NT 300元</div>
              </div> */}
            </section>
            <p className="text-center">查看已結清紀錄</p>
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
          handleFormSubmit={handleFormSubmit}
        />
      </main>
    </>
  );
};

export default Mainpage;
