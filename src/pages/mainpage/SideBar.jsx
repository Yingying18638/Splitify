import React, { useEffect, useRef, useState } from "react";
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
  useListenGroups();
  const sideBarRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sideBarRef.current.contains(e.target)) {
        return;
      }
      setIsSideBarOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { tempUser, setGroup, tempGroupId, setTempGroupId } = useStore();
  const { inGroup } = tempUser;
  const groupIds = Object.keys(inGroup).length ? Object.keys(inGroup) : [];
  const bgObject = groupIds.length
    ? groupIds.reduce((acc, groupId) => {
        acc[groupId] = "";
        return acc;
      }, {})
    : {};

  const [color, setColor] = useState(bgObject);
  const mobileSideBar = "md:hidden";
  const desktopSideBar = "hidden md:block";
  const isInAnyGroup = groupIds.length > 0;
  useEffect(() => {
    if (window.innerWidth > 768 && sideBarClass === mobileSideBar) {
      setSideBarClass(desktopSideBar);
      setIsSideBarOpen(false);
    }
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
        className={`bg-black opacity-70 w-full h-[100vh] fixed z-[9] top-0 ${isSideBarOpen ? "" : "hidden"}`}
      ></div>
      <div
        ref={sideBarRef}
        className={`bg-[#653A14] w-40 h-full fixed  top-0 left-0 z-10 ${sideBarClass} ${isSideBarOpen ? "" : "hidden"}`}
      >
        {sideBarClass === mobileSideBar && (
          <X
            color="#fefae0"
            className="absolute right-2 w-5 top-2 hover:bg-[#fbf7d8] rounded-full"
            onClick={() => {
              setIsSideBarOpen(false);
              setSideBarClass(desktopSideBar);
            }}
          ></X>
        )}
        <nav>
          <div className="pt-20 pl-10 text-[#dda15e]">
            <p className="text-[#fefae0]">群組</p>
            {isInAnyGroup &&
              Object.entries(inGroup).map(([groupId, groupName]) => {
                return (
                  <div
                    className={`mt-2 p-2 rounded mr-5 hover:bg-[#fefae0]  ${color[groupId]}`}
                    key={groupId}
                    id={groupId}
                    onClick={(e) => {
                      const { id } = e.target;
                      console.log(id);
                      setColor({ ...bgObject, [id]: "bg-[#fbf7d8]" });
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
          </div>
          <DrawerDialogDemo />
        </nav>
      </div>
    </>
  );
};

export default SideBar;
