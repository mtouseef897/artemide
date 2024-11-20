import React, { useState } from "react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import { Anton } from "next/font/google";
import useEventDataStore from "@/stores/event-data";
import { sendMail } from "@/lib/send-mail";
import { databases } from "@/lib/app-write-client";
import { useEvent } from "@/context/EventContext";
import Showcase from "../components/Models/Showcase";

const font_Anton = Anton({ subsets: ["latin"], weight: "400" });

const Page8 = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    peopleCount,
    selectedRoom,
    selectedEquipment,
    overnightStay,
    banquetingOptionSelected,
    selectedBarOption,
    personalInfo,
    contactMethod,
  } = useEventDataStore();

  const filteredSelectedEquipment = selectedEquipment?.filter(
    (item) => item !== "3D_MODEL_NAME_1" && item !== "3D_MODEL_NAME_2"
  );

  const handleEnterFullScreen = () => {
    setIsFullScreen(true);
  };

  const handleExitFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleDoubleClick = () => {
    setIsExpanded(!isExpanded);
  };

  async function onSubmit() {
    const roomName = selectedRoom?.name || "Room not selected";
    const roomSpace = selectedRoom?.spec || "Room space not available";
    const fullName = personalInfo?.fullName || "Client name not provided";
    const email = personalInfo?.email || "Email not provided";
    const telephone = personalInfo?.telephone || "Telephone not provided";
    const startDate = personalInfo?.startDate || "Start date not provided";
    const endDate = personalInfo?.endDate || "End date not provided";
    const startTime = personalInfo?.startTime || "Start time not provided";
    const endTime = personalInfo?.endTime || "End time not provided";

    // Ensure min and max are converted to strings
    const minPeople = peopleCount?.min ? String(peopleCount.min) : "N/A";
    const maxPeople = peopleCount?.max ? String(peopleCount.max) : "N/A";

    // Get the applicant's name
    const applicantName = personalInfo?.applicant || "Applicant not provided";

    const mailText = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h1 style="color: #E69244; font-size: 28px;">Woohoo! 🎉</h1>
      <h2 style="font-size: 24px;">We’ve got some exciting news!</h2>
      <p style="font-size: 18px;">A new client just booked with us! Here are all the juicy details for you to check out. 😉</p>
  
      <div style="margin-bottom: 20px;">
        <strong style="color: #E69244; font-size: 20px;">Event Information:</strong>
        <ul style="list-style: none; padding: 0;">
          <li>📅 <strong>Event Dates:</strong> ${startDate} to ${endDate}</li>
          <li>⏰ <strong>Time:</strong> ${startTime} to ${endTime}</li>
          <li>📍 <strong>Room:</strong> ${roomName} (${roomSpace} sqm)</li>
          <li>🛠 <strong>Equipment:</strong></li>
          <ul style="list-style-type: none; padding-left: 15px;">
            ${
              filteredSelectedEquipment.length > 0
                ? filteredSelectedEquipment
                    .map(
                      (item) =>
                        `<li style="padding: 5px 0;">✔️ ${item}</li>`
                    )
                    .join("")
                : '<li>No extra equipment selected</li>'
            }
          </ul>
          <li>🛏 <strong>Overnight Stay:</strong> ${overnightStay ? "✔️ Yes" : "❌ No"}</li>
          <li>🍽 <strong>Banqueting:</strong> ${banquetingOptionSelected ? "✔️ " + banquetingOptionSelected : "❌ Not Selected"}</li>
          <li>🍸 <strong>Bar Option:</strong> ${selectedBarOption ? "✔️ " + selectedBarOption : "❌ No bar option"}</li>
          <li>👥 <strong>People Count:</strong> ${minPeople} - ${maxPeople}</li>
        </ul>
      </div>
  
      <div style="margin-bottom: 20px;">
        <strong style="color: #E69244; font-size: 20px;">Client Information:</strong>
        <ul style="list-style: none; padding: 0;">
          <li>👤 <strong style="font-size: 18px;">First Name:</strong> <span style="font-size: 18px; font-weight: bold;">${applicantName}</span></li>
          <li>👤 <strong style="font-size: 18px;">Full Name:</strong> <span style="font-size: 18px; font-weight: bold;">${fullName}</span></li>
          <li>📧 <strong>Email:</strong> ${email}</li>
          <li>📞 <strong>Telephone:</strong> <a href="tel:${telephone}" style="color: #E69244; text-decoration: none;">${telephone}</a></li>
        </ul>
      </div>
  
      <p style="font-size: 18px;">Let’s get ready to make this event truly special! 🚀</p>
      <p style="font-size: 14px; color: #888;">Sent by [Your Company]</p>
    </div>
    `;
  
    await sendMail({
      subject: "🎉 New Event Booking Alert!",
      html: mailText, 
    });

    await databases.createDocument(
      "event-jet-cosmos",
      "66f2c1280026775eb2b4",
      "unique()",
      {
        applicant: personalInfo?.applicant || null, // Only applicant field
        fullName: fullName || null,
        startDate: startDate || null,
        endDate: endDate || null,
        min: minPeople, // Send as string
        max: maxPeople, // Send as string
        roomName: roomName || null,
        roomSpace: roomSpace || null,
        equipments: filteredSelectedEquipment || [],
        banquetingOptionSelected: banquetingOptionSelected || null,
        selectedBarOption,
        telephone: telephone || null,
        startTime: startTime || null,
        endTime: endTime || null,
        contactMethod,
      }
    );
  }

  const { state } = useEvent();

  return (
    <div
      className={`min-h-[calc(100vh-200px)] w-full text-white flex flex-col items-center ${
        isFullScreen ? "fixed inset-0 z-50 bg-white" : ""
      }`}
    >
      {!isFullScreen && (
        <>
          <Heading className="mt-32">VISUALIZZA LA TUA SALA</Heading>
          <Text>
            Ora puoi visualizzare la stanza che hai creato. Clicca sull'icona e
            inserisci il tuo evento.
          </Text>

          {/* Scene Container with Double-Click for Expansion */}
          <div
            className={`bg-white rounded-[50px] border transition-all duration-500 m-[10px] overflow-hidden ${
              isSelected ? "border-orange-500 border-2" : "border-transparent"
            } flex justify-center items-center ${
              isExpanded ? "w-[900px] h-[700px]" : "w-[300px] h-[300px]"
            }`}
            onDoubleClick={handleDoubleClick}
            onClick={() => setIsSelected(!isSelected)}
          >
            <Showcase />
          </div>
        </>
      )}
      <>
        
        <div onClick={onSubmit}>
          <Button icon={true} next={true} className="!md:mt-auto">
            INVIA LA TUA RICHIESTA
          </Button>
        </div>
      </>
    </div>
  );
};

export default Page8;
