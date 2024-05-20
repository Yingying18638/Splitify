//------------------functions and hooks-------------------
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import calcBills from "@/utility/calcBills";
import calcFlow from "@/utility/calcFlow";
// const calcFlow=require("../../../utility/calcFlow");
import calcPaymentAverage from "@/utility/calcPaymentAverage";
import calcSingleAve from "@/utility/calcSingleAve";
import { updateGroupData } from "@/utility/handleFirestore";
import useZustandStore from "@/utility/hooks/useZustandStore";
import useAddExpGuide from "@/utility/addExpGuide";
//-------------------------image-----------------------------
import { BadgeDollarSign, CircleHelp, X } from "lucide-react";
import list from "@/assets/list.png";
import optionsIcon from "@/assets/options.png";
//------------------------ component--------------------------
import DatePicker from "./DatePicker";
import MultiSelect from "./Multiselect";
import ParticipantsOptions from "./ParticipantsOptions";
import PayersOption from "./PayersOption";
//------------------------ shadcn ui--------------------------
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
const AddExpense = ({
  setDisplayAddExpense,
  displayAddExpense,
  isEditingExpense,
  setIsEditingExpense,
}) => {
  //----------------store and variables-----------------------
  const { toast } = useToast();
  const {
    tempExpense,
    setTempExpense,
    resetTempExpense,
    group,
    setGroup,
    setOnePropInTempExpense,
    selected,
    setSelected,
    setShareObj,
    setDate,
  } = useZustandStore();
  const { expenses, users } = group;
  const {
    morePayers,
    total_amount,
    singlePayerOnly,
    note,
    date,
    participants_customized,
  } = tempExpense;
  const morePayersNames = morePayers ? Object.keys(morePayers) : [];
  const options = group?.users?.map(({ name }) => {
    return { label: name, value: name };
  });
  const usersObj = group.users?.reduce((acc, user) => {
    acc[user.name] = "";
    return acc;
  }, {});
  const participants_customNames = participants_customized
    ? Object.keys(participants_customized)
    : [];
  // ----------------calculate amount total and gap-----------------------------
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

  //----------------handle display payers and participants options---------------------
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
  //----------------group calculation------------------------------------
  useEffect(() => {
    setSelected(options);
    function handleGroupCalc() {
      if (expenses.length === 0) return;
      const { payment, average } = calcPaymentAverage(expenses, users);
      const { totalBill } = calcBills(payment, average, users);
      const flow = calcFlow(totalBill);
      const newGroupData = { ...group, totalBill, flow };
      updateGroupData(group.groupId, newGroupData);
      setGroup(newGroupData);
    }
    handleGroupCalc();
  }, [expenses]);
  //----------------form submission----------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    if (!singlePayerOnly && !payersAmountTotal) {
      toast({ title: "請選擇付款人" });
      return;
    }
    // 1. get ave from tempExpense
    // 2. update tempExpense in group expenses, and then trigger useEffect
    const ave = calcSingleAve(tempExpense);
    if (!isEditingExpense) {
      const now = new Date().getTime();
      const expenseToAdd = {
        ...tempExpense,
        ave,
        time: now,
        date: date ? date : format(now, "yyyyMMdd"),
      };
      setTempExpense(expenseToAdd);
      const newGrp = { ...group, expenses: [...group.expenses, expenseToAdd] };
      setGroup(newGrp);
    } else {
      const expenseToBeUpdated = { ...tempExpense, ave };
      setOnePropInTempExpense(ave, "ave");
      const expenseRemain = expenses.filter(
        (item) => item.time !== tempExpense.time
      );
      const newGroupData = {
        ...group,
        expenses: [...expenseRemain, expenseToBeUpdated],
      };
      setGroup(newGroupData);
    }
    // 3. reset form
    setDisplayAddExpense("hidden");
    setDisplayParticipantOpt("hidden");
    setDisplayPayersOpt("hidden");
    resetTempExpense();
    setDate(new Date());
    setShareObj(usersObj);
    setSelected(options);
    setIsEditingExpense(false);
  }
  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] z-[11] fixed top-0 ${displayAddExpense}`}
      ></div>
      <form
        method="post"
        className={`${displayAddExpense} space-y-3 xl:space-y-5 fixed z-50 
        top-0 left-0 sm:top-10 md:left-[calc((100%-720px)/2)] bg-[#EFCEA0] h-full w-full
         sm:w-[360px] sm:h-auto sm:max-h-[95vh] pb-6 p-3 px-6  rounded-lg`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center">
          {isEditingExpense ? "編輯花費" : "新增花費"}
        </h1>
        <span
          onClick={useAddExpGuide}
          className="shadow-md bg-200x100  animate-gradientChange flex flex-wrap items-center gap-1
           sm:absolute cursor-pointer sm:left-[220px] w-[70px]
          xl:top-[-0.5rem] sm:top-0 text-xs bg-gradient-linear  rounded-lg p-1 relative top-[-35px] left-[calc((100%+90px)/2)]"
        >
          <CircleHelp className="w-4 h-4" />
          怎麼填
        </span>
        <X
          onClick={() => {
            setDisplayAddExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetTempExpense();
            setSelected(options);
            setShareObj(usersObj);
            setDate(new Date());
            setIsEditingExpense(false);
          }}
          className="absolute hover:bg-[#feFae0] p-[2px] rounded-full right-2 top-[-0.3rem] xl:top-[-0.75rem] cursor-pointer "
        />
        <figure className="flex items-center">
          <img src={list} alt="icon" className="w-9 h-9 mr-9" />
          <figcaption>
            <label htmlFor="item">項目</label>
            <Input
              className="mt-1"
              placeholder="晚餐"
              required
              id="item"
              value={tempExpense.item}
              onChange={(e) =>
                setTempExpense({ ...tempExpense, item: e.target.value })
              }
            ></Input>
          </figcaption>
        </figure>
        <figure className="flex items-center">
          <BadgeDollarSign
            className="w-9 h-9 mr-9"
            strokeWidth={1}
          ></BadgeDollarSign>
          <figcaption>
            <label htmlFor="tw_amount">金額</label>
            <Input
              required
              className="mt-1"
              placeholder="500"
              id="tw_amount"
              value={total_amount || ""}
              onChange={(e) => {
                const { value } = e.target;
                const num = Number(value);
                if ((!num && value != "") || num < 0 || num % 1) return;
                setTempExpense({
                  ...tempExpense,
                  total_amount: num ? num : 0,
                });
              }}
            ></Input>
          </figcaption>
        </figure>
        <div className="flex items-center gap-2" id="whoPaid">
          <label className="block w-16" htmlFor="payer">
            誰先付
          </label>
          <div id="evenPayer">
            <Select
              value={singlePayerOnly || ""}
              id="payer"
              onValueChange={(value) => {
                if (value !== "多人付款") {
                  setTempExpense({ ...tempExpense, morePayers: {} });
                }
                setOnePropInTempExpense(value, "singlePayerOnly");
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="誰？" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectScrollUpButton />
                {group?.users.map(({ name }) => {
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
          </div>

          <div className="bg-black rounded p-[3px]" id="morePayerOptions">
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

        <div className="flex items-center gap-2 " id="whoParticipated">
          <label className="block w-16" htmlFor="participant">
            分給誰
          </label>
          <div id="evenParticipated">
            <MultiSelect
              selected={selected}
              setSelected={setSelected}
              options={options}
            ></MultiSelect>
          </div>
          <div className="bg-black rounded p-[3px]" id="cusParticipatedOptions">
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
            setTempExpense({ ...tempExpense, note: e.target.value })
          }
        ></Textarea>
        <Button
          type="reset"
          variant="secondary"
          className=" w-full "
          onClick={() => {
            setDisplayAddExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetTempExpense();
            setSelected(options);
            setShareObj(usersObj);
            setDate(new Date());
            setIsEditingExpense(false);
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
export default AddExpense;
