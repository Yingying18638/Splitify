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

  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] fixed z-[9] top-0 ${isSideBarOpen ? "" : "hidden"}`}
      ></div>
      <div
        id="sidebar"
        ref={sideBarRef}
        className={`bg-[#653A14] w-40 h-full fixed pr-3 top-0 left-0 z-10 ${sideBarClass} ${isSideBarOpen ? "" : "hidden"}`}
      >
        {sideBarClass === mobileSideBar && (
          <X
            color="#fefae0"
            className="absolute right-2 w-5 top-2 hover:bg-[#dda15e] rounded-full"
            onClick={() => {
              setIsSideBarOpen(false);
              setSideBarClass(desktopSideBar);
            }}
          ></X>
        )}
        <nav className="h-screen overflow-y-auto ">
          <div className="pt-20 pl-10 text-[#dda15e]">
            <p className="text-[#fefae0] text-lg font-medium pb-2 border-b-2">群組</p>
            {isInAnyGroup &&
              Object.entries(inGroup).map(([groupId, groupName]) => {
                return (
                  <p
                    className={`mt-2 pl-2 py-2 cursor-pointer rounded  hover:bg-[#fefae0]  ${color[groupId]}`}
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
                  </p>
                );
              })}
        
          </div>
          <DrawerDialogDemo />
        </nav>
      </div>
    </>
  );
};

export default SideBar;
