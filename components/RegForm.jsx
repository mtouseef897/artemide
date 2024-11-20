import React, { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { IoIosArrowDown } from "react-icons/io";
import AnimatedContainer from "./AnimatedContainer";
import animation from "@/animation";
import useEventDataStore from "@/stores/event-data";
import useFormValidation from "./useFormValidation"; // Import the validation hook
import Heading from "./Heading";
import PhoneInput from 'react-phone-input-2'; // To add phone input with country code
import 'react-phone-input-2/lib/style.css'; // Import Phone Input styles
import Button from "./Button";
import styles from './PhoneInputCustom.module.css'; // Import custom styles for PhoneInput

const font_Plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "400",
});

const RegForm = ({ onNext }) => {
  const [open, setOpen] = useState(false);
  const { personalInfo, setPersonalInfo } = useEventDataStore();
  const { errors, validate } = useFormValidation(personalInfo);

  function handleChange(e) {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  }

  function handlePhoneChange(value) {
    setPersonalInfo({ ...personalInfo, telephone: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully!");
      onNext(); // Call onNext to proceed to the next page
    } else {
      console.log("Validation failed:", errors);
    }
  }

  const eventslist = [
    "Congresses",
    "Exhibitions and exhibitions",
    "Stages and sporting events",
    "Conferences and work meetings",
    "Gala dinners Weddings",
    "Training courses and seminars",
    "Concerts and theatrical events",
    "Fashion shows",
    "Shows",
    "Corporate lunches and dinners",
    "Film reviews",
  ];

  return (
    <form
      className={`w-full max-w-[925px] ${font_Plus_Jakarta_Sans.className} my-12 capitalize`}
      onSubmit={handleSubmit}
    >
      <div className="flex md:items-center gap-5 flex-col md:flex-row">
        <div className="flex-1">
          <label htmlFor="applicant" className="text-[16px] font-medium">
            Richiedente
          </label>
          <input
            type="text"
            placeholder="Type Here..."
            name="applicant"
            onChange={handleChange}
            className="border border-white rounded-[13px] border-opacity-10 bg-white/10 backdrop-blur-2xl p-6 mt-3 w-full"
          />
          {errors.applicant && <p className="text-red-500">{errors.applicant}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="fullName" className="text-[16px] font-medium">
            Nome e Cognome
          </label>
          <input
            type="text"
            placeholder="Type Here..."
            name="fullName"
            onChange={handleChange}
            className="border border-white rounded-[13px] border-opacity-10 bg-white/10 backdrop-blur-2xl p-6 mt-3 w-full"
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
        </div>
      </div>

      <div className="flex md:items-center gap-5 flex-col md:flex-row mt-6">
        <div className="flex-1">
          <label htmlFor="startDate" className="text-[16px] font-medium">
            Data inizio evento
          </label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            className="border border-white rounded-[13px] border-opacity-10 bg-white/10 backdrop-blur-2xl p-6 mt-3 w-full"
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="endDate" className="text-[16px] font-medium">
            Data fine evento
          </label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            className="border border-white rounded-[13px] border-opacity-10 bg-white/10 backdrop-blur-2xl p-6 mt-3 w-full"
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
        </div>
      </div>

      <Heading className="!text-[32px] !text-start mt-[44px]">
        IMPOSTA ORA
      </Heading>

      <div className="flex md:items-center gap-5 flex-col md:flex-row mt-6">
        <div className="flex-1">
          <label htmlFor="startTime" className="text-[16px] font-medium">
            Ora inizio
          </label>
          <input
            type="time"
            name="startTime"
            onChange={handleChange}
            defaultValue="00:00" // Set default value to 00:00
            className="border border-white rounded-[13px] border-opacity-10 bg-white/10 backdrop-blur-2xl p-6 mt-3 w-full"
          />
          {errors.startTime && <p className="text-red-500">{errors.startTime}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="endTime" className="text-[16px] font-medium">
            Ora fine
          </label>
          <input
            type="time"
            name="endTime"
            onChange={handleChange}
            defaultValue="00:00" // Set default value to 00:00
            className="border border-white rounded-[13px] border-opacity-10 bg-white/10 backdrop-blur-2xl p-6 mt-3 w-full"
          />
          {errors.endTime && <p className="text-red-500">{errors.endTime}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="telephone" className="text-[16px] font-medium">
            Telefono
          </label>
          <PhoneInput
            country={'it'}
            value={personalInfo.telephone}
            onChange={handlePhoneChange}
            inputClass={styles.customPhoneInput} // Apply custom styles
            buttonClass={styles.customPhoneDropdown} // Apply custom styles for dropdown
          />
          {errors.telephone && <p className="text-red-500">{errors.telephone}</p>}
        </div>
      </div>

      <div className="flex md:items-center gap-5 flex-col md:flex-row mt-6">
        <div className="flex-1">
          <label htmlFor="email" className="text-[16px] font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Type Here..."
            name="email"
            onChange={handleChange}
            className="border border-white rounded-[13px] border-opacity-10 bg-white/10 backdrop-blur-2xl p-6 mt-3 w-full"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="flex items-center gap-5 mt-6">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <label htmlFor="eventType" className="text-[16px] font-medium">
              Tipologia evento
            </label>
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
              <IoIosArrowDown />
            </div>
          </div>
          <AnimatedContainer trigger={open} animation={animation.OpenClose}>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border border-white rounded-[13px] border-opacity-10 bg-white/10 backdrop-blur-2xl p-6 mt-3 w-full">
              {eventslist.map((item, index) => (
                <li
                  key={`eventtype${index}`}
                  className={`opacity-70 font-normal hover:text-bgorange duration-200 ease-in-out cursor-pointer`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedContainer>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-auto">
        <Button icon={true} next={false} onClick={() => { /* Handle going back here if needed */ }}>
          indietro
        </Button>
       <div
      style={{
        padding: "10px",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    height: "65px",
        backgroundColor: next ? '#DA7B22' : '#222323',
        borderRadius: '12px', // Adjusted for rounded-2xl
        zIndex: 50,
        transform: 'scale(1)',
        transition: 'transform 0.2s ease-in-out',
        marginTop: '16px',
        marginBottom: '50px',
        // Add other styles if necessary
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <button
  type="submit"
  className={`bg-[#E69244] rounded-2xl text-[15px] md:text-[22px] uppercase leading-[33.12px] tracking-wide py-[8px] px-[12px] md:py-[15px] md:px-[32px] mb-[10px] active:scale-95 duration-200 ease-in-out`}
>
  Require
</button>
    </div>


      </div>
    </form>
  );
};

export default RegForm;
