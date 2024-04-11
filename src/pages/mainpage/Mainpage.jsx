import React from "react";
import LittleHeader from "./LittleHeader";
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
                  <img src="" alt="icon" />
                </figure>
                <figcaption className="ml-2 w-[200px] md:w-[400px]">
                  <p>青菜</p>
                  <p>挖泥尼先付300元</p>
                </figcaption>
                <div className="sm:ml-4">NT 300元</div>
              </article>
              <article className="flex flex-wrap mt-3">
                <figure>
                  <img src="" alt="icon" />
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
