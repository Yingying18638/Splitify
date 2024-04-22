import React from "react";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="bg-yellow-200  xl:h-16 h-12 fixed top-0 w-full"></header>
      <Outlet></Outlet>
    </div>
  );
};

export default Header;
