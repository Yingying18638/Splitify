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
// async function addGroupId(docRef) {
//   const newGroupRef = doc(collection(db, "groups"));
//   const {id}=newGroupRef
//   const docSnap = await getDoc(newGroupRef);
//   const oldData = docSnap?.data();
//   await updateDoc(newGroupRef, {...oldData, groupId: id })
// }
// addGroupId();
async function addGroupAndUpdateID(groupData) {
  const newGroupRef = doc(collection(db, "groups"));
  await addDoc(collection(db, "groups"), groupData);
  const { id } = newGroupRef;
  const docSnap = await getDoc(newGroupRef);
  const oldData = docSnap?.data();
  await updateDoc(newGroupRef, { ...oldData, groupId: id });
}
export { postData, addGroupAndUpdateID };
