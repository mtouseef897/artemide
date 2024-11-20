import React, { createContext, useState, useContext } from 'react';

// Create a Context for the page number
const PageContext = createContext();

// Create a Provider component
export const PageProvider = ({ children }) => {
  // State for the current page number
  const [pageNumber, setPageNumber] = useState(0);

// Function to update the page number
const updatePageNumber = (next) => {
    setPageNumber((prevPageNumber) => {
      if (next) {
        // Increment page number
        return prevPageNumber < 8 ? prevPageNumber + 1 : prevPageNumber;
      } else {
        // Decrement page number if prevPageNumber > 1, otherwise keep the same
        return prevPageNumber > 1 ? prevPageNumber - 1 : prevPageNumber;
      }
    });


  };

//   console.log("pageNumber",pageNumber)
  return (
    <PageContext.Provider value={{ pageNumber, updatePageNumber }}>
      {children}
    </PageContext.Provider>
  );
};

// Custom hook to use the PageContext
export const usePage = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};
