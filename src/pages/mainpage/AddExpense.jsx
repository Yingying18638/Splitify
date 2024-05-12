//functions and hooks
import React, { useEffect, useState } from "react";
import useStore from "../../utility/hooks/useStore";
import useUploadImg from "../../utility/hooks/useUploadImg";
import { updateGroupData } from "../../utility/handleFirestore";
import calcPaymentAverage from "../../utility/calcPaymentAverage";
import calcFlow from "../../utility/calcFlow";
import calcBills from "../../utility/calcBills";
import calcSingleAve from "../../utility/calcSingleAve";
import { parseISO, format } from "date-fns";
import useAddExpGuide from "../../utility/useAddExpGuide";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

//image
import arrow from "../../assets/arrow.png";
import optionsIcon from "../../assets/options.png";
import list from "../../assets/list.png";
import closeIcon from "../../assets/x.png";
// component
import DatePicker from "./DatePicker";
import MultiSelect from "./Multiselect";
import PayersOption from "./PayersOption";
import ParticipantsOptions from "./ParticipantsOptions";
// shadcn ui
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "../../components/ui/select";

const AddExpense = ({ setDisplayAddExpense, displayAddExpense }) => {
  // upload image
  const {
    imageUploaded,
    setImageUploaded,
    imageUrl,
    setImageUrl,
    uploadImage,
  } = useUploadImg();
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
    tempGroupId,
    setShareObj,
    setDate,
  } = useStore();
  const { expenses, users } = group;
  const {
    morePayers,
    total_amount,
    singlePayerOnly,
    participants,
    note,
    img,
    date,
    participants_customized,
    item,
  } = newExpense;
  const morePayersNames = morePayers ? Object.keys(morePayers) : [];
  const options = group?.users?.map(({ name }) => {
    return { label: name, value: name };
  });
  const usersObj = group.users?.reduce((acc, user) => {
    acc[user.name] = "";
    return acc;
  }, {});
  // ----------------切成function-----------------------------
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
  // ----------------切成function-----------------------------

  const participants_customNames = participants_customized
    ? Object.keys(participants_customized)
    : [];
  const [displayPayersOpt, setDisplayPayersOpt] = useState("hidden");
  const [displayParticipantOpt, setDisplayParticipantOpt] = useState("hidden");
  const [imgSrc, setImgSrc] = useState("");
  function handlePayersParticipantsDisplay(e) {
    console.log(e.target);
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
  useEffect(() => {
    setSelected(options);
    function handleGroupCalc() {
      // 0. start group calc or not
      if (expenses.length === 0) return;
      console.log("start group calc");
      // 3. 計算付款&平均
      const { payment, average } = calcPaymentAverage(expenses, users);
      const { totalBill } = calcBills(payment, average, users);
      const flow = calcFlow(totalBill);
      const newGroupData = { ...group, totalBill, flow };
      // 4. totalBill, flow 塞入group
      // 4.1 整筆group更新到火基地
      updateGroupData(group.groupId, newGroupData);
      setGroup(newGroupData);
    }
    handleGroupCalc();
  }, [expenses, users]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!singlePayerOnly && !payersAmountTotal) {
      toast({ title: "請選擇付款人" });
      return;
    }
    // 1. newExpense 算出ave
    const ave = calcSingleAve(newExpense);
    const now = new Date().getTime();
    const expenseToAdd = {
      ...newExpense,
      ave,
      time: now,
      date: date ? date : format(now, "yyyyMMdd"),
    };
    setNewExpense(expenseToAdd);
    // setsomeNewExpense(ave, "ave");
    // setsomeNewExpense(now, "time");
    // 2. newExpense 塞入group expenses, setGroup (觸發useEffect)
    const newGrp = { ...group, expenses: [...group.expenses, expenseToAdd] };
    // console.log(newGrp, "newGrp");
    setGroup(newGrp);
    setDisplayAddExpense("hidden");
    setDisplayParticipantOpt("hidden");
    setDisplayPayersOpt("hidden");
    resetNewExpense();
    setDate(new Date());
    setShareObj(usersObj);
    setSelected(options);
    console.log(newExpense);
  }
  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] z-[11] fixed top-0 ${displayAddExpense}`}
      ></div>
      <form
        method="post"
        encType="multipart/form-data"
        action=""
        className={`${displayAddExpense} space-y-3 xl:space-y-5 fixed z-50 
        top-0 left-0 sm:top-10 md:left-[calc((100%-720px)/2)] bg-[#EFCEA0] h-full w-full sm:w-[360px]  sm:h-[90vh] p-3 px-6 rounded-lg`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center">新增花費</h1>
        <span
          onClick={useAddExpGuide}
          className="shadow-md bg-200x100  animate-gradientChange  sm:absolute cursor-pointer sm:left-[220px] 
          xl:top-[-0.5rem] sm:top-0 text-xs bg-gradient-linear  rounded-lg p-1 relative top-[-25px] left-[calc((100%+90px)/2)]"
        >
          怎麼填
        </span>
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => {
            setDisplayAddExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetNewExpense();
            setSelected(options);
            setShareObj(usersObj);
            setDate(new Date());
          }}
          className="absolute right-2 top-[-0.3rem] xl:top-[-0.75rem] cursor-pointer "
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
              value={newExpense.item}
              onChange={(e) =>
                setNewExpense({ ...newExpense, item: e.target.value })
              }
            ></Input>
          </figcaption>
        </figure>
        <figure className="flex items-center">
          <div className="w-9 h-9 bg-[#FEFAE0] rounded mr-9 pt-2 p-1 text-sm">
            NTD
          </div>
          <figcaption>
            <label htmlFor="tw_amount">金額</label>
            <Input
              required
              className="mt-1"
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
        {/* <div
          className={`${cusAmountTotal ? "" : "hidden"} relative bg-white w-28 bottom-8 left-16`}
        >
          自訂分款
        </div> */}
        <p
          className={`text-red-500 ${cusAmountGap !== 0 && cusAmountTotal !== 0 ? "" : "hidden"}`}
        >
          此分帳尚未完成
        </p>
        {/* <label htmlFor="date" className="block">
          className="block w-16"
        </label> */}
        <div className="flex items-center gap-10">
          日期<DatePicker id="date"></DatePicker>
        </div>
        <Textarea
          placeholder="備註"
          value={note}
          onChange={(e) =>
            setNewExpense({ ...newExpense, note: e.target.value })
          }
        ></Textarea>
        {/* <label htmlFor="uploadImg">圖片</label> */}
        {/* <input
          type="file"
          accept=".jpg, .jpeg, .png"
          id="uploadImg"
          // className="hidden"
          onChange={(e) => {
            if (e.target.files[0]) {
              console.log(e.target.files);
              const src = URL.createObjectURL(e.target.files[0]);
              setImgSrc(src);
              console.log(src);
            }
          }}
        /> */}
        <div className="bg-slate-200 w-40 h-30">
          {/* {imgSrc ? <img src={imgSrc} alt="圖片預覽" className="w-25" /> : ""} */}
        </div>
        <Button
          type="reset"
          variant="secondary"
          className=" w-full "
          onClick={() => {
            setDisplayAddExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetNewExpense();
            setSelected(options);
            setShareObj(usersObj);
            setDate(new Date());
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
