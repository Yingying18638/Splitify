import {
  addDoc,
  collection,
  getFirestore,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase";
// import { group } from "../schema_example";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// temp
const groupId = "JR13SgWIQm5UNZFLwBC0";
const example_expense = "example";
//
async function postData(groupId, newExpense) {
  const groupRef = doc(db, "groups", groupId);
  const docSnap = await getDoc(groupRef);
  console.log(docSnap?.data());
  const oldData = docSnap?.data();
  await updateDoc(groupRef, {
    ...oldData,
    expenses: [...oldData.expenses, newExpense],
  });
}
// postData(groupId);
// async function addGroup() {
//   const newGroupRef = doc(collection(db, "groups"));

//   const docRef = await addDoc(collection(db, "groups"), group);
// }
export { postData };
