// input: expenses
// output: sorted+grouped expenses
function getExpensesArranged(expenses) {
  //依照time排序
  const temp = [...expenses];
  const sortedExpenses = temp.sort((a, b) => b.time - a.time);
  //依照date分類
  const groupedExpensesObj = sortedExpenses.reduce((acc, cur) => {
    const { date } = cur;
    if (!acc[date]) {
      acc[date] = [];
      acc[date].push(cur);
    } else {
      acc[date].push(cur);
    }
    return acc;
  }, {});
  const groupedExpensesArr = Object.entries(groupedExpensesObj);
  const expensesArrToRender = groupedExpensesArr.sort((a, b) => b[0] - a[0]);
  return expensesArrToRender;
}
export default getExpensesArranged;
