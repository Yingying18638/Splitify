//functions and hooks
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import calcSingleAve from "@/utility/calcSingleAve";
import useStore from "@/utility/hooks/useStore";

//image
import { BadgeDollarSign, X } from "lucide-react";
import list from "@/assets/list.png";
import optionsIcon from "@/assets/options.png";
// component
import DatePicker from "./DatePicker";
import MultiSelect from "./Multiselect";
import ParticipantsOptions from "./ParticipantsOptions";
import PayersOption from "./PayersOption";
// shadcn ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
const EditExpense = ({ displayEditExpense, setDisplayEditExpense }) => {
  const { toast } = useToast();

  const {
    newExpense,
    setNewExpense,
    resetNewExpense,
    group,
    setGroup,
    setsomeNewExpense,
    selected,
    setSelected,
    setShareObj,
    setDate,
  } = useStore();
  const { expenses, users } = group;
  const {
    morePayers,
    total_amount,
    singlePayerOnly,
    note,
    participants_customized,
  } = newExpense;
  const morePayersNames = morePayers ? Object.keys(morePayers) : [];
  const options = group?.users?.map(({ name }) => {
    return { label: name, value: name };
  });
  const usersObj = group.users?.reduce((acc, user) => {
    acc[user.name] = "";
    return acc;
  }, {});
  // ----------------function and variables-----------------------------
  function getAmountArr(personAmountObj) {
    if (!personAmountObj) return;
    return Object.values(personAmountObj);
  }
  function getAmountGap(amountArr) {
    if (!amountArr) return;
    const cusAmountTotal = amountArr?.reduce((acc, cur) => acc + cur, 0);
    return total_amount - cusAmountTotal;
  }
  const cusAmountArr = getAmountArr(participants_customized);
  const payersAmountArr = getAmountArr(morePayers);
  const payersAmountTotal = payersAmountArr?.reduce((acc, cur) => acc + cur, 0);
  const cusAmountTotal = cusAmountArr?.reduce((acc, cur) => acc + cur, 0);
  const cusAmountGap = Math.round(getAmountGap(cusAmountArr));
  const payersAmountGap = getAmountGap(payersAmountArr);
  const participants_customNames = participants_customized
    ? Object.keys(participants_customized)
    : [];
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
  function handleSubmit(e) {
    e.preventDefault();
    if (!singlePayerOnly && !payersAmountTotal) {
      toast({ title: "請選擇付款人" });
      return;
    }
    // 1. editExpense 算出ave
    const ave = calcSingleAve(newExpense);
    const expenseToBeUpdated = { ...newExpense, ave };
    setsomeNewExpense(ave, "ave");
    // 2. editExpense 更新group expenses, setGroup (觸發useEffect)
    const expenseRemain = expenses.filter(
      (item) => item.time !== newExpense.time
    );
    const newGroupData = {
      ...group,
      expenses: [...expenseRemain, expenseToBeUpdated],
    };

    setGroup(newGroupData);
    setDisplayEditExpense("hidden");
    setDisplayParticipantOpt("hidden");
    setDisplayPayersOpt("hidden");
    resetNewExpense();
    setSelected(options);
    setDate(new Date());
    setShareObj(usersObj);
  }
  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] z-[11] fixed top-0 ${displayEditExpense}`}
      ></div>
      <form
        method="post"
        className={`${displayEditExpense} space-y-3 xl:space-y-5  fixed z-50 top-0 left-0 sm:top-10 md:left-[calc((100%-720px)/2)]
         bg-[#EFCEA0] h-full w-full sm:w-[360px] sm:h-auto sm:max-h-[95vh] pb-6 p-3 px-6 rounded-lg`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center">編輯花費</h1>
        <X
          onClick={() => {
            setDisplayEditExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetNewExpense();
            setDate(new Date());
            setShareObj(usersObj);
            setSelected(options);
          }}
          className="absolute hover:bg-[#feFae0] p-[2px] rounded-full right-2 top-[-0.3rem] xl:top-[-0.75rem] cursor-pointer"
        />
        <figure className="flex items-center">
          <img src={list} alt="icon" className="w-9 h-9 mr-9" />
          <figcaption>
            <label htmlFor="item">項目</label>
            <Input
              placeholder="晚餐"
              id="item"
              className=""
              value={newExpense.item}
              required
              onChange={(e) =>
                setNewExpense({ ...newExpense, item: e.target.value })
              }
            ></Input>
          </figcaption>
        </figure>
        <figure className="flex items-center">
          <BadgeDollarSign className="w-9 h-9 mr-9" strokeWidth={1} />
          <figcaption>
            <label htmlFor="tw_amount">金額</label>
            <Input
              required
              placeholder="500"
              id="tw_amount" //
              value={total_amount || ""}
              onChange={(e) => {
                const { value } = e.target;
                const num = Number(value);
                if ((!num && value != "") || num < 0 || num % 1) return;
                setNewExpense({
                  ...newExpense,
                  total_amount: num ? num : 0,
                });
              }}
            ></Input>
          </figcaption>
        </figure>
        <div className="flex items-center gap-2">
          <label htmlFor="payer" className="block w-16">
            誰先付
          </label>
          <Select
            value={singlePayerOnly || ""}
            id="payer"
            required
            onValueChange={(value) => {
              if (value !== "多人付款") {
                setNewExpense({ ...newExpense, morePayers: {} });
              }
              setsomeNewExpense(value, "singlePayerOnly");
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="誰？" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectScrollUpButton />
              {group?.users?.map(({ name }) => {
                return (
                  <SelectItem name="payer" key={name} value={name || " "}>
                    {name}
                  </SelectItem>
                );
              })}
              <SelectItem
                name="payer"
                key="others"
                value="多人付款"
                className={payersAmountTotal !== 0 ? "" : "hidden"}
              >
                多人付款
              </SelectItem>
              <SelectScrollDownButton />
            </SelectContent>
          </Select>
          <div className="bg-black rounded p-[3px]">
            <img
              src={optionsIcon}
              alt="options"
              id="payer-arrow"
              className="w-6 h-6 cursor-pointer"
              onClick={(e) => handlePayersParticipantsDisplay(e)}
            />
          </div>
        </div>
        <p
          className={`text-red-500 ${payersAmountGap !== 0 && singlePayerOnly === "多人付款" ? "" : "hidden"}`}
        >
          此分帳尚未完成
        </p>

        <div className="flex items-center gap-2 ">
          <label htmlFor="participant" className="block w-16">
            分給誰
          </label>
          <MultiSelect
            selected={selected}
            setSelected={setSelected}
            options={options}
          ></MultiSelect>
          <div className="bg-black rounded p-[3px]">
            <img
              src={optionsIcon}
              alt="options"
              id="participant-arrow"
              className="w-6 h-6 cursor-pointer"
              onClick={(e) => handlePayersParticipantsDisplay(e)}
            />
          </div>
        </div>
        <p
          className={`text-red-500 ${cusAmountGap !== 0 && cusAmountTotal !== 0 ? "" : "hidden"}`}
        >
          此分帳尚未完成
        </p>
        <div className="flex items-center gap-10">
          日期<DatePicker id="date"></DatePicker>
        </div>
        <Textarea
          placeholder="備註"
          value={note}
          className="resize-none"
          onChange={(e) =>
            setNewExpense({ ...newExpense, note: e.target.value })
          }
        ></Textarea>
        <Button
          type="reset"
          variant="secondary"
          className="w-full"
          onClick={() => {
            setDisplayEditExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetNewExpense();
            setDate(new Date());
            setShareObj(usersObj);
            setSelected(options);
          }}
        >
          取消
        </Button>
        <Button
          className="w-full"
          disabled={
            (payersAmountGap !== 0 && singlePayerOnly === "多人付款") ||
            (cusAmountGap !== 0 && cusAmountTotal !== 0)
              ? true
              : false
          }
        >
          儲存
        </Button>
      </form>
      <PayersOption
        displayPayersOpt={displayPayersOpt}
        setDisplayPayersOpt={setDisplayPayersOpt}
        payersAmountGap={payersAmountGap}
        morePayersNames={morePayersNames}
      />
      <ParticipantsOptions
        usersObj={usersObj}
        displayParticipantOpt={displayParticipantOpt}
        setDisplayParticipantOpt={setDisplayParticipantOpt}
        cusAmountGap={cusAmountGap}
        participants_customNames={participants_customNames}
      />
    </>
  );
};

export default EditExpense;
