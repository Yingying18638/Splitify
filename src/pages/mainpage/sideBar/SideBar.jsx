import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useListenGroups from "@/utility/hooks/useListenGroups";
import useZustandStore from "@/utility/hooks/useZustandStore";
import { DrawerDialog } from "../../../common_components/DrawerDialog";
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
  const { tempUser, setGroup, tempGroupId, setTempGroupId } = useZustandStore();
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
  const sortedInGroup = Object.entries(inGroup).sort(function (a, b) {
    return a[1].localeCompare(b[1]);
  });
  return (
    <>
      <div
        className={`bg-black opacity-70 w-full h-[100vh] fixed z-[9] top-0 ${isSideBarOpen ? "" : "hidden"}`}
      ></div>
      <div
        id="sidebar"
        ref={sideBarRef}
        className={`bg-[#653A14] w-40 h-full fixed  top-0 left-0 z-10 xl:w-56 xl:text-lg ${sideBarClass} ${isSideBarOpen ? "" : "hidden"}`}
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
        <nav className="h-screen overflow-y-auto break-words ">
          <div className="pt-20 pr-6 pl-10 text-[#B39D7E]">
            <p className="text-[#fefae0] text-lg xl:text-xl font-medium pb-2 border-b-2 xl:pb-6 xl:mb-6">
              群組
            </p>
            {isInAnyGroup &&
              sortedInGroup.map(([groupId, groupName]) => {
                return (
                  <p
                    className={`mt-2  pl-2 py-2 cursor-pointer rounded  hover:bg-[#DDCEB6] hover:text-[#7C5733]
                    ${color[groupId]}`}
                    key={groupId}
                    id={groupId}
                    onClick={(e) => {
                      const { id } = e.target;
                      setColor({
                        ...bgObject,
                        [id]: "text-[#fbf7d8]  border-[#CABB9D] bg-[#876542] ",
                      });
                      setTempGroupId(id);
                    }}
                  >
                    {groupName}
                  </p>
                );
              })}
          </div>
          <DrawerDialog />
        </nav>
      </div>
    </>
  );
};

export default SideBar;
