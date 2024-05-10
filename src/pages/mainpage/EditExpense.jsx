//functions and hooks
import React, { useEffect, useState } from "react";
import useStore from "../../utility/hooks/useStore";
import useUploadImg from "../../utility/hooks/useUploadImg";
import calcSingleAve from "../../utility/calcSingleAve";
import { updateGroupData } from "../../utility/handleFirestore";
//image
import arrow from "../../assets/arrow.png";
import optionsIcon from "../../assets/options.png";
import list from "../../assets/list.png";
import closeIcon from "../../assets/x.png";
import { CheckCheck, ListCollapse } from "lucide-react";
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
const EditExpense = ({ displayEditExpense, setDisplayEditExpense }) => {
  //取得原有資料，setState
  //date同步問題？？
  //送出時計算
  //firestore更新
  const {
    newExpense,
    setNewExpense,
    resetNewExpense,
    group,
    setGroup,
    setsomeNewExpense,
    selected,
    setSelected,
  } = useStore();
  const { expenses, users } = group;
  const {
    morePayers,
    total_amount,
    singlePayerOnly,
    participants,
    note,
    img,
    participants_customized,
  } = newExpense;
  const morePayersNames = morePayers ? Object.keys(morePayers) : [];
  const options = group?.users?.map(({ name }) => {
    return { label: name, value: name };
  });
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
  const [imgSrc, setImgSrc] = useState("");
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
      alert("請選擇付款人！");
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

    console.log(newGroupData, "abc");
    setGroup(newGroupData);
    //加入img
    setDisplayEditExpense("hidden");
    setDisplayParticipantOpt("hidden");
    setDisplayPayersOpt("hidden");
    resetNewExpense();
    setSelected(options);
  }
  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] z-[11] fixed top-0 ${displayEditExpense}`}
      ></div>
      <form
        method="post"
        encType="multipart/form-data"
        action=""
        className={`${displayEditExpense} space-y-3 fixed z-50 top-0 left-0 sm:top-10 md:left-[calc((100%-720px)/2)] bg-[#EFCEA0] h-full w-full sm:w-[360px] sm:h-[90vh] p-3 px-6 rounded-lg`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center">編輯花費</h1>
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => {
            setDisplayEditExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetNewExpense();
            setSelected(options);
          }}
          className="absolute right-2 top-[-0.3rem] cursor-pointer"
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
          <div className="w-9 h-9 bg-[#FEFAE0] rounded mr-9 pt-2 p-1 text-sm">
            NTD
          </div>
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
              // setNewExpense({ ...newExpense, singlePayerOnly: value });
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
          onChange={(e) =>
            setNewExpense({ ...newExpense, note: e.target.value })
          }
        ></Textarea>
        {/* <label htmlFor="uploadImg">圖片</label>
        <input
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
          className="ml-[calc(100%-120px)]"
          onClick={() => {
            setDisplayEditExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetNewExpense();
            setSelected(options);
          }}
        >
          取消
        </Button>
        <Button
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
        displayParticipantOpt={displayParticipantOpt}
        setDisplayParticipantOpt={setDisplayParticipantOpt}
        cusAmountGap={cusAmountGap}
        participants_customNames={participants_customNames}
      />
    </>
  );
};

export default EditExpense;
