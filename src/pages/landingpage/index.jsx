import React from "react";
import logo from "../../assets/logo-no-background.svg";
import { CircleDollarSign, Users, PartyPopper } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import Lottie from "react-lottie";
import animationData from "../../assets/split.json";
const LandingPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const datas = [
    { title: "介面直覺簡潔，分帳不再是難事" },
    { title: "多群組無縫切換，涵蓋生活所需" },
    { title: "一站式團體理財，高效解決群組難題" },
  ];
  return (
    <>
      <div className="pt-40 m-auto w-[80%]  md:pt-40 sm:pl-0">
        {/* <section className="pt-60 pl-60 grid grid-cols-2 items-center"> */}
        <section className=" md:grid md:grid-cols-2 md:items-center">
          <div className="m-auto w-96 text-5xl ">
            <div className="flex font-semibold">
              <p className="tracking-widest text-[#bc6c25] ">Split</p>
              <p className="tracking-widest">ify </p>
            </div>
            <p className="tracking-wider text-3xl pl-2 mt-3">
              Simplify your bill split
            </p>
            <p className="tracking-wide text-3xl pl-2 mt-3">
              一個簡單的多人分帳網站
            </p>
            <SignInButton mode="modal">
              <Button
                // variant="secondary"
                className="w-[70%] md:w-40 tracking-widest"
              >
                立即登入
              </Button>
            </SignInButton>
          </div>
          <div className="p-10 mt-1 h-72  text-5xl mx-auto">
            <Lottie options={defaultOptions} height={200} width={200}></Lottie>
          </div>
        </section>
        <article className="w-[90%] pb-10 sm:w-[70%] md:w-full mx-auto mt-10 md:grid md:grid-cols-3 md:items-center gap-6">
          {/* {datas.map((item) => {
            return ( */}
          <div className="bg-[#faedcd] p-2 rounded shadow-lg  w-full md:w-auto h-20 mt-4">
            <CircleDollarSign></CircleDollarSign>
            介面直覺簡潔，分帳不再是難事
          </div>
          <div className="bg-[#faedcd] p-2 rounded shadow-lg  w-full md:w-auto h-20 mt-4">
            <Users></Users>
            多群組無縫切換，涵蓋生活所需
          </div>
          <div className="bg-[#faedcd] p-2 rounded shadow-lg  w-full md:w-auto h-20 mt-4">
            <PartyPopper></PartyPopper>
            一站式理財，高效解決群組難題
          </div>
          {/* );
          })} */}
        </article>
      </div>
    </>
  );
};

export default LandingPage;
