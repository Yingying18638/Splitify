const group = {
  groupId: "",
  groupName: "FEbatch#23",
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
  groupIds: [],
};
export { group, users };

//////////////////////////////////
// import { useUser, useAuth } from "@clerk/clerk-react";
// import { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Header from "../../common_components/Header";
// export default function Layout() {
//   const { isSignedIn, user } = useUser();
//   const { userId, isLoaded } = useAuth();
//   const navigate = useNavigate();
//   // const { id, fullName, imageUrl, emailAddress } = user && user;
//   // const email = emailAddress[0].emailAddress;
//   console.log("test", userId);
//   console.log(user);
//   useEffect(() => {
//     if (isLoaded && !userId) {
//       // navigate("/sign-in")
//       console.log("請重新登入");
//     }
//   }, [isLoaded]);

//   if (!isLoaded) return "Loading...";

//   return (
//     <>
//       <Outlet />
//     </>
//   );
// }
