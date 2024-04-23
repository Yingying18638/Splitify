import {
  query,
  where,
  onSnapshot,
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
import { useEffect, useState } from "react";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// temp

const groupId = "JR13SgWIQm5UNZFLwBC0";
const example_expense = "example";
//
async function updateGroupData(groupId, newGroupData) {
  try {
    const groupRef = doc(db, "groups", groupId);
    const docSnap = await getDoc(groupRef);
    const oldData = docSnap?.data();
    const { expenses, totalBill, flow } = newGroupData;
    // const groupToSet = { ...oldData, expenses, totalBill, flow };
    // const fieldToSet = { expenses: [...expenses], totalBill, flow: [...flow] };
    // await setDoc(groupRef, fieldToSet, { merge: true });
    await setDoc(groupRef, newGroupData);
  } catch (err) {
    console.log(err, "上傳失敗");
  }
}
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
export { updateGroupData, addGroupAndUpdateID, useGetDetail };

function useGetDetail(groupId, setterFunction) {
  useEffect(() => {
    //監聽group資料
    //設state
    const docRef = doc(db, "groups", groupId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setterFunction(data);
      console.log("Current data: ", data);
    });
    return () => unsubscribe();
  }, [groupId]);
}
