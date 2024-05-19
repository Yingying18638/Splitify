import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../handleFirestore";
import useZustandStore from "./useZustandStore";
function useListenGroups() {
  const { tempGroupId, setGroup } = useZustandStore();
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
export default useListenGroups;
