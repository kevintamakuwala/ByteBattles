import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-[97%] rounded-lg border-2 border-gray-600 z-10 text-white text-base md:text-lg font-semibold px-4 py-2 bg-gray-800 mt-4 mb-2 mx-2 resize-none min-[550px]:h-[18rem]"
        )}
        // min-[550px]:h-[14rem]
      ></textarea>
    </>
  );
};

export default CustomInput;
