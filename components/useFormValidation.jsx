import { useState } from "react";

// Custom validation hook
const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};

    // Applicant validation (required)
    if (!formData.applicant) {
      validationErrors.applicant = "Applicant name is required";
    }

    // Full Name validation (required)
    if (!formData.fullName) {
      validationErrors.fullName = "Full name is required";
    }

    // Phone number validation (required)
    if (!formData.telephone) {
      validationErrors.telephone = "Phone number is required";
    }

    // Email validation (required and format)
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email address";
    }

    // Date validation (required)
    if (!formData.startDate) {
      validationErrors.startDate = "Event start date is required";
    }
    if (!formData.endDate) {
      validationErrors.endDate = "Event end date is required";
    }

    // Time validation (required)
    if (!formData.startTime) {
      validationErrors.startTime = "Event start time is required";
    }
    if (!formData.endTime) {
      validationErrors.endTime = "Event end time is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validate };
};

export default useFormValidation;
