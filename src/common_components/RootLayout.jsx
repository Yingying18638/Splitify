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
        <div className="fixed right-5 top-2">
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton className="right-0"></UserButton>
          </SignedIn>
        </div>
      </header>
      {children === "signedIn" ? <Mainpage /> : <LandingPage />}
    </div>
  );
};

export default RootLayout;
