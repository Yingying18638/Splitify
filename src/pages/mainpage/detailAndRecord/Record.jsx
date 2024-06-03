import { useToast } from "@/components/ui/use-toast";
import { format, parseISO } from "date-fns";
import { CircleUserRound } from "lucide-react";
import React from "react";
import list from "@/assets/list.png";
import { updateGroupData } from "@/utility/handleFirestore";
import useZustandStore from "@/utility/hooks/useZustandStore";
import { EditDeleteButtons } from "./EditDeleteButtons";

const Record = ({
  expensesArrToRender,
  children,
  displayDetail,
  setDisplayDetail,
  displayHistory,
  setDisplayAddExpense,
  setIsEditingExpense,
  setDisplayHistory,
}) => {
  const { toast } = useToast();

  const {
    setTempExpense,
    group,
    setDate,
    setSelected,
    tempGroupId,
    setShareObj,
  } = useZustandStore();
  const { expenses, users } = group;

  const usersObj = group.users?.reduce((acc, user) => {
    acc[user.name] = "";
    return acc;
  }, {});
  function handleEditExpense(expenseTime) {
    const expenseToEdit = expenses.filter(
      (item) => item.time === expenseTime
    )[0];
    setTempExpense(expenseToEdit);
    const { participants, date } = expenseToEdit;
    const parsedDate = date && parseISO(date);
    const unixTimestamp = parsedDate.getTime();
    setDate(unixTimestamp);
    const optionsSelected = participants?.map((item) => {
      return { label: item, value: item };
    });
    setSelected(optionsSelected);
    setShareObj(usersObj);
    setDisplayAddExpense("block");
    setIsEditingExpense(true)
    setDisplayHistory({ display: "hidden", text: "查看" });
  }
  async function handleDeleteExpense(expenseTime) {
    const expensesRemain = expenses.filter((item) => item.time !== expenseTime);
    await updateGroupData(tempGroupId, { ...group, expenses: expensesRemain });
    toast({ title: "刪除成功" });
  }
  function getImg(name) {
    const user = users.find((item) => item.name === name);
    return user?.img;
  }
  return (
    <section
      className={`${displayHistory?.display} max-h-[58vh]  overflow-y-auto  rounded-md p-1 `}
    >
      {expensesArrToRender.map(([date, expenses]) => {
        return (
          <div key={date} className="mt-4 ">
            <h2 className="bg-[#FBECCC] shadow-md rounded-md inline-block px-2 py-[2px] mb-2">{`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`}</h2>
            {expenses.map((exp) => {
              const {
                item,
                time,
                date,
                total_amount,
                singlePayerOnly,
                morePayers,
                note,
                img,
                ave,
                creator,
              } = exp;
              const isSinglePayer = singlePayerOnly !== "多人付款";
              const payersPair = morePayers && Object.entries(morePayers);
              const actualPayersPair = payersPair.filter(
                (item) => item[1] !== 0
              );
              return (
                <fieldset key={time} id={time}>
                  <div
                    className="flex flex-wrap mt-2 cursor-pointer  pl-[10px]
                    rounded-md  py-2 pr-3 hover:shadow-xl "
                    onClick={() => {
                      if (displayDetail?.[time] === "block") {
                        setDisplayDetail({
                          ...displayDetail,
                          [time]: "hidden",
                        });
                      } else {
                        setDisplayDetail({
                          ...displayDetail,
                          [time]: "block",
                        });
                      }
                    }}
                  >
                    <figure className="mt-1">
                      <img src={list} alt="icon" className="w-11 xl:w-12" />
                    </figure>
                    <figcaption className="ml-2 w-[160px] sm:w-[380px] xl:w-[520px]">
                      <p className="w-full truncate">{item}</p>
                      <p>
                        {isSinglePayer
                          ? `${singlePayerOnly}先付${total_amount}元`
                          : `${actualPayersPair && actualPayersPair.length}人先付${total_amount}元`}
                      </p>
                      <p className="text-xs text-slate-400">{date}</p>
                    </figcaption>
                    <div className="ml-[15px] sm:ml-[calc(100%-520px)] xl:ml-[calc(100%-680px)] ">
                      NT {total_amount}元
                    </div>
                  </div>
                  <article
                    className={`py-2 pl-6 sm:pl-24 pr-2 sm:pr-8 ${displayDetail?.[time] || "hidden"}`}
                  >
                    <div className="mt-3 flex justify-between items-start flex-wrap">
                      <figcaption className="w-[240px] sm:w-[300px] ">
                        <div
                          className={` ${actualPayersPair.length ? "border-b-2 my-1 border-[#CABB9D] pb-2 mb-2" : ""} `}
                        >
                          {payersPair &&
                            payersPair.map(([name, amount]) => {
                              if (!amount) return;
                              return (
                                <>
                                  <div
                                    key={name}
                                    className="flex items-center w-full text-sm sm:text-base py-1"
                                  >
                                    <div className="rounded-full bg-gray-200 w-5 h-5 xl:w-7 xl:h-7 mr-2">
                                      {getImg(name) ? (
                                        <img
                                          src={getImg(name)}
                                          alt=""
                                          className="rounded-full xl:w-7 xl:h-7 w-5 h-5"
                                        />
                                      ) : (
                                        <CircleUserRound className="w-5 h-5 xl:w-7 xl:h-7" />
                                      )}
                                    </div>
                                    <p className="max-w-[calc(100%-180px)] truncate">
                                      {name}
                                    </p>
                                    <p>先付{amount}元</p>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                        {ave &&
                          Object.entries(ave).map(([name, amount]) => {
                            if (!amount) return;
                            return (
                              <div
                                key={name}
                                className="flex items-center w-full text-sm sm:text-base xl:text-lg py-1 xl:py-[0.5rem]"
                              >
                                <div className="rounded-full bg-gray-200 w-5 h-5 xl:w-7 xl:h-7 mr-2">
                                  {getImg(name) ? (
                                    <img
                                      src={getImg(name)}
                                      alt=""
                                      className="rounded-full w-5 h-5 xl:w-7 xl:h-7"
                                    />
                                  ) : (
                                    <CircleUserRound className="w-5 h-5 xl:w-7 xl:h-7" />
                                  )}
                                </div>
                                <p className="max-w-[calc(100%-180px)] truncate">
                                  {name}
                                </p>
                                <p>應負擔{amount}元</p>
                              </div>
                            );
                          })}

                        <p className="text-slate-500 text-sm pt-2">
                          {creator}在{format(time, "yyyyMMdd")}建立
                        </p>
                        <p className="text-slate-500 text-sm w-full truncate">
                          {note}
                        </p>
                      </figcaption>
                      {children && (
                        <EditDeleteButtons
                          handleEditExpense={handleEditExpense}
                          handleDeleteExpense={handleDeleteExpense}
                          time={time}
                        />
                      )}
                    </div>
                  </article>
                </fieldset>
              );
            })}
          </div>
        );
      })}
    </section>
  );
};

export default Record;
