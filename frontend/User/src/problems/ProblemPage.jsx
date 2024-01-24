import React, { useState } from "react";
import SearchBar from "./search/SearchBar";
import Dropdown from "./drop-down/DropDown";
import DailyProblem from "./daily-problem/DailyProblem";
import Problem from "./problem/Problem";
import FullScreenDialog from "./pop-up/PopUp";
import { RiArrowDropDownLine } from "react-icons/ri";

const ProblemPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTagSelect = (selectedLabel) => {
    setSelectedTag(selectedLabel);
  };

  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log("Searching for:", searchTerm);
  };

  const difficultyOptions = [
    { value: "easy", label: "Easy", color: "green" },
    { value: "medium", label: "Medium", color: "yellow" },
    { value: "hard", label: "Hard", color: "red" },
  ];

  const statusOptions = [
    { value: "solved", label: "Solved", color: "black" },
    { value: "unsolved", label: "Unsolved", color: "black" },
  ];

  const tagOptions = [
    { value: "array", label: "Array" },
    { value: "graph", label: "Graph" },
    { value: "string", label: "String" },
    { value: "tree", label: "Tree" },
    { value: "vector", label: "Vector" },
    { value: "array", label: "Array" },
    { value: "graph", label: "Graph" },
    { value: "string", label: "String" },
    { value: "tree", label: "Tree" },
    { value: "vector", label: "Vector" },
    { value: "array", label: "Array" },
    { value: "graph", label: "Graph" },
    { value: "string", label: "String" },
    { value: "vector", label: "Vector" },
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-8 ">
      <div className="problem-bar flex flex-col md:flex-row justify-around items-center rounded-lg mx-4 md:mx-12 h-auto md:h-16 bg-white mb-8 md:mb-0 lg:ps-12 md:ps-8">
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-center w-full justify-around">
          <Dropdown
            options={difficultyOptions}
            onChange={(selectedOption) =>
              console.log("Difficulty Selected:", selectedOption)
            }
            placeholder="Difficulty"
          />
          <Dropdown
            options={statusOptions}
            onChange={(selectedOption) =>
              console.log("Status Selected:", selectedOption)
            }
            placeholder="Status"
          />

          <div>
            <button
              className="p-4 text-[#484849] flex text-center rounded-md text-xl"
              onClick={handleOpenDialog}
            >
              {selectedTag || "Tags"} <RiArrowDropDownLine className="text-3xl" />
            </button>

            {isDialogOpen && (
              <FullScreenDialog
                options={tagOptions}
                onClose={handleCloseDialog}
                onSelect={handleTagSelect}
              />
            )}
          </div>
        </div>
        {/* <Dropdown
          options={difficultyOptions}
          onChange={(selectedOption) =>
            console.log("Difficulty Selected:", selectedOption)
          }
          placeholder="Difficulty"
        />
        <Dropdown
          options={statusOptions}
          onChange={(selectedOption) =>
            console.log("Status Selected:", selectedOption)
          }
          placeholder="Status"
        />

        <div>
          <button
            className="p-4 text-[#484849] flex text-center rounded-md text-xl"
            onClick={handleOpenDialog}
          >
            {selectedTag || "Tags"} <RiArrowDropDownLine className="text-3xl" />
          </button>

          {isDialogOpen && (
            <FullScreenDialog
              options={tagOptions}
              onClose={handleCloseDialog}
              onSelect={handleTagSelect}
            />
          )}
        </div> */}
      </div>
      <div className="problem__main flex flex-col-reverse md:flex-row justify-between mt-4 md:mt-12 ms-2 md:ms-8">
        <div className="mx-2 md:ms-4 md:pr-2  md:bg-slate-800 rounded-xl overflow-y-scroll scroll-smooth md:h-[20.5rem] lg:h-[21.5rem] md:w-4/6 pt-4 md:ps-4">
          <Problem />
          <Problem />
          <Problem />
          <Problem />
          <Problem />
          <Problem />
          <Problem />
          <Problem />
          <Problem />
          <Problem />
          <Problem />
          <Problem />
        </div>
        <div className="daily-problems mx-2 md:mx-12 mt-2 md:mt-0 md:w-2/6">
          <DailyProblem />
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
