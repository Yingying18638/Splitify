import React from "react";
import group from "../../assets/group.png";
import link from "../../assets/link.png";
import { Button } from "../../components/ui/button";

const LittleHeader = () => {
  return (
    <div className="flex flex-wrap w-full justify-center">
      <div className="w-28  rounded-sm px-3 py-1 text-sm font-medium">
        Group1
      </div>
      <figure className="cursor-pointer mx-2">
        <img src={group} alt="group" />
      </figure>
      <figure className="cursor-pointer">
        <img src={link} alt="link" className="w-[32px]" />
      </figure>
      <Button className="block mx-2">+</Button>
      <Button>銷帳</Button>
    </div>
  );
};

export default LittleHeader;
