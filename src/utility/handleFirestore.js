import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import firebaseConfig from "./firebase";
import useStore from "./hooks/useStore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
  addDocWithId,
  db,
  getData,
  justGetData,
  updateGroupData,
  updateOneField,
  useCheckUrlSetDialog,
  useClerkDataToFirestore,
  useListenGroups,
  useListenUsers,
  useUserData,
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
        setTempUser(data);
        // setTempGroupId(firstGroupId);
        return data;
      } else {
        await addDocWithId(userId, "users", userObj);
        setTempUser(userObj);
      }
    }
    async function getDataAndCheckUrl(userId, userObj) {
      const data = await handleClerkDataToFirestore(userId, userObj);
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
function useListenGroups() {
  const { tempGroupId, setGroup } = useStore();
  useEffect(() => {
    if (!tempGroupId) return;
    const docRef = doc(db, "groups", tempGroupId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setGroup(data);
    });
    return () => unsubscribe();
  }, [tempGroupId]);
}
function useListenUsers() {
  const { tempUser, setTempUser } = useStore();
  const { uid } = tempUser;
  useEffect(() => {
    if (!uid) return;
    const docRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setTempUser(data);
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
        setTempUser(data);
        return data;
      } else {
        await addDocWithId(userId, "users", userObj);
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

async function updateOneField(collection, docId, fieldToSet, data) {
  try {
    const fieldRef = doc(db, collection, docId);
    const docSnap = await getDoc(fieldRef);
    const oldData = docSnap?.data();
    const oldFieldData = oldData[fieldToSet];
    const newFieldData = oldFieldData?.length
      ? [...oldFieldData, data]
      : { ...oldFieldData, data };
    await updateDoc(fieldRef, { [fieldToSet]: newFieldData });
  } catch (error) {
    console.log(error);
  }
}
