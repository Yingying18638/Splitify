//------input: expenseData, users
//---------effect: setNewExpense(participants) if empty
//--------------better practice?????
//------output: payment, average
function calcPaymentAverage(expenseData, users) {
  const usersArr = users.map((user) => user.name);
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
        //其他補零
        const usersLeft = usersArr.filter((item) => item !== singlePayerOnly);
        usersLeft.forEach((item) => (payment[index][item] = 0));
      } else {
        payment.push(morePayers);
        //其他補零
        const payersNames = Object.keys(morePayers);
        const usersLeft = usersArr.filter(
          (item) => !payersNames.includes(item)
        );
        usersLeft.forEach((item) => (payment[index][item] = 0));
      }
      console.log("payment", payment);
      // average
      const cusAmountTotal = Object.values(participants_customized).reduce(
        (acc, cur) => acc + cur,
        0
      );

      const isDistributedEven = !cusAmountTotal;
      if (isDistributedEven) {
        const ptcptNumber = participants.length;
        const ave = Math.round(total_amount / ptcptNumber);
        const obj = participants.reduce((acc, cur) => {
          acc[cur] = ave;
          return acc;
        }, {});
        average.push(obj);
      } else {
        average.push(participants_customized);
      }
      const namesOfAve = Object.keys(average[index]);
      //人數不符要補零
      if (namesOfAve.length !== usersArr.length) {
        const usersLeft = usersArr.filter((item) => !namesOfAve.includes(item));
        usersLeft.forEach((item) => (average[index][item] = 0));
      }
      console.log("average", average);
    }
  );
  return { payment, average };
}

export default calcPaymentAverage;
