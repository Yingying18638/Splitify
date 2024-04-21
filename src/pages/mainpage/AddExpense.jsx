//functions and hooks
import React, { useEffect, useState } from "react";
import useStore from "../../utility/useStore";
import useUploadImg from "../../utility/hooks/useUploadImg";
import { updateGroupData } from "../../utility/handleFirestore";
import calcPaymentAverage from "../../utility/calcPaymentAverage";
import calcFlow from "../../utility/calcFlow";
import calcBills from "../../utility/calcBills";
import calcSingleAve from "../../utility/calcSingleAve";
//image
import arrow from "../../assets/arrow.png";
import list from "../../assets/list.png";
import closeIcon from "../../assets/x.png";
// component
import DatePicker from "./DatePicker";
import MultiSelect from "./Multiselect";
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
import { set } from "date-fns";

const AddExpense = ({ setDisplayAddExpense, displayAddExpense }) => {
  // upload image
  const {
    imageUploaded,
    setImageUploaded,
    imageUrl,
    setImageUrl,
    uploadImage,
  } = useUploadImg();
  const {
    newExpense,
    setNewExpense,
    resetNewExpense,
    group,
    setGroup,
    setsomeNewExpense,
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
  // calculate share to amount
  const [shareObj, setShareObj] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
  });

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
  const cusAmountGap = getAmountGap(cusAmountArr);
  const payersAmountGap = getAmountGap(payersAmountArr);
  // ----------------切成function-----------------------------

  const participants_customNames = participants_customized
    ? Object.keys(participants_customized)
    : [];
  const [displayPayersOpt, setDisplayPayersOpt] = useState("hidden");
  const [displayParticipantOpt, setDisplayParticipantOpt] = useState("hidden");
  const [imgSrc, setImgSrc] = useState("");
  const [isGroupCalcNeeded, setIsGroupCalcNeeded] = useState(true);
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
  //---------------temp------------------
  const groupId = "JR13SgWIQm5UNZFLwBC0";
  //---------------temp------------------
  useEffect(() => {
    function handleGroupCalc() {
      // 0. start group calc or not
      if (expenses.length === 0) return;
      console.log("starting group calculation");
      // 3. 計算付款&平均
      const { payment, average } = calcPaymentAverage(expenses, users);
      const { totalBill } = calcBills(payment, average, users);
      const flow = calcFlow(totalBill);
      // if (isGroupCalcNeeded === false) return;
      const newGroupData = { ...group, totalBill, flow };
      // 4. totalBill, flow 塞入group
      // 4.1 整筆group更新到火基地
      // updateGroupData(groupId, newGroupData);
      setGroup(newGroupData);
      // 5. close group calc
      setIsGroupCalcNeeded(false);
    }
    handleGroupCalc();
  }, [expenses, users, isGroupCalcNeeded]);

  function handleSubmit(e) {
    e.preventDefault();
    // 1. newExpense 算出ave
    const ave = calcSingleAve(newExpense);
    setNewExpense({ ...newExpense, ave });
    // 1.1 start GroupCalc
    setIsGroupCalcNeeded(true);
    // 2. newExpense 塞入group expenses, setGroup (觸發useEffect)
    setGroup({ ...group, expenses: [...group.expenses, newExpense] });
    //加入img
    setDisplayAddExpense("hidden");
    setDisplayParticipantOpt("hidden");
    setDisplayPayersOpt("hidden");
    resetNewExpense();
    console.log(newExpense);
  }
  return (
    <>
      <form
        method="post"
        encType="multipart/form-data"
        action=""
        className={`${displayAddExpense} fixed z-50 top-10 left-20 bg-slate-400 w-[360px] p-3`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => {
            setDisplayAddExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetNewExpense();
          }}
          className="absolute right-2 top-2 cursor-pointer"
        />
        <figure className="flex items-center">
          <img src={list} alt="icon" className="w-9 h-9 mr-3" />
          <figcaption>
            <label htmlFor="item">項目</label>
            <Input
              placeholder="晚餐"
              id="item"
              className=""
              value={newExpense.item}
              // required
              onChange={(e) =>
                setNewExpense({ ...newExpense, item: e.target.value })
              }
            ></Input>
          </figcaption>
        </figure>
        <figure className="flex items-center">
          <div className="w-9 h-9 bg-slate-200 mr-3 p-1">NTD</div>
          <figcaption>
            <label htmlFor="tw_amount">金額</label>
            <Input
              required
              placeholder="500"
              id="tw_amount" //
              value={total_amount || ""}
              onChange={(e) => {
                const { value } = e.target;
                const num = parseInt(value);
                if (isNaN(num) && value !== "") return;
                setNewExpense({
                  ...newExpense,
                  total_amount: num ? num : 0,
                });
              }}
            ></Input>
          </figcaption>
        </figure>
        <div className="flex items-center gap-2">
          <label htmlFor="payer">誰先付</label>
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
                  <SelectItem name="payer" key={name} value={name}>
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
          <img
            id="payer-arrow"
            src={arrow}
            alt="arrow"
            className="w-6 h-6"
            onClick={(e) => handlePayersParticipantsDisplay(e)}
          />
        </div>
        <p
          className={`text-red-500 ${payersAmountGap !== 0 && singlePayerOnly === "多人付款" ? "" : "hidden"}`}
        >
          此分帳尚未完成
        </p>

        <div className="flex items-center gap-2 ">
          <label htmlFor="participant">分給誰</label>
          <MultiSelect></MultiSelect>
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
        <label htmlFor="date" className="block">
          日期
        </label>
        <DatePicker id="date"></DatePicker>
        <Textarea
          placeholder="備註"
          value={note}
          onChange={(e) =>
            setNewExpense({ ...newExpense, note: e.target.value })
          }
        ></Textarea>
        <label htmlFor="uploadImg">圖片</label>
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
        />
        <div className="bg-slate-200 w-40 h-30">
          {/* {imgSrc ? <img src={imgSrc} alt="圖片預覽" className="w-25" /> : ""} */}
        </div>
        <Button
          type="reset"
          onClick={() => {
            setDisplayAddExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
            resetNewExpense();
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
      <section
        className={`fixed ${displayPayersOpt} bg-blue-200 left-[450px] top-10 w-[360px] h-[500px] p-2`}
      >
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setDisplayPayersOpt("hidden")}
          className="absolute right-2 top-2 cursor-pointer"
        />
        <p className="text-center">多人付款</p>
        <p
          className={`text-right mr-6 ${payersAmountGap === 0 ? "" : "text-red-500"}`}
        >
          剩餘金額 {payersAmountGap} 元
        </p>

        <div className="flex justify-center ml-[130px] gap-[30px]">
          <p>金額</p>
        </div>
        {group?.users?.map(({ name }) => {
          return (
            <div className="flex justify-center items-center mt-2" key={name}>
              {/* <input
                type="checkbox"
                id={name}
                checked={
                  morePayersNames?.find((item) => item === name) &&
                  morePayers[name]
                }
                onClick={(e) => {
                  const { id } = e.target;
                  if (!morePayersNames?.find((item) => item === id)) {
                    const newMorePayers = { ...morePayers, [id]: 0 };
                    setNewExpense({ ...newExpense, morePayers: newMorePayers });
                  } else {
                    const { [id]: removed, ...obj } = morePayers;
                    setNewExpense({ ...newExpense, morePayers: obj });
                  }
                }}
              ></input> */}
              <div
                className={`${
                  morePayersNames?.find((item) => item === name) &&
                  morePayers[name]
                    ? ""
                    : "hidden"
                } fixed right-[330px]`}
              >
                v
              </div>
              <label htmlFor={name} className="block w-[150px] ml-2">
                {name}
              </label>
              <Input
                className="w-24 h-8"
                placeholder="NT."
                value={morePayers?.[name] ? morePayers[name] : ""}
                onChange={(e) => {
                  const { value } = e.target;
                  const num = parseInt(value);
                  if (isNaN(num) && value !== "") return;
                  const newMorePayers = {
                    ...morePayers,
                    [name]: num ? num : 0,
                  };
                  setNewExpense({
                    ...newExpense,
                    morePayers: newMorePayers,
                    singlePayerOnly: "多人付款",
                  });
                }}
              ></Input>
            </div>
          );
        })}
      </section>
      <section
        className={`fixed ${displayParticipantOpt} bg-purple-200 left-[450px] top-10 w-[360px] h-[500px] p-2`}
      >
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setDisplayParticipantOpt("hidden")}
          className="absolute right-2 top-2 cursor-pointer"
        />
        <p className="text-center">如何分擔</p>
        <p
          className={`text-right mr-6 ${cusAmountGap === 0 ? "" : "text-red-500"}`}
        >
          剩餘金額 {cusAmountGap} 元
        </p>
        <div className="flex justify-center ml-[130px] gap-[30px]">
          <p>份數</p>
          <p>金額</p>
        </div>
        {group?.users?.map(({ name }, index) => {
          console.log(cusAmountArr);
          return (
            <div
              className="flex justify-center gap-1 items-center mt-2"
              key={name}
            >
              {/* <input
                type="checkbox"
                // id={`participant_${name}`}
                id={name}
                checked={
                  participants_customNames?.find((item) => item === name) &&
                  cusAmountArr[index]
                }
                onClick={(e) => {
                  const { id } = e.target;
                  if (!participants_customNames?.find((item) => item === id)) {
                    const newParticipantsCustom = {
                      ...participants_customized,
                      [id]: "",
                    };
                    setNewExpense({
                      ...newExpense,
                      participants_customized: newParticipantsCustom,
                    });
                  } else {
                    const { [id]: removed, ...obj } = participants_customized;
                    setNewExpense({
                      ...newExpense,
                      participants_customized: obj,
                    });
                  }
                }}
              ></input> */}
              <div
                className={`${
                  participants_customNames?.find((item) => item === name) &&
                  cusAmountArr[index]
                    ? ""
                    : "hidden"
                } fixed right-[350px]`}
              >
                v
              </div>
              {/* <Checkbox id={name}></Checkbox> */}
              <label
                // htmlFor={`participant_${name}`}
                htmlFor={name}
                className="block w-[150px] ml-2"
              >
                {name}
              </label>
              <Input
                className="w-10 h-8"
                // placeholder="1"
                value={shareObj[name]}
                onChange={(e) => {
                  const { value } = e.target;
                  const num = parseInt(value);
                  // if (isNaN(num) && value !== "") return;
                  const newShareObj = { ...shareObj, [name]: num ? num : "" };
                  setShareObj(newShareObj);
                  console.log(newShareObj, "我是新的");
                  const isNameNotExist = !participants_customNames?.find(
                    (item) => item === name
                  );
                  if (isNameNotExist) {
                    const newParticipantsCustom = {
                      ...participants_customized,
                      [name]: "",
                    };
                    setNewExpense({
                      ...newExpense,
                      participants_customized: newParticipantsCustom,
                    });
                  }
                  // if (shareObj[name]) {
                  //does anybody Have Share
                  const shareTotal = Object.values(newShareObj).reduce(
                    (acc, cur) => acc + cur,
                    0
                  );
                  console.log(shareTotal, "sharetotal");
                  const amountObj = {};
                  for (const [key, share] of Object.entries(newShareObj)) {
                    const amount = (share / shareTotal) * total_amount || 0;
                    // amountObj[key] = amount;
                    amountObj[key] = Math.round(amount);
                    // ? Math.round(amount)
                    // : 0;
                  }
                  console.log(amountObj, "我有更新嗎");
                  setNewExpense({
                    ...newExpense,
                    participants_customized: { ...amountObj },
                    // {
                    //   ...participants_customized,
                    //   [name]: amountObj[key],
                    // },
                  });
                  // }
                }}
              ></Input>
              <Input
                className="w-24 h-8"
                placeholder="NT."
                value={participants_customized[name] || ""}
                onChange={(e) => {
                  const { value } = e.target;
                  const num = parseInt(value);
                  if (isNaN(num) && value !== "") return;
                  setShareObj({ ...shareObj, [name]: "" });
                  setNewExpense({
                    ...newExpense,
                    participants_customized: {
                      ...participants_customized,
                      [name]: num ? num : 0,
                    },
                  });
                }}
              ></Input>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default AddExpense;
