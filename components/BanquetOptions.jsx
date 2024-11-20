import React from "react";
import { Anton } from "next/font/google";
import { useEvent } from "@/context/EventContext";
import useEventDataStore from "@/stores/event-data";

const font_Anton = Anton({ subsets: ["latin"], weight: "400" });

const BanquetOptions = () => {
  const { banquetingOptionSelected, setBanquetingOption } = useEventDataStore();
  const selectoptions = [
    "colazione di lavoro a buffet con tavoli d'appogio",
    "colazione di lavoro a buffet con sedute",
    "colazione di lavoro servita",
    "cena a buffet in piedi",
    "cena a buffet servita",
    "cena di gala",
  ];

  const {
    state,
    updateParticipantCount,
    updateRoomSetup,
    updateEquipment,
    updateNightStay,
    updateBanquetOption,
    updateBarOption,
  } = useEvent();

  // Handle selecting and deselecting banquet options for multi-selection
  const handleSelect = (item) => {
    let newSelections;

    // If the item is already selected, remove it from the array
    if (state.banquetoption.includes(item)) {
      newSelections = state.banquetoption.filter((option) => option !== item);
    } else {
      // Otherwise, add the selected item to the array
      newSelections = [...state.banquetoption, item];
    }

    updateBanquetOption(newSelections); // Update the event context
    setBanquetingOption(newSelections); // Update event data store
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${font_Anton.className} text-[26px] leading-8 my-8 `}
    >
      {selectoptions.map((item, index) => {
        return (
          <div
            key={"banquetoption" + index}
            onClick={() => handleSelect(item)}
            className={` p-[10px] bg-[#222323] mt-[48px] rounded-2xl ${
              state.banquetoption.includes(item) &&
              "bg-bgorange duration-200 ease-in-out"
            }`}
          >
            <button
              className={`${
                font_Anton.className
              } text-[22px] uppercase leading-[33.12px]  py-[8px] px-[12px]  md:py-[15px] md:px-[32px] bg-[#343434] rounded-2xl -mt-4 flex items-center justify-center max-w-[328px] w-full h-[95px] ${
                state.banquetoption.includes(item) &&
                "bg-fgorange duration-200 ease-in-out"
              }`}
            >
              {item}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default BanquetOptions;
