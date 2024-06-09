//------input: expenses, users
//------output: payment, average
import calcSingleAve from "./calcSingleAve";
function calcPaymentAverage(expenses, users) {
  if (!expenses.length || !users.length) return;
  const usersArr = users?.map((user) => user.name);
  const payment = [];
  const average = [];
  expenses?.forEach((expense, index) => {
    //payment
    const { singlePayerOnly, morePayers, total_amount } = expense;
    if (singlePayerOnly && singlePayerOnly !== "多人付款") {
      payment.push({ [singlePayerOnly]: total_amount });
      const usersLeft = usersArr.filter((item) => item !== singlePayerOnly);
      usersLeft.forEach((item) => {
        payment[index] = { ...payment[index], [item]: 0 };
      });
    } else {
      payment.push(morePayers);
      const payersNames = Object.keys(morePayers);
      const usersLeft = usersArr.filter((item) => !payersNames.includes(item));
      usersLeft.forEach((item) => {
        payment[index] = { ...payment[index], [item]: 0 };
      });
    }
    // average
    const singleAve = calcSingleAve(expense);
    average.push(singleAve);
    const namesOfAve = Object.keys(average[index]);
    if (namesOfAve.length !== usersArr.length) {
      const usersLeft = usersArr.filter((item) => !namesOfAve.includes(item));
      usersLeft.forEach((item) => {
        average[index] = { ...average[index], [item]: 0 };
      });
    }
  });
  return { payment, average };
}

export default calcPaymentAverage;
