import React from "react";
import { Anton } from "next/font/google";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { usePage } from "@/context/PageContext";
const font_Anton = Anton({ subsets: ["latin"], weight: "400" });

const Button = ({ children, icon = false, next = true, className = "" }) => {
  const { pageNumber, updatePageNumber } = usePage();
  return (
    <div
      className={`p-[10px] ${
        next ? "bg-[#DA7B22]" : "bg-[#222323]"
      }  rounded-2xl  ${className} z-50 active:scale-95 duration-200 ease-in-out mt-16 md:mt-auto mb-[50px]`}
    >
      <button
        className={`${
          font_Anton.className
        } text-[15px] md:text-[22px] uppercase leading-[33.12px] tracking-wide py-[8px] px-[12px]  md:py-[15px] md:px-[32px] ${
          next ? "bg-[#E69244]" : "bg-[#343434]"
        } rounded-2xl -mt-4 flex items-center gap-4 `}
        onClick={() => {
          updatePageNumber(next);
        }}
      >
        {icon && !next && <FaArrowLeft />}
        {children} {icon && next && <FaArrowRight />}
      </button>
    </div>
  );
};

export default Button;
