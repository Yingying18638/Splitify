import React, { useState } from "react";
import useStore from "../../utility/useStore";

//image
import arrow from "../../assets/arrow.png";
import list from "../../assets/list.png";
import closeIcon from "../../assets/x.png";
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

const AddExpense = ({
  setDisplayAddExpense,
  displayAddExpense,
  handleFormSubmit,
}) => {
  const { newExpense, setNewExpense, getNewExpense } = useStore();
  // console.log(getNewExpense());
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
    setDisplayAddExpense("hidden");
    setDisplayParticipantOpt("hidden");
    setDisplayPayersOpt("hidden");
    setNewExpense({});
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
              value={getNewExpense().item}
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
              placeholder="500"
              id="tw_amount" //
              value={total_amount || ""}
              onChange={(e) =>
                setNewExpense({ ...newExpense, total_amount: e.target.value })
              }
            ></Input>
          </figcaption>
        </figure>
        <div className="flex items-center gap-2">
          <label htmlFor="payer">誰先付</label>
          <Select
            id="payer"
            onValueChange={(value) =>
              setNewExpense({ ...newExpense, singlePayerOnly: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="你" />
            </SelectTrigger>
            <SelectContent>
              {group?.users.map(({ name }) => {
                return (
                  <SelectItem name="payer" key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
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
          <img src={imgSrc} alt="圖片預覽" className="w-25" />
        </div>
        <Button
          type="reset"
          onClick={() => {
            setDisplayAddExpense("hidden");
            setDisplayParticipantOpt("hidden");
            setDisplayPayersOpt("hidden");
          }}
        >
          取消
        </Button>
        <Button>儲存</Button>
      </form>
      <div
        className={`fixed ${displayPayersOpt} bg-blue-200 left-[450px] top-10 w-[360px] h-[500px] p-2`}
      >
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setDisplayPayersOpt("hidden")}
          className="absolute right-2 top-2 cursor-pointer"
        />
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
                checked={morePayersNames?.find((item) => item === name)}
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
              ></input>
              <label htmlFor={name} className="block w-[150px] ml-2">
                {name}
              </label>
              <Input
                className="w-24 h-8"
                placeholder="NT."
                value={morePayers?.[name] ? morePayers[name] : ""}
                onChange={(e) => {
                  const { value } = e.target;
                  const newMorePayers = { ...morePayers, [name]: value };
                  setNewExpense({ ...newExpense, morePayers: newMorePayers });
                }}
              ></Input>
            </div>
          );
        })}
      </div>
      <div
        className={`fixed ${displayParticipantOpt} bg-purple-200 left-[450px] top-10 w-[360px] h-[500px] p-2`}
      >
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setDisplayParticipantOpt("hidden")}
          className="absolute right-2 top-2 cursor-pointer"
        />
        <p className="text-center">如何分擔</p>
        <div className="flex justify-center ml-[130px] gap-[30px]">
          <p>份數</p>
          <p>金額</p>
        </div>
        {group.users.map(({ name }) => {
          return (
            <div className="flex justify-center items-center mt-2" key={name}>
              <input
                type="checkbox"
                id={name}
                checked={participants_customNames?.find(
                  (item) => item === name
                )}
                onClick={(e) => {
                  const { id } = e.target;
                  if (!participants_customNames?.find((item) => item === id)) {
                    const newParticipantsCustom = {
                      ...participants_customized,
                      [id]: 0,
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
              ></input>
              {/* <Checkbox id={name}></Checkbox> */}
              <label htmlFor={name} className="block w-[150px] ml-2">
                {name}
              </label>
              <Input className="w-10 h-8" placeholder="1"></Input>
              <Input className="w-24 h-8" placeholder="NT."></Input>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddExpense;
