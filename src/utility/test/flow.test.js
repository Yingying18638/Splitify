import calcFlow from "../calcFlow2";
const billTest={a: -130.0, b: 180.0, d: -200, c: 200, e:-50}
const result = calcFlow(billTest);
function testFlow(result){
    const payersWithAmt = result.reduce((acc, cur) => {
        acc.push([cur.from, cur.amount]);
        return acc;
      }, []);
      const recipientsWithAmt = result.reduce((acc, cur) => {
        acc.push([cur.to, cur.amount]);
        return acc;
      }, []);
      const condensedPayersWithAmt = payersWithAmt.reduce((acc, cur) => {
        const name = cur[0];
        const amount = -cur[1];
        if (acc[name]) {
          acc[name] += amount;
        } else {
          acc[name] = amount;
        }
        return acc;
      }, {});
      const condensedRecipientsWithAmt = recipientsWithAmt.reduce((acc, cur) => {
        const name = cur[0];
        const amount = cur[1];
        if (acc[name]) {
          acc[name] += amount;
        } else {
          acc[name] = amount;
        }
        return acc;
      }, {});
      const totalBill={...condensedPayersWithAmt,...condensedRecipientsWithAmt}
      return totalBill
}
describe("flow", () => {
  test("calc totalBill to be the same", () => {
    expect(testFlow(result)).toStrictEqual(billTest);
  });
});
