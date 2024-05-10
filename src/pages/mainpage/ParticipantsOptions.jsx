import React, { useState } from "react";
import useStore from "../../utility/hooks/useStore";
import closeIcon from "../../assets/x.png";
import { Input } from "../../components/ui/input";
import { CheckCheck } from "lucide-react";
import { Button } from "../../components/ui/button";
const ParticipantsOptions = ({
  displayParticipantOpt,
  setDisplayParticipantOpt,
  cusAmountGap,
  cusAmountArr,
  participants_customNames,
}) => {
  const { newExpense, setNewExpense, group, shareObj, setShareObj } =
    useStore();
  const { total_amount, participants_customized } = newExpense;

  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] z-[51] fixed top-0 ${displayParticipantOpt} sm:hidden`}
      ></div>
      <section
        className={`fixed ${displayParticipantOpt} shadow-lg rounded-lg z-[51] top-[34%] right-0  md:right-[calc((100%-720px)/2)] sm:top-10 w-full h-full sm:h-[90vh] sm:w-[calc(100%-360px)] md:w-[360px] bg-[#CCB99F] pt-3 px-4`}
      >
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setDisplayParticipantOpt("hidden")}
          className="absolute right-2 top-2 cursor-pointer"
        />
        <p className="text-center">如何分擔</p>
        <p className="pt-1 text-sm text-center text-[#5b4421]">
          份數與金額擇一填寫即可
        </p>
        <p
          className={`text-right my-2 mr-6 ${cusAmountGap === 0 ? "" : "text-red-500"}`}
        >
          剩餘金額 {cusAmountGap} 元
        </p>
        <div className="flex justify-center ml-[80px] gap-[30px]">
          <p>份數</p>
          <p>金額</p>
        </div>
        <form action="">
          {group?.users?.map(({ name }, index) => {
            return (
              <div
                className="flex justify-center gap-1 items-center mt-2 relative"
                key={name}
              >
                <div
                  className={`${
                    participants_customNames?.find((item) => item === name) &&
                    participants_customized[name]
                      ? "absolute md:left-[10px] sm:left-[-12px]  left-[calc((100%-240px)/2-18px)]"
                      : "hidden"
                  } `}
                >
                  <CheckCheck className="w-4 "></CheckCheck>
                </div>
                <label htmlFor={name} className="block w-[100px] ml-2">
                  {name}
                </label>
                <Input
                  className="w-12 h-8 pr-[1px]"
                  value={shareObj?.[name]}
                  onChange={(e) => {
                    const { value } = e.target;
                    const num = Number(value);
                    if ((!num && value != "") || num < 0 || num % 1) return;

                    const newShareObj = { ...shareObj, [name]: num ? num : "" };
                    setShareObj(newShareObj);
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
                    //does anybody Have Share
                    const shareTotal = Object.values(newShareObj).reduce(
                      (acc, cur) => {
                        if (cur === "") return acc;
                        return acc + cur;
                      },
                      0
                    );
                    const amountObj = {};
                    for (const [key, share] of Object.entries(newShareObj)) {
                      const amount = (share / shareTotal) * total_amount || 0;
                      amountObj[key] = Math.round(amount * 100) / 100;
                    }
                    setNewExpense({
                      ...newExpense,
                      participants_customized: { ...amountObj },
                    });
                    // }
                  }}
                ></Input>
                <Input
                  className="w-24 h-8 pr-2"
                  placeholder="NT."
                  value={participants_customized[name] || ""}
                  onChange={(e) => {
                    const { value } = e.target;
                    const num = Number(value);
                    if ((!num && value != "") || num < 0 || num % 1) return;
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
          {/* <button type="reset">全部清除</button> */}
        </form>
      </section>
    </>
  );
};

export default ParticipantsOptions;
