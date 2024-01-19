import React, { useState } from 'react';
import Select from 'react-select';
import '../drop-down/DropDown.css';

const Dropdown = ({ options, onChange, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption);
  };

  return (
    <div className="dropdown-container md:mx-4 lg:mx-5 xl:mx-32 relative">
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        placeholder={placeholder}
        className="border-none shadow-none cursor-pointer"
        classNamePrefix="tw-select"
        styles={{color:`${selectedOption.color}`}}
      />
    </div>
  );
};

export default Dropdown;

