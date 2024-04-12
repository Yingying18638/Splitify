import React from "react";
import LittleHeader from "./LittleHeader";
import list from "../../assets/list.png";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";

const Mainpage = () => {
  return (
    <>
      <main className="p-5">
        <div className="bg-green-100 w-40 h-40 fixed top-44 left-6 hidden md:block "></div>
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
          </TabsList>
          <TabsContent value="groups">groups.</TabsContent>
          <TabsContent value="account">
            <LittleHeader />
            <section>
              <article className="flex flex-wrap mt-3">
                <figure>
                  <img src={list} alt="icon" />
                </figure>
                <figcaption className="ml-2 w-[200px] md:w-[400px]">
                  <p>青菜</p>
                  <p>挖泥尼先付300元</p>
                </figcaption>
                <div className="sm:ml-4">NT 300元</div>
              </article>
              <article className="flex flex-wrap mt-3">
                <figure>
                  <img src={list} alt="icon" />
                </figure>
                <figcaption className="ml-2 w-[200px] md:w-[400px]">
                  <p>青菜</p>
                  <p>挖泥尼哇哇嗚哇啊啊哇先付300元</p>
                </figcaption>
                <div className="sm:ml-4">NT 300元</div>
              </article>
            </section>
          </TabsContent>
          <TabsContent value="calculation">
            <LittleHeader />
            calculation.
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default Mainpage;

/*

<section className="fixed top-96 bg-slate-500">
          <div>新增花費</div>
          <div>日期</div>
          <figure>
            <img src="" alt="icon" />
          </figure>
          <form action="">
            <label htmlFor="item">項目</label>
            <input type="text" name="" id="item" />
            <label htmlFor="amount">金額</label>
            <input type="text" name="" id="amount" />
            <label htmlFor="payer">誰付錢</label>
            <select name="" id="payer">
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
            <label htmlFor="participant">分給誰</label>
            <input type="text" name="" id="participant" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="備註"
            ></textarea>
            <Button className="bg-slate-400"> 取消</Button>
            <Button>儲存</Button>
          </form>
        </section>
*/
