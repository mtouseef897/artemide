import React from "react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import SelectionButton from "@/components/SelectionButton";

const Page4 = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] w-full text-white flex flex-col items-center ">
      <Heading className="mt-32">Hotel</Heading>
      <Text>Il vostro evento prevede pernottamenti?</Text>
      <div className="flex items-center justify-center gap-8">
        <SelectionButton value={"yes"}>si</SelectionButton>
        <SelectionButton value={"no"}>no</SelectionButton>
      </div>

      <div className="flex items-center justify-center gap-8 mt-auto">
        <Button icon={true} next={false}>
          indietro
        </Button>
        <Button icon={true} next={true}>
          Continua
        </Button>
      </div>
    </div>
  );
};

export default Page4;
