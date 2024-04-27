import React, { useState } from "react";
import logo from "../assets/logo-no-background.svg";
import { Menu } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import Mainpage from "../pages/mainpage";
import LandingPage from "../pages/landingpage";

const RootLayout = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <header className="bg-[#dda15e] h-16 fixed top-0 w-full flex items-center gap-10 justify-center">
        <div className="fixed left-5 ">
          <SignedIn>
            <Menu onClick={() => setIsSideBarOpen(true)}></Menu>
          </SignedIn>
        </div>
        <img src={logo} alt="logo" className="w-32  " />
        <div className="fixed right-5 ">
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton className="right-0"></UserButton>
          </SignedIn>
        </div>
      </header>
      <div className="bg-[#fefae0] h-[100vh]">
        {children === "signedIn" ? (
          <Mainpage
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
        ) : (
          <LandingPage />
        )}
      </div>
    </>
  );
};

export default RootLayout;
