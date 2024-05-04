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
export {
  updateGroupData,
  db,
  getData,
  useUserData,
  addDocWithId,
  useListenUsers,
  useListenGroups,
  useCheckUrlSetDialog,
  useClerkDataToFirestore,
  justGetData,
  updateOneField,
};
async function addDocWithId(docId, collection, data) {
  try {
    await setDoc(doc(db, collection, docId), data);
  } catch (error) {
    console.log(error);
  }
}
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
//input userId,userObj,setTempUser,setTempGroupId
//output (firestore set, tempUser set)
function useUserData(userId, userObj, setIsGrpDialogOpen) {
  const { setTempUser, setTempGroupId } = useStore();
  useEffect(() => {
    async function handleClerkDataToFirestore(userId, userObj) {
      //get user from firestore
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      //if user not exist in firestore, add it
      if (docSnap.exists()) {
        const data = docSnap.data();
        // const { inGroup } = data;
        // const firstGroupId = Object.keys(inGroup)[0];
        console.log("文件存在:", data);
        setTempUser(data);
        // setTempGroupId(firstGroupId);
        return data;
      } else {
        await addDocWithId(userId, "users", userObj);
        setTempUser(userObj);
        console.log("新增成功");
      }
    }
    async function getDataAndCheckUrl(userId, userObj) {
      const data = await handleClerkDataToFirestore(userId, userObj);
      console.log(document.location, "我在哪");
      const gId = localStorage.getItem("groupIdCreated");
      // let params = new URLSearchParams(document.location.search.substring(1));
      // let gId = params.get("id");
      if (!gId) return;
      const { inGroup } = data;
      const isAlreadyInGroup = Object.keys(inGroup).find(
        (item) => item === gId
      );
      if (isAlreadyInGroup) return;
      setIsGrpDialogOpen(true);
      return true;
    }
    async function temp(userId, userObj) {
      const tf = await getDataAndCheckUrl(userId, userObj);
    }
    temp(userId, userObj);
  }, [userId]);
}
//監聽groups
function useListenGroups() {
  const { tempGroupId, setGroup} = useStore();
  useEffect(() => {
    if (!tempGroupId) return;
    console.log("開始監聽或改變監聽", tempGroupId);
    // getData(db, "groups", tempGroupId, setGroup);
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
  const { uid } = tempUser;
  useEffect(() => {
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
    setterFunction(data);
  } catch (e) {
    console.log(e);
  }
}
async function justGetData(collection, docId) {
  try {
    const docRef = doc(db, collection, docId);
    const docSnap = await getDoc(docRef);
    const data = docSnap?.data();
    return data;
  } catch (e) {
    console.log(e);
  }
}
function useClerkDataToFirestore(userId, userObj) {
  const { setTempUser, setTempGroupId } = useStore();

  useEffect(() => {
    (async function handleData(userId, userObj) {
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
        return data;
      } else {
        await addDocWithId(userId, "users", userObj);
        console.log("新增成功");
      }
    })(userId, userObj);
  }, [userId]);
}
//input: url,userId
//output:
function useCheckUrlSetDialog(setterFunction) {
  const { tempUser } = useStore();
  const { inGroup } = tempUser;
  useEffect(() => {
    let params = new URLSearchParams(document.location.search.substring(1));
    let gId = params.get("id");
    if (!gId) return;

    const isAlreadyInGroup = Object.keys(inGroup).find((item) => item === gId);
    if (isAlreadyInGroup) return;
    setterFunction(true);
  }, [tempUser.uid]);
}
//是否已加入 ? return : 要加入嗎
//確定-> 更新group, user

async function updateOneField(collection, docId, fieldToSet, data) {
  try {
    const fieldRef = doc(db, collection, docId);
    const docSnap = await getDoc(fieldRef);
    const oldData = docSnap?.data();
    const oldFieldData = oldData[fieldToSet];
    const newFieldData = oldFieldData?.length
      ? [...oldFieldData, data]
      : { ...oldFieldData, data };
    console.log(oldData, oldFieldData, newFieldData);
    await updateDoc(fieldRef, { [fieldToSet]: newFieldData });
  } catch (error) {
    console.log(error);
  }
}
