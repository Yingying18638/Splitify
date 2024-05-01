import React, { useState } from "react";
import logo from "../assets/logo-no-background.svg";
import { Menu } from "lucide-react";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import Mainpage from "../pages/mainpage";
import LandingPage from "../pages/landingpage";
import { useSearchParams } from "react-router-dom";
const RootLayout = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isSignedIn = useUser()?.isSignedIn;
  const groupIdCreated = searchParams.get("id");
  const isGoingToAGroup = Boolean(groupIdCreated);
  console.log(isGoingToAGroup, "isGoingToAGroup");
  if (isGoingToAGroup) {
    localStorage.setItem("groupIdCreated", groupIdCreated);
  }
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const mobileSideBar = "md:hidden";
  const desktopSideBar = "hidden md:block";
  const [sideBarClass, setSideBarClass] = useState(mobileSideBar);
  return (
    <>
      <header className="bg-[#dda15e] h-[5rem] fixed top-0 w-full flex items-center gap-10 justify-center">
        <div className="fixed left-5 ">
          <SignedIn>
            <Menu
              size={28}
              className="hover:bg-[#fefae0] rounded-full p-1 hover:shadow-md"
              onClick={() => {
                setIsSideBarOpen(true);
                setSideBarClass(mobileSideBar);
              }}
            ></Menu>
          </SignedIn>
        </div>
        <img
          src={logo}
          alt="logo"
          className={`${isSignedIn ? "md:ml-[160px]" : ""} w-32`}
        />
        <div className="fixed right-5 ">
          <SignedOut>
            <SignInButton mode="modal">
              <button>登入或註冊</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton className="right-0"></UserButton>
          </SignedIn>
        </div>
      </header>
      <div className="bg-[#fefae0] h-[100vh]">
        <SignedIn>
          <Mainpage
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            sideBarClass={sideBarClass}
            setSideBarClass={setSideBarClass}
          />
        </SignedIn>
        <SignedOut>{isGoingToAGroup ? <SignIn /> : <LandingPage />}</SignedOut>
      </div>
    </>
  );
};

export default RootLayout;
