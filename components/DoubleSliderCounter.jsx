import React, { useState } from "react";
import RangeSlider from "./RangeSlider";
import Digits from "./Digits";
import useEventDataStore from "@/stores/event-data";

const DoubleSliderCounter = () => {
  const { peopleCount, setPeopleCount } = useEventDataStore();
  return (
    <>
      <div className="mt-[86px]">
        <Digits digitvalue={peopleCount} />
        <RangeSlider
          value={{ min: 1, max: 1000 }}
          from={100}
          to={400}
          setPeopleCount={setPeopleCount}
          onChange={(e) => {
            setPeopleCount({ min: e.min, max: e.max });
          }}
          tooltipPosition="under"
          tooltipVisibility="always"
        />
      </div>
    </>
  );
};

export default DoubleSliderCounter;
