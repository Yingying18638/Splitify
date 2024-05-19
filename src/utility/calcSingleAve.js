// input: tempExpense
// output: singleAve
function calcSingleAve(tempExpense) {
  const { total_amount, participants_customized, participants } = tempExpense;
  const cusAmountTotal = Object.values(participants_customized).reduce(
    (acc, cur) => acc + cur,
    0
  );
  if (!cusAmountTotal) {
    const ptcptNumber = participants.length;
    const ave = Math.round((total_amount / ptcptNumber) * 100) / 100;
    const obj = participants.reduce((acc, cur) => {
      acc[cur] = ave;
      return acc;
    }, {});
    return obj;
  } else {
    return participants_customized;
  }
}
export default calcSingleAve;
