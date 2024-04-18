import { create } from "zustand";
const INITIANL_STATE = {
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
  bill: [],
};
const useStore = create((set) => ({
  newExpense: INITIANL_STATE,
  setNewExpense: (data) => set({ newExpense: data }),
  resetNewExpense: () =>
    set({
      newExpense: INITIANL_STATE,
    }),
}));
export default useStore;
