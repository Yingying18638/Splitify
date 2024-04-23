import React, { useState } from "react";
import useStore from "../../utility/hooks/useStore";
import closeIcon from "../../assets/x.png";
import { Input } from "../../components/ui/input";
const ParticipantsOptions = ({
  displayParticipantOpt,
  setDisplayParticipantOpt,
  cusAmountGap,
  cusAmountArr,
  participants_customNames,
}) => {
  const { newExpense, setNewExpense, group } = useStore();
  const { total_amount, participants_customized } = newExpense;
  const usersObj = group.users?.reduce((acc, user) => {
    acc[user.name] = "";
    return acc;
  }, {});
  const [shareObj, setShareObj] = useState(usersObj || {});

  return (
    <section
      className={`fixed ${displayParticipantOpt} z-[51] top-1/2 right-0  md:right-[calc((100%-720px)/2)] sm:top-10 w-full h-1/2 sm:h-[800px] sm:w-[270px] md:w-[360px] bg-purple-200 p-2`}
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
      <div className="flex justify-center ml-[90px] gap-[30px]">
        <p>份數</p>
        <p>金額</p>
      </div>
      {group?.users?.map(({ name }, index) => {
        return (
          <div
            className="flex justify-center gap-1 items-center mt-2 relative"
            key={name}
          >
            <div
              className={`${
                participants_customNames?.find((item) => item === name) &&
                cusAmountArr[index]
                  ? ""
                  : "hidden"
              } absolute right-[300px]`}
            >
              v
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
              value={shareObj[name]}
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
    </section>
  );
};

export default ParticipantsOptions;
