import React, { useState } from "react";
import LittleHeader from "./LittleHeader";
import list from "../../assets/list.png";
import arrow from "../../assets/arrow.png";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import DatePicker from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";

const Mainpage = () => {
  const [displayAddExpense, setDisplayAddExpense] = useState("hidden");
  const [displayPayersOpt, setDisplayPayersOpt] = useState("hidden");
  const [displayParticipantOpt, setDisplayParticipantOpt] = useState("hidden");
  const [x, setX] = useState(5);
  const [formData, setFormData] = useState({ participants: "a" });
  function handleFormSubmit(e) {
    e.preventDefault();
    setDisplayAddExpense("hidden");
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
        <form
          method="post"
          encType="multipart/form-data"
          action=""
          className={`${displayAddExpense} fixed z-50 top-90 left-20 bg-slate-400 w-[360px] p-3`}
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <figure className="flex items-center">
            <img src={list} alt="icon" className="w-9 h-9 mr-3" />
            <figcaption>
              <label htmlFor="item">項目</label>
              <Input placeholder="晚餐" id="item" className=""></Input>
            </figcaption>
          </figure>
          <figure className="flex items-center">
            <div className="w-9 h-9 bg-slate-200 mr-3 p-1">NTD</div>
            <figcaption>
              <label htmlFor="tw_amount">金額</label>
              <Input placeholder="500元" id="tw_amount"></Input>
            </figcaption>
          </figure>
          <div className="flex items-center gap-2">
            <label htmlFor="payer">誰先付</label>
            <Select id="payer">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="你" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
              </SelectContent>
            </Select>
            <img src={arrow} alt="arrow" className="w-6 h-6" />
          </div>

          {/* <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>分給誰</DialogTitle>
                <DialogDescription>
                  <Checkbox id=""></Checkbox>
                  <label htmlFor="">123</label>
                  <input type="text" />
                  <input type="text" />
                  <Checkbox id=""></Checkbox>
                  <label htmlFor="">456</label>
                  <Checkbox id=""></Checkbox>
                  <label htmlFor="">789</label>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}

          {/* <Popover>
            <div>
              <PopoverTrigger>Open</PopoverTrigger>
            </div>
            <PopoverContent className="ml-[360px] bg-blue-300">
              <Checkbox id=""></Checkbox>
              <label htmlFor="">123</label>
              <input type="text" />
              <input type="text" />
              <Checkbox id=""></Checkbox>
              <label htmlFor="">456</label>
              <Checkbox id=""></Checkbox>
              <label htmlFor="">789</label>
            </PopoverContent>
          </Popover> */}

          <div className="flex items-center gap-2">
            <label htmlFor="participant">分給誰</label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`全部平分${x}人`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="even">全部平分</SelectItem>
                <Checkbox
                  id="checkbox-0"
                  name="participants"
                  checked={formData.participants === "b"}
                  onChange={(e) => {
                    console.log(e.target);
                  }}
                />
                <label htmlFor="checkbox-0">a</label>
                <Checkbox id="checkbox-1" name="participants" />
                <label htmlFor="checkbox-1">b</label>
                <Checkbox id="checkbox-2" name="participants" />
                <label htmlFor="checkbox-2">c</label>
              </SelectContent>
            </Select>
            <img src={arrow} alt="arrow" className="w-6 h-6" />
          </div>
          {/* <Select id="participant">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="平分" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="123">
                123
                <Checkbox id="checkbox-0" name="participants" checked />
                <label htmlFor="checkbox-0">a</label>
                <Checkbox id="checkbox-1" name="participants" />
                <label htmlFor="checkbox-1">b</label>
                <Checkbox id="checkbox-2" name="participants" />
                <label htmlFor="checkbox-2">c</label> 
              </SelectItem>
              <SelectItem value="456">456</SelectItem>
            </SelectContent>
          </Select> */}
          <label htmlFor="date" className="block">
            日期
          </label>
          <DatePicker id="date"></DatePicker>
          <Textarea placeholder="備註"></Textarea>
          <label htmlFor="uploadImg">圖片</label>
          <input type="file" accept=".jpg, .jpeg, .png" id="uploadImg" />
          <div className="bg-slate-200 w-40 h-20">圖片預覽</div>
          <Button type="reset">取消</Button>
          <Button>儲存</Button>
        </form>
        <div className="fixed bg-blue-200 left-[450px]  w-[360px] h-[500px] p-2">
          <p className="text-center">如何分擔</p>
          <div className="flex justify-center ml-[130px] gap-[30px]">
            <p>份數</p>
            <p>金額</p>
          </div>
          <div className="flex justify-center items-center mt-2">
            <Checkbox id=""></Checkbox>
            <label htmlFor="" className="block w-[150px]">
              123
            </label>
            <Input className="w-10 h-8" placeholder="1"></Input>
            <Input className="w-24 h-8" placeholder="NT."></Input>
          </div>
          <div className="flex justify-center items-center mt-2">
            <Checkbox id=""></Checkbox>
            <label htmlFor="" className="block w-[150px]">
              123
            </label>
            <Input className="w-10 h-8" placeholder="1"></Input>
            <Input className="w-24 h-8" placeholder="NT."></Input>
          </div>
          <div className="flex justify-center items-center mt-2">
            <Checkbox id=""></Checkbox>
            <label htmlFor="" className="block w-[150px]">
              123
            </label>
            <Input className="w-10 h-8" placeholder="1"></Input>
            <Input className="w-24 h-8" placeholder="NT."></Input>
          </div>
        </div>
      </main>
    </>
  );
};

export default Mainpage;
