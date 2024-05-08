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
            <h2 className="bg-[#FBECCC] shadow-md rounded-md w-28 px-1">{`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`}</h2>
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
              return (
                <fieldset key={time} id={time}>
                  <div
                    className="flex flex-wrap mt-2 cursor-pointer  rounded-md shadow-md py-2 px-3 hover:shadow-xl"
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
                    <figure>
                      <img src={list} alt="icon" />
                    </figure>
                    <figcaption className="ml-2  sm:w-[380px]">
                      <p>{item}</p>
                      <p>
                        {isSinglePayer
                          ? `${singlePayerOnly}先付${total_amount}元`
                          : payersPair &&
                            payersPair.map(
                              ([name, amount]) => {
                                if(!amount) return
                                return(`${name}先付${amount}元  `)
                              }
                            )}
                      </p>
                      <p className="text-xs text-slate-400">{date}</p>
                    </figcaption>
                    <div className="ml-3 sm:ml-4">NT {total_amount}元</div>
                  </div>
                  <article
                    className={`pr-8 py-2 pl-16 md:pl-24 ${displayDetail?.[time] || "hidden"}`}
                  >
                    <div className="mt-3 flex justify-between">
                      <figcaption className="">
                        {ave &&
                          Object.entries(ave).map(([name, amount]) => {
                            if (amount === 0) return;
                            return (
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-gray-200 w-5 h-5">
                                  {getImg(name) ? (
                                    <img
                                      src={getImg(name)}
                                      alt=""
                                      className="rounded-full w-5 h-5"
                                    />
                                  ) : (
                                    <CircleUserRound className="w-5 "/>
                                  )}
                                </div>
                                <p key={name}>
                                  {name}應負擔{amount}元
                                </p>
                              </div>
                            );
                          })}
                        <div className="text-slate-500 text-sm">
                          <p className="text-slate-500 text-sm">
                            {creater}在{format(time, "yyyyMMdd")}建立
                          </p>
                          <p className="text-slate-500 text-sm">{note}</p>
                        </div>
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
