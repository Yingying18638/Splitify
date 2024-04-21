import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
const INITIANL_NEWEXPENSE = {
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
    //   a: 100,
    //   b: 100,
  },
  participants: [
    // "a", "b", "c"
  ],
  participants_customized: {
    // a: 120, b: 80, c: 100
  },
  note: "",
  img: "",
  ave: {},
};
const useStore = create(
  immer((set) => ({
    newExpense: INITIANL_NEWEXPENSE,
    setNewExpense: (data) => set({ newExpense: data }),
    setsomeNewExpense: (value, property) =>
      set((state) => {
        state.newExpense[property] = value;
      }),
    resetNewExpense: () =>
      set({
        newExpense: INITIANL_NEWEXPENSE,
      }),
    group: {
      groupId: "",
      users: [
        { uid: "", name: "a", email: "" },
        { uid: "", name: "b", email: "" },
        { uid: "", name: "c", email: "" },
        { uid: "", name: "d", email: "" },
        // { uid: "", name: "e", email: "" },
      ],
      expenses: [
        // {
        //   date: "",
        //   time: "",
        //   item: "",
        //   icon: "",
        //   total_amount: 0,
        //   foreign_amount: 0,
        //   currency: "",
        //   exchange_rate: 0,
        //   singlePayerOnly: "",
        //   morePayers: {
        //     // a: 150,
        //     // b: 150,
        //   },
        //   participants: [],
        //   participants_customized: {
        //     // a: 120, b: 80, c: 100
        //   },
        //   note: "",
        //   img: "",
        //   bill: {},
        // },
      ],
      totalBill: {
        //  a: -100.0, b: 150.0, d: -250, c: 200
      },
      flow: [
        // {
        //   from: "a",
        //   to: "b",
        //   amount: 100,
        // },
        // {
        //   from: "a",
        //   to: "c",
        //   amount: 0,
        // },
        // {
        //   from: "d",
        //   to: "b",
        //   amount: 50,
        // },
        // {
        //   from: "d",
        //   to: "c",
        //   amount: 200,
        // },
      ],
      paidAmount: [{ from: "a", to: "b", amount: 10, time: "timestamp" }],
      leftAmount: [{ from: "a", to: "b", amount: 90 }],
      history: [],
    },
    setGroup: (data) => set({ group: data }),
    // resetGroup: () =>set({ group: INITIAL })
  }))
);
export default useStore;
