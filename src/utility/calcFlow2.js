function calcFlow(totalBill) {
  const entries = Object.entries(totalBill);
  const posEntries = entries.filter((entry) => entry[1] > 0);
  const negEntries = entries.filter((entry) => entry[1] < 0);
  const sortedPosEntries = posEntries.sort(
    (a, b) => Math.abs(b[1]) - Math.abs(a[1])
  );
  const sortedNegEntries = negEntries.sort(
    (a, b) => Math.abs(b[1]) - Math.abs(a[1])
  );
  const flows = [];

  let sortedTempPosEntries = [...sortedPosEntries];
  let sortedTempNegEntries = [...sortedNegEntries];

  sortedTempPosEntries = sortedTempPosEntries.filter((item) => item[1] !== 0);
  sortedTempNegEntries = sortedTempNegEntries.filter((item) => item[1] !== 0);
  while (sortedTempPosEntries.length && sortedTempNegEntries.length) {
    const [posName, posAmount] = sortedTempPosEntries[0];
    const [negName, negAmount] = sortedTempNegEntries[0];

    if (posAmount + negAmount > 0) {
      const flowObj = {
        from: negName,
        to: posName,
        amount: Math.abs(negAmount),
      };
      flows.push(flowObj);
      sortedTempPosEntries[0][1]+=negAmount
      sortedTempNegEntries.shift();
    } else if (posAmount + negAmount < 0) {
      const flowObj = {
        from: negName,
        to: posName,
        amount: posAmount,
      };
      flows.push(flowObj);
      sortedTempNegEntries[0][1]+=posAmount
      sortedTempPosEntries.shift();
    } else {
      const flowObj = {
        from: negName,
        to: posName,
        amount: posAmount,
      };
      flows.push(flowObj);
      sortedTempPosEntries.shift();
      sortedTempNegEntries.shift();
    }
  }
  return flows
}
export default calcFlow;
