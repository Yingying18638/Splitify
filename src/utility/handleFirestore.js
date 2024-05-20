import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc
} from "firebase/firestore";
import firebaseConfig from "./firebase";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
  addDocWithId,
  db,
  justGetData,
  updateGroupData,
  updateOneField
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
