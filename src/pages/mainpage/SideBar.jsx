import React, { useEffect, useState } from "react";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import useStore from "../../utility/hooks/useStore";
import { Button } from "../../components/ui/button";
import { db } from "../../utility/handleFirestore";
const SideBar = () => {
  const [color, setColor] = useState("");
  const { tempUser, setGroup, tempGroupId, setTempGroupId } = useStore();
  const { inGroup } = tempUser;
  const groupIds = Object.keys(inGroup);
  const isInAnyGroup = groupIds.length > 0;
  useEffect(() => {
    if (!tempGroupId) return;
    console.log("開始監聽或改變監聽", tempGroupId);
    //先取得正確的group data
    getData(db, tempGroupId);
    //監聽group資料 + 設state
    const docRef = doc(db, "groups", tempGroupId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      setGroup(data);
      console.log("監聽到的data: ", data);
    });
    return () => unsubscribe();
  }, [tempGroupId]);

  //input: tempGroupId
  //output: (group state set)
  async function getData(db, tempGroupId) {
    try {
      const docRef = doc(db, "groups", tempGroupId);
      const docSnap = await getDoc(docRef);
      const data = docSnap?.data();
      console.log(data, "我拿到data");
      setGroup(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="bg-green-100 w-40 h-full fixed  top-0 left-0 hidden md:block ">
      <nav className="pt-20 pl-10">
        <div>
          已加入的群組
          {isInAnyGroup &&
            Object.entries(inGroup).map(([groupId, groupName]) => {
              return (
                <div
                  className={`pt-5 pl-2 ${color}`}
                  key={groupId}
                  id={groupId}
                  onClick={(e) => {
                    console.log(e.target.id);
                    // setColor("text-red-500");
                    setTempGroupId(e.target.id);
                  }}
                >
                  {groupName}
                </div>
              );
            })}
          <Button className="mt-5 ml-2">+ 群組</Button>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
