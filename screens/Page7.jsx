// Page7.js
import React from "react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import RegForm from "@/components/RegForm";
import { usePage } from "@/context/PageContext";

const Page7 = () => {
  const { updatePageNumber } = usePage();

  const handleNext = () => {
    updatePageNumber(8); // Move to page 8
  };

  return (
    <div className="min-h-[calc(100vh-200px)] w-full text-white flex flex-col items-center">
      <Heading>COMPLETA LA TUA RICHIESTA</Heading>
      <Text>Inserite i vostri dati.</Text>
      <RegForm onNext={handleNext} />
    </div>
  );
};

export default Page7;
