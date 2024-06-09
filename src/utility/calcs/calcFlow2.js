function calcFlow(totalBill) {
  const entries = Object.entries(totalBill);
  const posEntries = entries.filter((entry) => entry[1] > 0);
  const negEntries = entries.filter((entry) => entry[1] < 0);
  const flows = [];
  while (posEntries.length && negEntries.length) {
    const [posName, posAmount] = posEntries[0];
    const [negName, negAmount] = negEntries[0];

    if (posAmount + negAmount > 0) {
      const flowObj = {
        from: negName,
        to: posName,
        amount: Math.abs(negAmount),
      };
      flows.push(flowObj);
      posEntries[0][1] += negAmount;
      negEntries.shift();
    } else if (posAmount + negAmount < 0) {
      const flowObj = {
        from: negName,
        to: posName,
        amount: posAmount,
      };
      flows.push(flowObj);
      negEntries[0][1] += posAmount;
      posEntries.shift();
    } else {
      const flowObj = {
        from: negName,
        to: posName,
        amount: posAmount,
      };
      flows.push(flowObj);
      posEntries.shift();
      negEntries.shift();
    }
  }
  return flows;
}
export default calcFlow;
