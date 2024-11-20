import React from "react";
import { Anton } from "next/font/google";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import useEventDataStore from "@/stores/event-data";
import { useEvent } from "@/context/EventContext";

const font_Anton = Anton({ subsets: ["latin"], weight: "400" });

const SelectionButton = ({ children, next = false, value }) => {
  const { overnightStay, setOvernightStay } = useEventDataStore();
  console.log("OVERNIGHT STAY", overnightStay);
  const {
    state,
    updateParticipantCount,
    updateRoomSetup,
    updateEquipment,
    updateNightStay,
    updateBanquetOption,
    updateBarOption,
  } = useEvent();

  return (
    <div
      onClick={() => {
        updateNightStay(value);
        setOvernightStay(value);
      }}
      className={` p-[10px] ${next ? "bg-[#DA7B22]" : "bg-[#222323]"} ${
        state.nightstay === value && "bg-bgorange"
      } mt-[48px] rounded-2xl max-w-[328px]`}
    >
      <button
        className={`${
          font_Anton.className
        } text-[22px] uppercase leading-[33.12px]  py-[15px] px-[32px] ${
          next ? "bg-[#E69244]" : "bg-[#343434]"
        } ${
          state.nightstay === value && "bg-fgorange"
        } rounded-2xl -mt-4 flex items-center gap-4`}
      >
        {children}
      </button>
    </div>
  );
};

export default SelectionButton;
