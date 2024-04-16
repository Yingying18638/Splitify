import { create } from "zustand";
import zukeeper from "zukeeper";
const useStore = create(
  zukeeper((set) => ({
    newExpense: [
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
          //   a: 100,
          //   b: 100,
        },

        participants: [],
        note: "",
        img: "",
        bill: {},
      },
    ],
    setNewExpense: (data) => set({ newExpense: data }),
  }))
);
window.store = useStore;
export default useStore;
