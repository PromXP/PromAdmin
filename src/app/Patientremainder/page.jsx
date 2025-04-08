"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Poppins } from "next/font/google";

import ProfileImage from "@/app/assets/profile.png";
import { UserIcon } from "@heroicons/react/24/outline";
import {
  ChevronRightIcon,
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import Patientimg from "@/app/assets/patimg.png";
import Closeicon from "@/app/assets/closeicon.png";
import Search from "@/app/assets/search.png";
import Calendar from "@/app/assets/calendar.png";
import Bigcalendar from "@/app/assets/bigcalender.png";
import Clock from "@/app/assets/clock.png";

import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const page = ({ isOpenrem, onCloserem, children }) => {
  const useWindowSize = () => {
    const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
  };

  const { width, height } = useWindowSize();
  console.log("Screen Width:", width, "Screen Height:", height);

  const completedItems = ["Oxford Knee Score", "Short Form - 12"];
  const pendingItems = ["KOOS", "Knee Society Score"];

  const [message, setMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const handleSendremainder = () => {
    if (message.trim() === "") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
    }
  };

  if (!isOpenrem) return null;
  return (
    <div
      className="fixed inset-0 z-40 "
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)", // white with 50% opacity
      }}
    >
      <div
        className={`
          min-h-screen w-fit flex flex-col items-center justify-center mx-auto
          ${width < 950 ? "p-4 gap-4 " : "p-4 "}
        `}
      >
        <div
          className={`w-full bg-white rounded-2xl p-4  overflow-y-auto overflow-x-hidden max-h-[90vh] ${
            width < 1095 ? "flex flex-col gap-4" : ""
          }`}
        >
          <div
            className={`w-full bg-white  ${width < 760 ? "h-fit" : "h-[20%]"} `}
          >
            <div
              className={`w-full rounded-lg flex flex-col gap-5 ${
                width < 760 ? "py-0" : "py-4"
              }`}
            >
              <div className={`relative w-full`}>
                <div className="absolute top-0 right-0">
                  <Image
                    className={`cursor-pointer ${
                      width < 530 ? "w-4 h-4" : "w-4 h-4"
                    }`}
                    src={Closeicon}
                    alt="close"
                    onClick={() => {
                      setMessage("");
                      onCloserem(); // if onCloserem handles popup close
                    }}
                  />
                </div>
                <div
                  className={`w-full flex gap-4 justify-start items-center ${
                    width < 530
                      ? "flex-col justify-center items-center"
                      : "flex-row"
                  }`}
                >
                  <p className="font-bold text-5 text-black">PROGRESS STATUS</p>
                </div>
              </div>

              <div className="w-full flex flex-row">
                <div className="w-1/2 flex flex-col justify-center items-start gap-2">
                  <p className="font-semibold text-4 text-[#60F881]">
                    COMPLETED
                  </p>
                  <div className="flex flex-col gap-1 items-start">
                    {completedItems.map((item, index) => (
                      <p
                        key={index}
                        className="text-base text-black font-medium"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-end gap-2">
                  <p className="font-semibold text-4 text-[#FFB978]">PENDING</p>
                  <div className="flex flex-col gap-1 items-end">
                    {pendingItems.map((item, index) => (
                      <p
                        key={index}
                        className="text-base text-black font-medium text-end"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="font-medium text-black text-base">
                  REMAINDER MESSAGE
                </p>
                <textarea
                  placeholder="Enter your message..."
                  rows={3}
                  className="w-full text-black px-4 py-2  text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: "rgba(71, 84, 103, 0.1)" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="w-full flex flex-row justify-center items-center">
                <div className="w-1/2 flex flex-row justify-start items-center">
                  <p
                    className="font-semibold italic text-[#475467] text-sm cursor-pointer"
                    onClick={() => setMessage("")}
                  >
                    CLEAR MESSAGE
                  </p>
                </div>
                <div className="w-1/2 flex flex-row justify-end items-center">
                  <p
                    className="font-semibold rounded-full px-3 py-[1px] cursor-pointer text-center text-white text-sm border-[#005585] border-2"
                    style={{ backgroundColor: "rgba(0, 85, 133, 0.9)" }}
                    onClick={handleSendremainder}
                  >
                    SEND
                  </p>
                </div>
              </div>

              {showAlert && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
                    Please Enter a message
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
