import React from "react";
import { Button } from "../../components/ui/button";
import list from "../../assets/list.png";
import { parseISO, format } from "date-fns";
import useStore from "../../utility/hooks/useStore";
const DetailedExpenses = ({
  expensesArrToRender,
  setDisplayDetail,
  displayDetail,
  displayEditExpense,
  setDisplayEditExpense,
}) => {
  const groupId = "R9jYevBIidQsWX4tR3PW";
  const { newExpense, setNewExpense, group, setDate, setSelected } = useStore();
  const { expenses } = group;
  function handleEditExpense(expenseTime) {
    const expenseToEdit = expenses.filter(
      (item) => item.time === expenseTime
    )[0];
    setNewExpense(expenseToEdit);
    const { participants, date } = expenseToEdit;
    const parsedDate = parseISO(date);
    const unixTimestamp = parsedDate.getTime();
    setDate(unixTimestamp);
    const optionsSelected = participants?.map((item) => {
      return { label: item, value: item };
    });
    setSelected(optionsSelected);
    setDisplayEditExpense("block");
  }
  return (
    <>
      {expensesArrToRender.map(([date, expenses]) => {
        return (
          <div key={date}>
            <h2>{`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`}</h2>
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
                    className="flex flex-wrap mt-3 cursor-pointer"
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
                    <figcaption className="ml-2 w-[200px] md:w-[400px]">
                      <p>{item}</p>
                      <p>
                        {isSinglePayer
                          ? `${singlePayerOnly}先付${total_amount}元`
                          : payersPair &&
                            payersPair.map(
                              ([name, amount]) => `${name}先付${amount}元  `
                            )}
                      </p>
                      <p className="text-xs text-slate-400">{date}</p>
                    </figcaption>
                    <div className="sm:ml-4">NT {total_amount}元</div>
                  </div>
                  <article
                    className={`ml-20 w-[320px] ${displayDetail?.[time] || "hidden"}`}
                  >
                    <div className="flex flex-wrap flex-col mt-3">
                      <figcaption className="w-[200px] md:w-[400px]">
                        {ave &&
                          Object.entries(ave).map(([name, amount]) => {
                            if (amount === 0) return;
                            return (
                              <p key={name}>
                                {name}應負擔{amount}元
                              </p>
                            );
                          })}
                      </figcaption>

                      <figure className="flex flex-wrap gap-2">
                        <div className="text-slate-500 text-sm">
                          <p className="text-slate-500 text-sm">
                            {creater}在{format(time, "yyyyMMdd")}建立
                          </p>
                          <p className="text-slate-500 text-sm">{note}</p>
                        </div>
                        <div className="w-40 h-20 bg-slate-200">
                          <img alt="圖片" />
                        </div>
                      </figure>
                      <div className="md:self-center">
                        <Button onClick={() => handleEditExpense(time)}>
                          編輯
                        </Button>
                        <Button>刪除</Button>
                      </div>
                    </div>
                  </article>
                </fieldset>
              );
            })}
          </div>
        );
      })}
      <p className="text-center">查看已結清紀錄</p>
    </>
  );
};

export default DetailedExpenses;