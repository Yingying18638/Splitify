import { doc,getDoc} from "firebase/firestore";
import { useEffect } from "react";
import { db, addDocWithId } from "../handleFirestore";
import useZustandStore from "./useZustandStore";

function useUserData(userId, userObj, setIsGrpDialogOpen) {
  const { setTempUser } = useZustandStore();
  async function handleClerkDataToFirestore(userId, userObj) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setTempUser(data);
      return data;
    } else {
      await addDocWithId(userId, "users", userObj);
      setTempUser(userObj);
    }
  }
  async function getDataAndCheckUrl(userId, userObj) {
    const data = await handleClerkDataToFirestore(userId, userObj);
    const gId = localStorage.getItem("groupIdCreated");
    if (!gId) return;
    const { inGroup } = data;
    const isAlreadyInGroup = Object.keys(inGroup).find((item) => item === gId);
    if (isAlreadyInGroup) return;
    setIsGrpDialogOpen(true);
  }
  useEffect(() => {
    getDataAndCheckUrl(userId, userObj);
  }, [userId]);
}

export default useUserData;
