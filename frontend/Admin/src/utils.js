import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BASE_URL = "http://localhost:8000";

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

//   Format Date
export const formatDate = (d) => {
  return (
    d[2] +
    "-" +
    d[1] +
    "-" +
    d[0] +
    " " +
    d[3] +
    ":" +
    d[4] +
    ":" +
    d[5] +
    " IST"
  );
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
