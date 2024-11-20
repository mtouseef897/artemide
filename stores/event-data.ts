import { create } from "zustand";
type PersonalDetails = {
  applicant: string;
  fullName: string;
  telephone: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
};
type PeopleCount = {
  min: number | string;
  max: number | string;
};

type Room = {
  name: string;
  spec: string;
};

type EventDataStore = {
  peopleCount: PeopleCount;
  rooms: Room[];
  selectedRoom: Room | null;
  selectedEquipment: string[];
  overnightStay: boolean;
  banquetingOptionSelected: string | null;
  selectedBarOption: string | null; // New state for selected bar option
  setPeopleCount: (newCount: Partial<PeopleCount>) => void;
  setRooms: (newRooms: Room[]) => void;
  setSelectedRoom: (room: Room) => void;
  toggleEquipmentSelection: (equipment: string) => void;
  setOvernightStay: (value: boolean) => void;
  setBanquetingOption: (option: string) => void;
  setSelectedBarOption: (option: string) => void; // Function to update selected bar option
  personalInfo: PersonalDetails;
  setPersonalInfo: (personalInfo: PersonalDetails) => void;
  contactMethod: string;
  setContactMethod: (value: string) => void;
};

const useEventDataStore = create<EventDataStore>((set) => ({
  peopleCount: { min: 100, max: 400 },
  rooms: [
    { name: "PLATEA", spec: "(675 pax)" },
    { name: "BANCHI DI SCUALA", spec: "(550 pax)" },
    { name: "BANQUETING", spec: "(368 pax)" },
  ],
  selectedRoom: null,
  selectedEquipment: [],
  overnightStay: false,
  banquetingOptionSelected: null,
  selectedBarOption: null, // Initialize with null (no selection)
  setPeopleCount: (newCount) =>
    set((state) => ({
      peopleCount: { ...state.peopleCount, ...newCount },
    })),
  setRooms: (newRooms) =>
    set(() => ({
      rooms: newRooms,
    })),
  setSelectedRoom: (room) =>
    set(() => ({
      selectedRoom: room,
    })),
  toggleEquipmentSelection: (equipment) =>
    set((state) => {
      const isSelected = state.selectedEquipment.includes(equipment);
      return {
        selectedEquipment: isSelected
          ? state.selectedEquipment.filter((item) => item !== equipment)
          : [...state.selectedEquipment, equipment],
      };
    }),
  setOvernightStay: (value) =>
    set(() => ({
      overnightStay: value,
    })),
  setBanquetingOption: (option) =>
    set(() => ({
      banquetingOptionSelected: option,
    })),
  setSelectedBarOption: (
    option // New function to update selected bar option
  ) =>
    set(() => ({
      selectedBarOption: option, // Set the selected bar option
    })),
  personalInfo: {
    applicant: "",
    fullName: "",
    telephone: "",
    startDate: null,
    endDate: null,
    startTime: "",
    endTime: "",
  },
  setPersonalInfo: (info) => set(() => ({ personalInfo: info })),
  contactMethod: null,
  setContactMethod: (value) =>
    set(() => ({
      contactMethod: value,
    })),
}));

export default useEventDataStore;
