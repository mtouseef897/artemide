import React from 'react'
import SlotCounter from 'react-slot-counter';
import { Anton } from "next/font/google";


const font_Anton = Anton({ subsets: ["latin"], weight: "400" });

const Digits = ({digitvalue}) => {
  return (
    <div
    className={`mx-auto max-w-[293px] flex items-center justify-center gap-2 border py-[50px] px-[70px] border-white border-opacity-10 rounded-xl bg-white/5 backdrop-blur-2xl text-[48px] font-extrabold ${font_Anton.className} `}
  >

    <SlotCounter value={digitvalue.min} />
    <div>-</div>
    <SlotCounter value={digitvalue.max} />

  </div>
  )
}

export default Digits