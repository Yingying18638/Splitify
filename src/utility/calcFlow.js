// const totalBill = { a: -100.0, b: 150.0, d: -250, c: 200 };
//input: totalBill
//output: flow
function calcFlow(totalBill) {
  const names = Object.keys(totalBill || {});
  const amounts = Object.values(totalBill || {});
  const positiveNames = names.filter((item, index) => {
    if (amounts[index] >= 0) {
      return item;
    }
  });
  const negativeNames = names.filter((item, index) => {
    if (amounts[index] < 0) {
      return item;
    }
  });
  const positiveAmounts = amounts.filter((item) => item >= 0);
  const negativeAmounts = amounts.filter((item) => item < 0);
  const flowMatrix = Array.from({ length: negativeAmounts.length }, () =>
    Array.from({ length: positiveAmounts.length }, () => 0)
  );

  let p = 0; // index of positiveAmounts
  let n = 0; // index of negativeAmounts
  while (p < positiveAmounts.length && n < negativeAmounts.length) {
    if (!flowMatrix[n][p] && flowMatrix[n][p] !== 0) break; //prevent errors
    if (positiveAmounts[p] === 0) {
      p++;
      continue;
    }
    if (positiveAmounts[p] + negativeAmounts[n] >= 0) {
      positiveAmounts[p] += negativeAmounts[n];
      flowMatrix[n][p] = Math.abs(negativeAmounts[n]);
      negativeAmounts[n] = 0;
      n++;
    } else {
      negativeAmounts[n] += positiveAmounts[p];
      flowMatrix[n][p] = positiveAmounts[p];
      positiveAmounts[p] = 0;
      p++;
    }
  }
  const flow = [];
  flowMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) return;
      const roundedAmount = Math.round(cell * 100) / 100;
      flow.push({
        from: negativeNames[rowIndex],
        to: positiveNames[colIndex],
        amount: roundedAmount,
      });
    });
  });
  return flow;
}
export default calcFlow;
// module.exports = calcFlow;
