import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
const INITIAL_TEMP_EXPENSE = {
  date: "",
  time: "",
  item: "",
  creator: "",
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
const INITIAL_GROUP = {
  groupName: "",
  groupId: "",
  users: [
    // { uid: "", name: "1", email: "" },
    // { uid: "", name: "2", email: "" },
    // { uid: "", name: "3", email: "" },
    // { uid: "", name: "d", email: "" },
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
  // paidAmount: [
  //   // { from: "a", to: "b", amount: 10, time: "timestamp" }
  // ],
  // leftAmount: [
  //   // { from: "a", to: "b", amount: 90 }
  // ],
  history: [],
};
const INITIAL_USER = {
  uid: "",
  name: "",
  email: "",
  img: "",
  inGroup: {},
};
const useZustandStore = create(
  immer((set) => ({
    tempUser: INITIAL_USER,
    setTempUser: (data) => set({ tempUser: data }),
    tempGroupId: "",
    setTempGroupId: (data) => set({ tempGroupId: data }),

    tempExpense: INITIAL_TEMP_EXPENSE,
    setTempExpense: (data) => set({ tempExpense: data }),
    setOnePropInTempExpense: (value, property) =>
      set((state) => {
        state.tempExpense[property] = value;
      }),
    resetTempExpense: () =>
      set({
        tempExpense: INITIAL_TEMP_EXPENSE,
      }),
    group: INITIAL_GROUP,
    setGroup: (data) => set({ group: data }),
    resetGroup: () => set({ group: INITIAL_GROUP }),
    date: new Date(),
    setDate: (data) => set({ date: data }),
    selected: [],
    setSelected: (data) => set({ selected: data }),
    shareObj: {},
    setShareObj: (data) => set({ shareObj: data }),
  }))
);
export default useZustandStore;
