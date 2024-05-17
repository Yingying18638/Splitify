//------input: expenseData, users
//------output: payment, average
function calcPaymentAverage(expenseData, users) {
  if (!expenseData.length || !users.length) return;
  const usersArr = users?.map((user) => user.name);
  const payment = [];
  const average = [];
  expenseData?.forEach(
    (
      {
        singlePayerOnly,
        total_amount,
        morePayers,
        participants_customized,
        participants,
      },
      index
    ) => {
      //payment
      if (singlePayerOnly && singlePayerOnly !== "多人付款") {
        payment.push({ [singlePayerOnly]: total_amount });
        const usersLeft = usersArr.filter((item) => item !== singlePayerOnly);
        usersLeft.forEach((item) => {
          payment[index] = { ...payment[index], [item]: 0 };
        });
      } else {
        payment.push(morePayers);
        const payersNames = Object.keys(morePayers);
        const usersLeft = usersArr.filter(
          (item) => !payersNames.includes(item)
        );
        usersLeft.forEach((item) => {
          payment[index] = { ...payment[index], [item]: 0 };
        });
      }
      // average
      const cusAmountTotal = Object.values(participants_customized).reduce(
        (acc, cur) => acc + cur,
        0
      );

      const isDistributedEven = !cusAmountTotal;
      if (isDistributedEven) {
        const ptcptNumber = participants.length;
        const ave = Math.round(total_amount / ptcptNumber*100)/100;
        const obj = participants.reduce((acc, cur) => {
          acc[cur] = ave;
          return acc;
        }, {});
        average.push(obj);
      } else {
        average.push(participants_customized);
      }
      const namesOfAve = Object.keys(average[index]);
      if (namesOfAve.length !== usersArr.length) {
        const usersLeft = usersArr.filter((item) => !namesOfAve.includes(item));
        usersLeft.forEach((item) => {
          average[index] = { ...average[index], [item]: 0 };
        });
      }
    }
  );
  return { payment, average };
}

export default calcPaymentAverage;
