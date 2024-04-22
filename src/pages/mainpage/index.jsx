import React, { useState } from "react";
//---------------------- zustand
import useStore from "../../utility/hooks/useStore";
import getExpensesArranged from "../../utility/getExpensesArranged";
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
  const { group } = useStore();
  const { expenses } = group;
  const initialDetailDisplay = expenses.reduce((acc, cur) => {
    const { time } = cur;
    acc[time] = "hidden";
    return acc;
  }, {});
  console.log(initialDetailDisplay, "initialDetailDisplay");
  const [displayAddExpense, setDisplayAddExpense] = useState("hidden");
  const [displayDetail, setDisplayDetail] = useState(initialDetailDisplay);
  const [imgSrc, setImgSrc] = useState("");
  const expensesObjToRender = getExpensesArranged(expenses);
  // console.log(expensesObjToRender, "我是arranged expenses");
  const expensesArrToRender = Object.entries(expensesObjToRender);
  return (
    <>
      <main className="p-5">
        {/* <div className="bg-green-100 w-40 h-full fixed top-0 left-0 hidden md:block ">
          <nav className="p-10">
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
        </div> */}
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
            <div className="">
              {expensesArrToRender.map(([date, expenses]) => {
                return (
                  <div key={date}>
                    <h2>{date}</h2>
                    {expenses.map((exp) => {
                      const {
                        item,
                        time,
                        date,
                        total_amount,
                        singlePayerOnly,
                        morePayers,
                        note,
                        img,
                        ave,
                      } = exp;

                      return (
                        <fieldset
                          key={time}
                          id={time}
                          onClick={(e) => {
                            if (displayDetail?.[time] === "hidden") {
                              setDisplayDetail({
                                ...displayDetail,
                                [time]: "block",
                              });
                            } else {
                              setDisplayDetail({
                                ...displayDetail,
                                [time]: "hidden",
                              });
                            }
                          }}
                        >
                          <div className="flex flex-wrap mt-3 cursor-pointer">
                            <figure>
                              <img src={list} alt="icon" />
                            </figure>
                            <figcaption className="ml-2 w-[200px] md:w-[400px]">
                              <p>{item}</p>
                              <p>
                                {singlePayerOnly}先付{total_amount}元
                              </p>
                              <p className="text-xs text-slate-400">{date}</p>
                            </figcaption>
                            <div className="sm:ml-4">NT {total_amount}元</div>
                          </div>
                          <article
                            className={`ml-20 w-[320px] ${displayDetail?.[time]}`}
                          >
                            <div className="flex flex-wrap flex-col mt-3">
                              <figcaption className="w-[200px] md:w-[400px]">
                                {Object.entries(ave).map(([name, amount]) => {
                                  return (
                                    <>
                                      <p>
                                        {name}應負擔{amount}元
                                      </p>
                                    </>
                                  );
                                })}
                              </figcaption>

                              <figure className="flex flex-wrap gap-2">
                                <div className="text-slate-500 text-sm">
                                  <p className="text-slate-500 text-sm">
                                    挖泥尼在20240414建立
                                  </p>
                                  <p className="text-slate-500 text-sm">
                                    {note}
                                  </p>
                                </div>
                                <div className="w-40 h-20 bg-slate-200">
                                  <img alt="圖片" />
                                </div>
                              </figure>
                              <div className="md:self-center">
                                <Button>編輯</Button>
                                <Button>刪除</Button>
                              </div>
                            </div>
                          </article>
                        </fieldset>
                      );
                    })}
                  </div>
                );
              })}
            </div>
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
          setDisplayAddExpense={setDisplayAddExpense}
        />
      </main>
    </>
  );
};

export default Mainpage;
