import React from "react";
import useStore from "../../utility/hooks/useStore";
import closeIcon from "../../assets/x.png";
import { Input } from "../../components/ui/input";

const PayersOption = ({
  displayPayersOpt,
  setDisplayPayersOpt,
  payersAmountGap,
  morePayersNames,
}) => {
  const { newExpense, setNewExpense, group } = useStore();
  const { morePayers } = newExpense;
  return (
    <section
      className={`rounded-lg fixed z-[51] ${displayPayersOpt} bg-[#f3e8a2] top-1/2 right-0  md:right-[calc((100%-720px)/2)] sm:top-10 w-full h-1/2 sm:h-[800px] sm:w-[270px] md:w-[360px] p-3 px-4`}
    >
      <img
        src={closeIcon}
        alt="closeIcon"
        onClick={() => setDisplayPayersOpt("hidden")}
        className="absolute right-2 top-2 cursor-pointer"
      />
      <p className="text-center">多人付款</p>
      <p
        className={`text-right mr-6 my-2 ${payersAmountGap === 0 ? "" : "text-red-500"}`}
      >
        剩餘金額 {payersAmountGap} 元
      </p>

      <div className="flex justify-center ml-[130px] gap-[30px]">
        <p>金額</p>
      </div>
      {group?.users?.map(({ name }) => {
        return (
          <div
            className="flex justify-center items-center mt-2 relative"
            key={name}
          >
            <div
              className={`${
                morePayersNames?.find((item) => item === name) &&
                morePayers[name]
                  ? ""
                  : "hidden"
              } absolute right-[300px] z-30`}
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
  );
};

export default PayersOption;
