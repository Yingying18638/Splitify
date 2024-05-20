import calcFlow from "../calcFlow2";
describe("flow", () => {
  test("calc totalBill { a: -100.0, b: 150.0, d: -250, c: 200 } to be", () => {
    expect(calcFlow({ a: -100.0, b: 150.0, d: -250, c: 200 })).toStrictEqual([
      {
        from: "d",
        to: "c",
        amount: 200,
      },
      {
        from: "d",
        to: "b",
        amount: 50,
      },
      {
        from: "a",
        to: "b",
        amount: 100,
      },
    ]);
  });
});
