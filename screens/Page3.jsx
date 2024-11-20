import React from "react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import ExtraEquipment from "@/components/ExtraEquipment";

const Page3 = () => {
  return (
    <div className=" min-h-[calc(100vh-200px)] w-full text-white flex flex-col items-center ">
      <Heading>
      SCEGLI L'ATTREZZATURA E I SERVIZI EXTRA
      </Heading>
      <Text>
      Tutte le attrezzature extra sono intese come escluse dai nostri servizi
      </Text>
      <ExtraEquipment/>
      <div className="flex items-center justify-center gap-8">
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

export default Page3;
