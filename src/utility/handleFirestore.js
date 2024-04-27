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
import useStore from "./hooks/useStore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// temp
// const groupId = "R9jYevBIidQsWX4tR3PW";
// const example_expense = "example";
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
async function addGroupAndUpdateID(groupData) {
  const newGroupRef = doc(collection(db, "groups"));
  await addDoc(collection(db, "groups"), groupData);
  const { id } = newGroupRef;
  const docSnap = await getDoc(newGroupRef);
  const oldData = docSnap?.data();
  // await updateDoc(newGroupRef, { ...oldData, groupId: id });
}
export {
  updateGroupData,
  db,
  getData,
  useClerkDataToFirestore,
  addDocWithId,
  useListenUsers,
  useListenGroups,
};

// function useGetDetail(groupId, setterFunction) {
//   useEffect(() => {
//     //監聽group資料
//     //設state
//     const docRef = doc(db, "groups", groupId);
//     const unsubscribe = onSnapshot(docRef, (doc) => {
//       const data = doc.data();
//       setterFunction(data);
//       console.log("Current data: ", data);
//     });
//     return () => unsubscribe();
//   }, [groupId]);
// }
//input userId
//output (firestore set)
function useClerkDataToFirestore(userId, userObj, setTempUser, setTempGroupId) {
  useEffect(() => {
    (async function handleData(userId, userObj, setTempUser, setTempGroupId) {
      //get user from firestore
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      //if user not exist in firestore, add it
      if (docSnap.exists()) {
        const data = docSnap.data();
        const { inGroup } = data;
        const firstGroupId = Object.keys(inGroup)[0];
        console.log("文件存在:", data);
        setTempUser(data);
        // setTempGroupId(firstGroupId);
        return;
      } else {
        await addDocWithId(userId, "users", userObj);
        console.log("新增成功");
      }
    })(userId, userObj, setTempUser, setTempGroupId);
  }, [userId]);
}

async function addDocWithId(docId, collection, data) {
  try {
    await setDoc(doc(db, collection, docId), data);
  } catch (error) {
    console.log(error);
  }
}

//監聽groups
function useListenGroups() {
  const { tempGroupId, setGroup } = useStore();
  useEffect(() => {
    if (!tempGroupId) return;
    console.log("開始監聽或改變監聽", tempGroupId);
    getData(db, "groups", tempGroupId, setGroup);
    const docRef = doc(db, "groups", tempGroupId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setGroup(data);
      console.log("監聽到的group data: ", data);
    });
    return () => unsubscribe();
  }, [tempGroupId]);
}

//監聽users
function useListenUsers() {
  console.log("你說我有在聽user");
  const { tempUser, setTempUser } = useStore();
  useEffect(() => {
    const { uid } = tempUser;
    if (!uid) return;
    console.log("開始監聽user或改變監聽", uid);
    //先取得正確的user data
    // getData(db, "users", uid, setTempUser);
    //監聽users資料 + 設state
    const docRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setTempUser(data); // 從任一群組刪別人時要更新別人的inGroup
      console.log("監聽到的user data: ", data);
    });
    return () => unsubscribe();
  }, [tempUser.uid]);
}
async function getData(db, collection, docId, setterFunction) {
  try {
    const docRef = doc(db, collection, docId);
    const docSnap = await getDoc(docRef);
    const data = docSnap?.data();
    console.log(data, "我拿到data");
    setterFunction(data);
  } catch (e) {
    console.log(e);
  }
}
