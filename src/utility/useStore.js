import { create } from "zustand";
import zukeeper from "zukeeper";
const useStore = create(
  zukeeper((set) => ({
    expenseData: {
      date: "",
      time: "",
      item: "",
      icon: "",
      payersAndAmounts: [
        {
          name: "",
          foreign_amount: 0,
          tw_amount: 0,
          currency: "",
          exchange_rate: 0,
        },
      ],
      participants: [], //{ name: "" }], //, customized_amount: 0 }],
      note: "",
      img: "",
    },
    setExpenseData: (data) => set({ expenseData: data }),
  }))
);
window.store = useStore;
export default useStore;
