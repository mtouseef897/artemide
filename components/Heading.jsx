import React from 'react'
import { Bebas_Neue } from "next/font/google";

const font_Bebas_Neue = Bebas_Neue({ subsets: ["latin"],weight:"400"});

const Heading = ({children,className=""}) => {
  return (
    <div className={`text-[46px] uppercase tracking-[1%] leading-[55.2px] text-center ${font_Bebas_Neue.className} ${className}`}>{children}</div>
  )
}

export default Heading