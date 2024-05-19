import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../handleFirestore";
import useZustandStore from "./useZustandStore";
//when someone is removed from a group
function useListenUsers() {
    const { tempUser, setTempUser } = useZustandStore();
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
  export default useListenUsers