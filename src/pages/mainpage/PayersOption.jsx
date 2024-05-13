import React from "react";
import useStore from "../../utility/hooks/useStore";
import closeIcon from "../../assets/x.png";
import { Input } from "../../components/ui/input";
import { CheckCheck,X } from "lucide-react";
const PayersOption = ({
  displayPayersOpt,
  setDisplayPayersOpt,
  payersAmountGap,
  morePayersNames,
}) => {
  const { newExpense, setNewExpense, group } = useStore();
  const { morePayers } = newExpense;
  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] z-[51] fixed top-0 ${displayPayersOpt} sm:hidden`}
      ></div>
      <section
        className={`rounded-lg fixed z-[51] ${displayPayersOpt} bg-[#efddc7] right-0  md:right-[calc((100%-720px)/2)] sm:top-10 
        w-full top-[34%] h-full sm:h-auto sm:max-h-[95vh] pb-6 sm:w-[calc(100%-360px)] md:w-[360px] p-3 px-4`}
      >
        <X
          onClick={() => setDisplayPayersOpt("hidden")}
          className="absolute hover:bg-[#feFae0] p-[2px] rounded-full right-2 top-2 cursor-pointer"
        />
        <p className="text-center">多人付款</p>
        <p
          className={`text-right sm:mr-9 relative sm:static right-[calc((100%-250px)/2)]  my-2 ${payersAmountGap === 0 ? "" : "text-red-500"}`}
        >
          剩餘金額 {payersAmountGap}元
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
                    ? "sm:absolute md:left-[10px] sm:left-[-12px] absolute left-[calc((100%-240px)/2-18px)]"
                    : "hidden"
                }  z-30`}
              >
                <CheckCheck className="w-4"></CheckCheck>
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
                  const num = Number(value);
                  if ((!num && value != "") || num < 0 || num % 1) return;
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
    </>
  );
};

export default PayersOption;
