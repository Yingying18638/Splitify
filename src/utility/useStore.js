import { create } from "zustand";
const useStore = create((set, get) => ({
  newExpense: {
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
  },
  setNewExpense: (data) => set({ newExpense: data }),
  getNewExpense: () => get().newExpense,
}));
window.store = useStore;
export default useStore;
