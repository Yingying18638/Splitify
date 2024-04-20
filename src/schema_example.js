const group = {
  groupId: "",
  users: [
    { uid: "", name: "a", email: "" },
    { uid: "", name: "b", email: "" },
    { uid: "", name: "c", email: "" },
    { uid: "", name: "d", email: "" },
  ],
  expenses: [
    {
      date: "",
      time: "",
      item: "",
      icon: "",
      total_amount: 0,
      foreign_amount: 0,
      currency: "",
      exchange_rate: 0,
      singlePayerOnly: "",
      morePayers: {
        // a: 150,
        // b: 150,
      },
      participants: [],
      participants_customized: {
        // a: 120, b: 80, c: 100
      },
      note: "",
      img: "",
      ave: {},
    },
  ],
  totalBill: {
    //  a: -100.0, b: 150.0, d: -250, c: 200
  },
  flow: [
    {
      from: "a",
      to: "b",
      amount: 100,
    },
    {
      from: "a",
      to: "c",
      amount: 0,
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
  ],
  paidAmount: [{ from: "a", to: "b", amount: 10, time: "timestamp" }],
  leftAmount: [{ from: "a", to: "b", amount: 90 }],
  // history: [group.expenses, paidAmount],
};

const users = {
  uid: "",
  name: "",
  email: "",
  img: "",
  // password:'',
  groupIds: [],
};
export { group, users };
