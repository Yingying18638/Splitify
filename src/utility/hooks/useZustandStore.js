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
  morePayers: {},
  participants: [],
  participants_customized: {},
  note: "",
  img: "",
  ave: {},
};
const INITIAL_GROUP = {
  groupName: "",
  groupId: "",
  users: [],
  expenses: [],
  totalBill: {},
  flow: [],
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
