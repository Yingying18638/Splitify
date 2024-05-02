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
        className={`fixed ${displayParticipantOpt} shadow-lg rounded-lg z-[51] top-[34%] right-0  md:right-[calc((100%-720px)/2)] sm:top-10 w-full h-full sm:h-[800px] sm:w-[270px] md:w-[360px] bg-[#f4edc7] pt-3 px-4`}
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
                      ? ""
                      : "hidden"
                  } `}
                >
                  <CheckCheck></CheckCheck>
                </div>
                <label
                  // htmlFor={`participant_${name}`}
                  htmlFor={name}
                  className="block w-[100px] ml-2"
                >
                  {name}
                </label>
                <Input
                  className="w-10 h-8"
                  value={shareObj?.[name]}
                  onChange={(e) => {
                    const { value } = e.target;
                    const num = parseInt(value);
                    // if (isNaN(num) && value !== "") return;
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
                      // amountObj[key] = amount;
                      amountObj[key] = Math.round(amount);
                      // ? Math.round(amount)
                      // : 0;
                    }
                    setNewExpense({
                      ...newExpense,
                      participants_customized: { ...amountObj },
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
          {/* <button type="reset">全部清除</button> */}
        </form>
      </section>
    </>
  );
};

export default ParticipantsOptions;
