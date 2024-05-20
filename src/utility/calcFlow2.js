const totalBill = { a: -180.0, b: 150.0, d: -250, c: 200, e: 80 };
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
  let lessLength = 0;
  const flows = [];
  if (sortedPosEntries.length >= sortedNegEntries.length) {
    lessLength = sortedNegEntries.length;
  } else {
    lessLength = sortedPosEntries.length;
  }
  let sortedTempPosEntries = [...sortedPosEntries];
  let sortedTempNegEntries = [...sortedNegEntries];
  sortedTempPosEntries = sortedTempPosEntries.filter((item) => item[1] !== 0);
  sortedTempNegEntries = sortedTempNegEntries.filter((item) => item[1] !== 0);
  console.log(flows, sortedTempPosEntries,sortedTempNegEntries);

  while(sortedTempPosEntries.length>0 || sortedTempNegEntries.length>0){
    for (let i = 0; i < lessLength; i++) {
        if (sortedTempNegEntries[i][1] + sortedTempPosEntries[i][1] > 0) {
          const flowObj = {
            from: sortedTempNegEntries[i][0],
            to: sortedTempPosEntries[i][0],
            amount: Math.abs(sortedTempNegEntries[i][1]),
          };
          flows.push(flowObj);
          sortedTempNegEntries = sortedTempNegEntries.filter(
            (item) => item[0] !== sortedTempNegEntries[i][0]
          );
        } else if (sortedTempNegEntries[i][1] + sortedTempPosEntries[i][1] < 0) {
          const flowObj = {
            from: sortedTempNegEntries[i][0],
            to: sortedTempPosEntries[i][0],
            amount: sortedTempPosEntries[i][1],
          };
          flows.push(flowObj);
          sortedTempPosEntries = sortedTempPosEntries.filter(
            (item) => item[0] !== sortedTempPosEntries[i][0]
          );
        } else {
          const flowObj = {
            from: sortedTempNegEntries[i][0],
            to: sortedTempPosEntries[i][0],
            amount: sortedTempPosEntries[i][1],
          };
          flows.push(flowObj);
          sortedTempPosEntries = sortedTempPosEntries.filter(
            (item) => item[0] !== sortedTempPosEntries[i][0]
          );
          sortedTempNegEntries = sortedTempNegEntries.filter(
            (item) => item[0] !== sortedTempNegEntries[i][0]
          );
        }
      }
  }
  console.log(flows, sortedTempPosEntries,sortedTempNegEntries);
}
calcFlow(totalBill);
export default calcFlow;
