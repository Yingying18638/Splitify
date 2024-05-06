import React from "react";
import useStore from "../../utility/hooks/useStore";
import { ChevronsRight, CircleUserRound } from "lucide-react";
const Result = () => {
  const { group, tempGroupId } = useStore();
  const { expenses, flow, users } = group;
  function getImg(name) {
    const user = users.find((item) => item.name === name);
    return user?.img;
  }
  if (!flow.length) return <p className="text-center mb-3">無未結清帳款！</p>;
  return (
    <section className="mt-5">
      {flow.map((item, index) => {
        const { from, to, amount } = item;
        return (
          <>
            <div
              key={index}
              className="flex gap-3 justify-center items-center mb-2"
            >
              <div className="rounded-full bg-gray-200 w-6 h-6">
                {getImg(from) ? (
                  <img
                    src={getImg(from)}
                    alt=""
                    className="rounded-full w-6 h-6"
                  />
                ) : (
                  <CircleUserRound />
                )}
              </div>
              <p className="w-[80px]">{from}</p>
              <p className="text-sm">應給</p>
              <ChevronsRight></ChevronsRight>
              <div className="rounded-full bg-gray-200 w-6 h-6">
              {getImg(to) ? (
                  <img
                    src={getImg(to)}
                    alt=""
                    className="rounded-full w-6 h-6"
                  />
                ) : (
                  <CircleUserRound />
                )}
              </div>
              <p> {to}</p>
              <p>{amount} 元</p>
            </div>
          </>
        );
      })}
    </section>
  );
};

export default Result;
