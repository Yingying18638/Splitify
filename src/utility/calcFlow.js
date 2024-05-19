// const totalBill = { a: -100.0, b: 150.0, d: -250, c: 200 };
//input: totalBill
//output: flow
function calcFlowDetail(totalBill) {
  const names = Object.keys(totalBill || {});
  const amounts = Object.values(totalBill || {});
  const posNames = names.filter((item, index) => {
    if (amounts[index] >= 0) {
      return item;
    }
  });
  const negNames = names.filter((item, index) => {
    if (amounts[index] < 0) {
      return item;
    }
  });
  const positives = amounts.filter((item) => item >= 0);
  const negatives = amounts.filter((item) => item < 0);
  const flowMatrix = Array.from({ length: negatives.length }, () =>
    Array.from({ length: positives.length }, () => 0)
  );

  let p = 0;
  let n = 0;
  while (p < positives.length && n < negatives.length) {
    if (!flowMatrix[n][p] && flowMatrix[n][p] !== 0) break;
    if (positives[p] === 0) {
      p++;
      continue;
    }
    if (positives[p] + negatives[n] >= 0) {
      positives[p] += negatives[n];
      flowMatrix[n][p] = Math.abs(negatives[n]);
      negatives[n] = 0;
      n++;
    } else {
      negatives[n] += positives[p];
      flowMatrix[n][p] = positives[p];
      positives[p] = 0;
      p++;
    }
  }
  const flow = [];
  flowMatrix.forEach((item, index) => {
    item.forEach((it, ind) => {
      if (it === 0) return;
      const roundedAmount = Math.round(it * 100) / 100;
      flow.push({
        from: negNames[index],
        to: posNames[ind],
        amount: roundedAmount,
      });
    });
  });
  return flow;
}
export default calcFlowDetail;
// module.exports = calcFlowDetail;
