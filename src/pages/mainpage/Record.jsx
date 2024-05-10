import React from "react";
import list from "../../assets/list.png";
import useStore from "../../utility/hooks/useStore";
import { parseISO, format } from "date-fns";
import { EditDeleteButtons } from "./EditDeleteButtons";
import { updateGroupData } from "../../utility/handleFirestore";
import { ChevronsRight, CircleUserRound } from "lucide-react";

const Record = ({
  expensesArrToRender,
  children,
  displayDetail,
  setDisplayDetail,
  displayHistory,
  setDisplayEditExpense,
}) => {
  const {
    newExpense,
    setNewExpense,
    group,
    setDate,
    setSelected,
    tempGroupId,
    setShareObj,
  } = useStore();
  const { expenses, users } = group;

  const usersObj = group.users?.reduce((acc, user) => {
    acc[user.name] = "";
    return acc;
  }, {});
  function handleEditExpense(expenseTime) {
    const expenseToEdit = expenses.filter(
      (item) => item.time === expenseTime
    )[0];
    setNewExpense(expenseToEdit);
    const { participants, date } = expenseToEdit;
    const parsedDate = date && parseISO(date);
    const unixTimestamp = parsedDate.getTime();
    setDate(unixTimestamp);
    const optionsSelected = participants?.map((item) => {
      return { label: item, value: item };
    });
    setSelected(optionsSelected);
    setShareObj(usersObj);
    setDisplayEditExpense("block");
  }
  async function handleDeleteExpense(expenseTime) {
    const expensesRemain = expenses.filter((item) => item.time !== expenseTime);
    await updateGroupData(tempGroupId, { ...group, expenses: expensesRemain });
    alert("刪除成功");
  }
  function getImg(name) {
    const user = users.find((item) => item.name === name);
    return user?.img;
  }
  return (
    <section
      className={`${displayHistory?.display} max-h-[700px]  overflow-auto  rounded-md p-1 `}
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
                creater,
              } = exp;
              const isSinglePayer = singlePayerOnly !== "多人付款";
              const payersPair = morePayers && Object.entries(morePayers);
              const actualPayersPair = payersPair.filter(
                (item) => item[1] !== 0
              );
              return (
                <fieldset key={time} id={time}>
                  <div
                    className="flex flex-wrap mt-2 cursor-pointer  rounded-md  py-2 pr-3 hover:shadow-xl"
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
                    <figure className="self-center">
                      <img src={list} alt="icon" className="w-11" />
                    </figure>
                    <figcaption className="ml-2 w-[160px] sm:w-[380px] ">
                      <p className="w-full truncate">{item}</p>
                      <p>
                        {isSinglePayer
                          ? `${singlePayerOnly}先付${total_amount}元`
                          : `${actualPayersPair && actualPayersPair.length}人先付${total_amount}元`}
                      </p>
                      <p className="text-xs text-slate-400">{date}</p>
                    </figcaption>
                    <div className="ml-[20px] sm:ml-[52px]">
                      NT {total_amount}元
                    </div>
                  </div>
                  <article
                    className={`py-2 pl-6 sm:pl-24 pr-2 sm:pr-8 ${displayDetail?.[time] || "hidden"}`}
                  >
                    <div className="mt-3 flex justify-between items-start flex-wrap">
                      <figcaption className="w-[240px] sm:w-[300px]">
                        <div
                          className={`my-1 ${actualPayersPair.length ? "border-b-2" : ""} border-[#CABB9D] pb-2 mb-2`}
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
                                    <div className="rounded-full bg-gray-200 w-5 h-5 mr-2">
                                      {getImg(name) ? (
                                        <img
                                          src={getImg(name)}
                                          alt=""
                                          className="rounded-full w-5 h-5"
                                        />
                                      ) : (
                                        <CircleUserRound className="w-5 h-5" />
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
                                className="flex items-center w-full text-sm sm:text-base py-1"
                              >
                                <div className="rounded-full bg-gray-200 w-5 h-5 mr-2">
                                  {getImg(name) ? (
                                    <img
                                      src={getImg(name)}
                                      alt=""
                                      className="rounded-full w-5 h-5"
                                    />
                                  ) : (
                                    <CircleUserRound className="w-5 h-5" />
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
                          {creater}在{format(time, "yyyyMMdd")}建立
                        </p>
                        <p className="text-slate-500 text-sm w-full truncate">
                          {note}
                        </p>
                      </figcaption>
                      {/* <figure className="flex flex-wrap gap-2"> */}
                      {/* <div className="w-40 h-20 bg-slate-200">
                          <img alt="圖片" />
                        </div> */}
                      {/* </figure> */}
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
