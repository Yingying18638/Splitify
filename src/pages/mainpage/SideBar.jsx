import React, { useEffect, useState } from "react";
import useStore from "../../utility/hooks/useStore";
import { Button } from "../../components/ui/button";
import { DrawerDialogDemo } from "./DrawerDialogDemo";
import { X } from "lucide-react";
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
import { useListenGroups, getData, db } from "../../utility/handleFirestore";
const SideBar = ({
  isSideBarOpen,
  setIsSideBarOpen,
  sideBarClass,
  setSideBarClass,
}) => {
  // useListenGroups();

  const { tempUser, setGroup, tempGroupId, setTempGroupId } = useStore();
  const { inGroup } = tempUser;
  const groupIds = Object.keys(inGroup);
  const bgObject = groupIds.reduce((acc, groupId) => {
    acc[groupId] = "";
    return acc;
  }, {});
  const [color, setColor] = useState(bgObject);
  const mobileSideBar = "md:hidden";
  const desktopSideBar = "hidden md:block";
  if (window.innerWidth > 768 && sideBarClass === mobileSideBar) {
    setSideBarClass(desktopSideBar);
    setIsSideBarOpen(false);
  }
  const isInAnyGroup = groupIds.length > 0;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && sideBarClass === mobileSideBar) {
        setSideBarClass(desktopSideBar);
        setIsSideBarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [sideBarClass]);
  // useEffect(() => {
  //   if (!tempGroupId) return;

  //   console.log("開始監聽或改變監聽", tempGroupId);
  //   //先取得正確的group data
  //   // getData(db, "groups", tempGroupId, setGroup);
  //   //監聽group資料 + 設state
  //   const docRef = doc(db, "groups", tempGroupId);
  //   const unsubscribe = onSnapshot(docRef, (doc) => {
  //     const data = doc.data();
  //     setGroup(data);
  //     console.log("監聽到的data: ", data);
  //   });
  //   return () => unsubscribe();
  // }, [tempGroupId]);

  //input: tempGroupId
  //output: (group state set)
  // async function getData(db, tempGroupId) {
  //   try {
  //     const docRef = doc(db, "groups", tempGroupId);
  //     const docSnap = await getDoc(docRef);
  //     const data = docSnap?.data();
  //     console.log(data, "我拿到data");
  //     setGroup(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] fixed top-0 ${isSideBarOpen ? "" : "hidden"}`}
      ></div>
      <div
        className={`bg-[#606c38] w-40 h-full fixed  top-0 left-0 z-11 ${sideBarClass} ${isSideBarOpen ? "" : "hidden"}`}
      >
        {sideBarClass === mobileSideBar && (
          <X
            className="absolute right-2 w-5 top-2 hover:bg-slate-400"
            onClick={() => {
              setIsSideBarOpen(false);
              setSideBarClass(desktopSideBar);
            }}
          ></X>
        )}
        <nav className="pt-20 pl-10">
          <div>
            已加入的群組
            {isInAnyGroup &&
              Object.entries(inGroup).map(([groupId, groupName]) => {
                return (
                  <div
                    className={`pt-5 pl-2 hover:bg-slate-200 ${color[groupId]}`}
                    key={groupId}
                    id={groupId}
                    onClick={(e) => {
                      const { id } = e.target;
                      console.log(id);
                      setColor({ ...bgObject, [id]: "bg-slate-400" });
                      setTempGroupId(id);
                    }}
                  >
                    {groupName}
                  </div>
                );
              })}
            {/* <Button variant="secondary" className="mt-5 ml-2">
        + 群組
      </Button> */}
            <DrawerDialogDemo />
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
