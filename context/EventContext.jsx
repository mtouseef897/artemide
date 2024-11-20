import React, { createContext, useState, useContext } from 'react';

// Define the initial state
const initialState = {
  participant_count: 0,
  roomsetup: '',
  equipment: [],
  nightstay: false,
  banquetoption: '',
  baroption: '',
  eventtype: '',
};

// Create a Context for the state
const EventContext = createContext();

// Create a Provider component
export const EventProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Update specific state values
  const updateParticipantCount = (count) => setState((prev) => ({ ...prev, participant_count: count }));
  const updateRoomSetup = (setup) => setState((prev) => ({ ...prev, roomsetup: setup }));
  const updateEquipment = (equipment) => setState((prev) => ({ ...prev, equipment: [...prev.equipment, equipment] }));
  const updateNightStay = (nightstay) => setState((prev) => ({ ...prev, nightstay }));
  const updateBanquetOption = (option) => setState((prev) => ({ ...prev, banquetoption: option }));
  const updateBarOption = (option) => setState((prev) => ({ ...prev, baroption: option }));
  const updateEventType = (option) => setState((prev) => ({ ...prev, eventtype: option }));

  // Function to submit form data
  const submitForm = () => {
    const formData = {
      participantCount: state.participant_count,
      roomSetup: state.roomsetup,
      equipment: state.equipment,
      nightStay: state.nightstay,
      banquetOption: state.banquetoption,
      barOption: state.baroption,
      eventType: state.eventtype,
    };

    console.log("Submitting form data: ", formData);
    // Send formData to your backend API
    // Example: fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    <EventContext.Provider value={{
      state,
      updateParticipantCount,
      updateRoomSetup,
      updateEquipment,
      updateNightStay,
      updateBanquetOption,
      updateBarOption,
      updateEventType,
      submitForm, // Include the submit function
    }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the context
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
