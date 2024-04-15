import React, { useState } from "react";
import useStore from "../../utility/useStore";

//image
import arrow from "../../assets/arrow.png";
import list from "../../assets/list.png";
//data structure
import { group, users } from "../../schema_example";
// component
import DatePicker from "./DatePicker";
import MultiSelect from "./Multiselect";
// shadcn ui
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const AddExpense = ({ displayAddExpense, handleFormSubmit }) => {
  const { expenseData, setExpenseData } = useStore();
  const { payersAndAmounts, participants } = expenseData;
  // console.log("分擔者", participants);
  const [displayPayersOpt, setDisplayPayersOpt] = useState("hidden");
  const [displayParticipantOpt, setDisplayParticipantOpt] = useState("hidden");
  function handlePayersParticipantsDisplay(e) {
    if (e.target.id === "participant-arrow") {
      setDisplayParticipantOpt(
        displayParticipantOpt === "hidden" ? "block" : "hidden"
      );
      setDisplayPayersOpt(displayPayersOpt === "block" ? "hidden" : "hidden");
      return;
    }
    if (e.target.id === "payer-arrow") {
      setDisplayParticipantOpt(
        displayParticipantOpt === "block" ? "hidden" : "hidden"
      );
      setDisplayPayersOpt(displayPayersOpt === "hidden" ? "block" : "hidden");
      return;
    }
  }
  return (
    <>
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
            <Input
              placeholder="晚餐"
              id="item"
              className=""
              value={expenseData.item}
              onChange={(e) => setExpenseData({ item: e.target.value })}
            ></Input>
          </figcaption>
        </figure>
        <figure className="flex items-center">
          <div className="w-9 h-9 bg-slate-200 mr-3 p-1">NTD</div>
          <figcaption>
            <label htmlFor="tw_amount">金額</label>
            <Input
              placeholder="500元"
              id="tw_amount" //value={expenseData.tw_amount}
            ></Input>
          </figcaption>
        </figure>
        <div className="flex items-center gap-2">
          <label htmlFor="payer">誰先付</label>
          <Select id="payer">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="你" />
            </SelectTrigger>
            <SelectContent>
              {group.users.map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
              {/* <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem> */}
            </SelectContent>
          </Select>
          <img
            id="payer-arrow"
            src={arrow}
            alt="arrow"
            className="w-6 h-6"
            onClick={(e) => handlePayersParticipantsDisplay(e)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="participant">分給誰</label>
          <MultiSelect></MultiSelect>
          {/* <Select>
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
            </Select> */}
          <img
            src={arrow}
            alt="arrow"
            className="w-6 h-6"
            id="participant-arrow"
            onClick={(e) => {
              handlePayersParticipantsDisplay(e);
            }}
          />
        </div>
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
      <div
        className={`fixed ${displayPayersOpt} bg-blue-200 left-[450px]  w-[360px] h-[500px] p-2`}
      >
        <p className="text-center">多人付款</p>
        <div className="flex justify-center ml-[130px] gap-[30px]">
          <p>金額</p>
        </div>
        {group.users.map(({ name }) => {
          return (
            <div className="flex justify-center items-center mt-2" key={name}>
              <input
                type="checkbox"
                id={name}
                checked={payersAndAmounts.find((item) => item.name === name)}
                onClick={(e) => {
                  const { id } = e.target;
                  if (!payersAndAmounts.find((item) => item.name === id)) {
                    const newArr = [...payersAndAmounts, { name: id }];
                    setExpenseData({ ...expenseData, newArr });
                  } else {
                    const newArr = payersAndAmounts.filter(
                      (item) => item.name !== id
                    );
                    setExpenseData({ ...expenseData, newArr });
                  }
                }}
              ></input>
              <label htmlFor={name} className="block w-[150px] ml-2">
                {name}
              </label>
              <Input className="w-24 h-8" placeholder="NT."></Input>
            </div>
          );
        })}
      </div>
      <div
        className={`fixed ${displayParticipantOpt} bg-purple-200 left-[450px]  w-[360px] h-[500px] p-2`}
      >
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
    </>
  );
};

export default AddExpense;
