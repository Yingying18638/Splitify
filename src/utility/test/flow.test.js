const calcFlow = require("../calcFlow");
describe("flow", () => {
  test("calc totalBill { a: -100.0, b: 150.0, d: -250, c: 200 } to be", () => {
    expect(calcFlow({ a: -100.0, b: 150.0, d: -250, c: 200 })).toStrictEqual([
      {
        from: "a",
        to: "b",
        amount: 100,
      },
      {
        from: "d",
        to: "b",
        amount: 50,
      },
      {
        from: "d",
        to: "c",
        amount: 200,
      },
    ]);
  });
});
