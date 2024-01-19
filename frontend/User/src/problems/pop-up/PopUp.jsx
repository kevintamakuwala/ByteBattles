import React, { useState,useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const FullScreenDialog = ({ options, onClose, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const popupRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option.label);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose(); // Close the popup menu when clicking outside
    }
  };

  useEffect(() => {
    // Attach the event listener on mount
    document.addEventListener('click', handleClickOutside);

    // Detach the event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center text-center bg-black bg-opacity-80">
      <div className="bg-gray-900 p-8 rounded-md shadow-md w-2/4">
    

        <div className="flex flex-wrap">
          {options.map((option) => (
            <button
              key={option.value}
              className={`flex-shrink-0 p-2 border-none rounded-3xl mx-2 mb-2 ${
                selectedOption === option ? 'bg-gray-500 text-white' : 'bg-gray-700 hover:bg-gray-500 text-white'
              }`}
              style={{ minWidth: '100px' }}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="py-2 px-3 bg-slate-800 text-white font-semibold font-mono rounded-full hover:bg-slate-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullScreenDialog;
