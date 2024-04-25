import React from "react";
import { Outlet } from "react-router-dom";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import Mainpage from "../pages/mainpage";
import LandingPage from "../pages/landingpage";

const RootLayout = ({ children }) => {
  return (
    <div>
      <header className="bg-yellow-200  xl:h-16 h-12 fixed top-0 w-full">
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton className="fixed z-[52] right-0"></UserButton>
        </SignedIn>
      </header>
      {children === "signedIn" ? <Mainpage /> : <LandingPage />}
    </div>
  );
};

export default RootLayout;
