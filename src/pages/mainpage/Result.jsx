import React from "react";
import useStore from "../../utility/hooks/useStore";
const Result = () => {
  const { group } = useStore();
  const { expenses, flow } = group;
  if (!flow.length) return <p className="text-center mt-5">無未結清帳款！</p>;
  return (
    <section className="mt-5">
      {flow.map((item, index) => {
        const { from, to, amount } = item;
        return (
          <p key={index} className="text-center">
            {from}給{to} {amount}元
          </p>
        );
      })}
    </section>
  );
};

export default Result;
