// input: expenses
// output: sorted+grouped expenses
function getExpensesArranged(expenses) {
  //依照time排序
  const temp = [...expenses];
  const sortedExpenses = temp.sort((a, b) => b.time - a.time);
  //依照date分類
  const groupedExpenses = sortedExpenses.reduce((acc, cur) => {
    const { date } = cur;
    if (!acc[date]) {
      acc[date] = [];
      acc[date].push(cur);
    } else {
      acc[date].push(cur);
    }
    return acc;
  }, {});
  return groupedExpenses;
}
export default getExpensesArranged;
