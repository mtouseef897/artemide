import React from 'react'
import { Plus_Jakarta_Sans } from "next/font/google";

const font_Plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ["latin"],weight:"400"});

const Text = ({children,className=""}) => {
  return (
    <div className={`${font_Plus_Jakarta_Sans.className} text-[14px] leading-[24px] opacity-60 max-w-[572px] text-center  ${className}`}>{children}</div>
  )
}

export default Text