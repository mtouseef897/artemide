"use client";
import { Inter } from "next/font/google";
import "../global.css";
import Image from "next/image";
import { PageProvider } from "@/context/PageContext";
import { EventProvider } from "@/context/EventContext";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [className, setClassName] = useState('');

  useEffect(() => {
    setClassName(`${inter.className} min-h-screen py-[50px] px-4`);
  }, []);

  return (
    <html lang="en">
      <body className={className}>
        <a href="/" className="flex items-center justify-center pb-[30px]">
          <Image
            className=""
            src="/logo.png"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </a>
        <PageProvider>
          <EventProvider>
            {children}
          </EventProvider>
        </PageProvider>
      </body>
    </html>
  );
}
