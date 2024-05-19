import { SignInButton } from "@clerk/clerk-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { CircleDollarSign, PartyPopper, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import animationData from "@/assets/people.json";
const LandingPage = () => {
  gsap.registerPlugin(useGSAP, TextPlugin);
  const mobile = { width: 300, height: 240 };
  const desktop = { width: 400, height: 320 };
  const [area, setArea] = useState(desktop);
  const container = useRef();
  useGSAP(
    () => {
      const timeLine = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      timeLine.from("#split", { duration: 1, text: "" });
      timeLine.from("#tify", { duration: 2, text: "" });
      timeLine.from("#slogan", { duration: 2, text: "" });
      timeLine.from("#cnSlogan", { duration: 2, text: "" });
    },
    { scope: container }
  );
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    if (window.innerWidth < 975) {
      setArea(mobile);
    }
    const handleResize = () => {
      if (window.innerWidth < 975) {
        setArea(mobile);
      } else {
        setArea(desktop);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div
        className="w-full min-h-screen px-10 sm:px-12  xl:px-60 bg-[#714924] flex flex-col justify-center"
        ref={container}
      >
        <section className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none items-center w-full pt-[80px] md:pt-0">
          <div className="w-full sm:w-96  flex flex-col justify-between flex-wrap mx-auto md:mx-0">
            <div className="flex font-semibold h-12 mt-9 mb-4 text-6xl">
              <p id="split" className="tracking-widest text-[#FEFAE0] ">
                Split
              </p>
              <p id="tify" className="tracking-widest text-[#dda15e]">
                ify
              </p>
            </div>
            <p
              id="slogan"
              className="tracking-wider  text-2xl md:text-3xl pl-2 text-[#CABB9D] font-semibold mt-3 h-9"
            >
              Simplify your bill split.
            </p>
            <p
              id="cnSlogan"
              className="tracking-widest text-2xl md:text-3xl pl-2 mt-3 h-9 text-[#CABB9D] font-semibold"
            >
              一個簡單的多人分帳網站
            </p>
            <SignInButton mode="modal">
               <button className="w-full h-10 px-4 py-2 rounded-md  shadow-md mt-8 tracking-widest text-[#714924]  hover:bg-[#FEFAE0] bg-[#EADDC3]  font-bold">
                立即登入
              </button>
            </SignInButton>
          </div>
          <div className="self-center mx-auto md:pl-12">
            <Lottie
              options={defaultOptions}
              width={area.width}
              height={area.height}
            ></Lottie>
          </div>
        </section>

        <article className="w-full pb-10 sm:w-[70%] md:w-full mx-auto mt-16 md:grid md:grid-cols-3 md:items-center gap-6">
          <div className="flex gap-2 items-center justify-center bg-[#876542] text-[#FEFAE0] p-2 rounded-md shadow-lg  w-full md:w-auto h-24 mt-4">
            <CircleDollarSign></CircleDollarSign>
            <p className="tracking-wide">介面直覺簡潔，分帳不再是難事</p>
          </div>
          <div className="flex gap-2 items-center justify-center bg-[#876542] text-[#FEFAE0] p-2 rounded-md shadow-lg  w-full md:w-auto h-24 mt-4">
            <Users></Users>
            <p className="tracking-wide">多群組無縫切換，涵蓋生活所需</p>
          </div>
          <div className="flex gap-2 items-center justify-center bg-[#876542] text-[#FEFAE0] p-2 rounded-md shadow-lg  w-full md:w-auto h-24 mt-4">
            <PartyPopper></PartyPopper>
            <p className="tracking-wide">一站式理財，高效解決群組難題</p>
          </div>
        </article>
      </div>
    </>
  );
};

export default LandingPage;
