import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successNotification = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

export const errorNotification = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

// Format Date
export const formatDate = (d) => {
  const year = d[0] || 0;
  const month = d[1] || 0;
  const day = d[2] || 0;
  const hour = d[3] || 0;
  const minute = d[4] || 0;
  const second = d[5] || 0;

  const datePart = `${day}-${month}-${year}`;
  const timePart = `${hour}:${minute}:${second} IST`;

  return `${datePart}<br/>${timePart}`;
};
// custom styles for select-dropdown
export const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  option: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
};
export const customListSelectStyles = {
  ...customSelectStyles,
  control: (provided) => ({
    ...provided,
    cursor: "pointer",
    width: "10rem",
  }),
  option: (provided) => ({
    ...provided,
    cursor: "pointer",
    width: "10rem",
  }),
  menu: (provided) => ({
    ...provided,
    width: "10rem",
  }),
};

// Request options for API's
export const requestOption = {
  method: "GET",
  header: { "Content-Type": "application/json" },
};

// Min max times for DatePicker Component
export const minMaxTime = (startTime, maxHour = 23, maxMinute = 59) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  return [
    startTime && startTime.toDateString() === new Date().toDateString()
      ? new Date()
      : new Date(currentYear, currentMonth, currentDay, 0, 0, 0),
    startTime && startTime.toDateString() === new Date().toDateString()
      ? new Date(currentYear, currentMonth, currentDay, maxHour, maxMinute)
      : new Date(2100, 1, 1, maxHour, maxMinute),
  ];
};
