import React from "react";
import useStore from "../../utility/hooks/useStore";
const Result = () => {
  const { group, tempGroupId } = useStore();
  const { expenses, flow } = group;
  if (!flow.length )
    return <p className="text-center mb-3">無未結清帳款！</p>;
  return (
    <section className="mt-5">
      {flow.map((item, index) => {
        const { from, to, amount } = item;
        return (
          <div key={index} className="flex gap-4 justify-center">
            <p  className="w-[80px]">
              {from}
            </p>
            <p className="w-[100px]">給{to}</p>
            <p>{amount}元</p>
          </div>
        );
      })}
    </section>
  );
};

export default Result;
