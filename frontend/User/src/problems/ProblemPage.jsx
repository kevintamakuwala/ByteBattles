import React, { useState, useEffect } from "react";
import SearchBar from "./search/SearchBar";
import ProblemRecommendation from "./problem-recommendation/ProblemRecommendation";
import Problem from "./problem/Problem";
import FullScreenDialog from "./pop-up/PopUp";
import { RiArrowDropDownLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import LoadingIndicator from "../common/LoadingIndicator";
import { Tooltip as ReactToolTip } from "react-tooltip";
import Select from "react-select";

const ProblemPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [problemList, setProblemList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [postData, setPostData] = useState([]);
  const [userId, setUserId] = useState(
    localStorage.getItem("id") !== null
      ? Number(localStorage.getItem("id"))
      : -1
  );
  const [userData, setUserData] = useState([]);
  const [userSubmissionData, setUserSubmissionData] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleOpenDialog = (event) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTagSelect = (selectedLabel) => {
    setSelectedTag(selectedLabel);

    // Filter problems based on the selected tag

    setFilteredProblems(
      problemList.filter((problem) =>
        problem.tagList.some((tag) => tag.name === selectedLabel)
      )
    );
  };

  const [filteredProblems, setFilteredProblems] = useState([]);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") setFilteredProblems(problemList);
    if (!searchTerm.trim()) {
      return;
    }
    const searchTermLower = searchTerm.toLowerCase().replace(/\s/g, "");
    const filteredProblems = problemList.filter((problem) =>
      problem.title.toLowerCase().replace(/\s/g, "").includes(searchTermLower)
    );
    setFilteredProblems(filteredProblems);
  };

  const difficultyOptions = [
    { value: "easy", label: "easy", color: "green" },
    { value: "medium", label: "medium", color: "yellow" },
    { value: "hard", label: "hard", color: "red" },
  ];

  const statusOptions = [
    { value: "solved", label: "solved", color: "black" },
    { value: "unsolved", label: "unsolved", color: "black" },
  ];

  const tagOptions = tagList.map((tag) => ({
    value: tag.name.toLowerCase(),
    label: tag.name,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemsResponse = await fetch(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/problems`
        );
        const problemsData = await problemsResponse.json();
        setProblemList(problemsData);

        // Extract unique tags from the list of problems
        const uniqueTags = Array.from(
          new Set(
            problemsData
              .flatMap((problem) => problem.tagList)
              .map((tag) => tag.name)
          )
        );

        // Create tag objects from unique tag names
        const tags = uniqueTags.map((tagName) => ({ name: tagName }));

        // Set the tagList state
        setTagList(tags);
        if (userId !== -1) {
          const userResponse = await fetch(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${userId}`
          );
          const userData = await userResponse.json();
          setUserData(userData);
          setUserSubmissionData(userData.submissionList);
        }
      } catch (error) {
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (userId !== -1) {
      const filteredProblems = problemList.filter((problem) => {
        return problem.submissionList.some((submission) =>
          userSubmissionData.some(
            (userSubmission) =>
              submission.submissionId === userSubmission.submissionId &&
              submission.result === "AC"
          )
        );
      });
      setSolvedProblems(filteredProblems);
    }
  }, [
    problemList,
    userSubmissionData,
    userId,
    selectedDifficulty,
    selectedStatus,
  ]);

  const handleSelectChange = (selectedOption, type) => {
    if (type === "difficulty") {
      setSelectedDifficulty(selectedOption ? selectedOption.value : null);
    } else if (type === "status") {
      setSelectedStatus(selectedOption ? selectedOption.value : null);
    }
  };

  useEffect(() => {
    receivedData();
  }, [offset, problemList, selectedDifficulty, selectedStatus]);

  const receivedData = () => {
    let filteredProblemsToDisplay = filteredProblems.length
      ? filteredProblems
      : problemList;

    if (selectedStatus) {
      if (selectedStatus === "solved") {
        filteredProblemsToDisplay = solvedProblems;
      } else {
        filteredProblemsToDisplay = problemList.filter(
          (problem) =>
            !solvedProblems.some(
              (solvedProblem) => solvedProblem.problemId === problem.problemId
            )
        );
      }
    }
    if (selectedDifficulty) {
      filteredProblemsToDisplay = filteredProblemsToDisplay.length
        ? filteredProblemsToDisplay.filter(
            (problem) => problem.difficultyLevel === selectedDifficulty
          )
        : problemList.filter(
            (problem) => problem.difficultyLevel === selectedDifficulty
          );
    }
    const renderedProblems = filteredProblemsToDisplay.map((problem, index) => {
      const isFiltered = solvedProblems.some(
        (solvedProblem) => solvedProblem.problemId === problem.problemId
      );

      return (
        <Problem
          key={problem.problemId}
          value={index % 2 === 0 ? "bg-[#1a232f]" : "bg-[#333b46]"}
          data={problem}
          status={isFiltered ? "solved" : "unsolved"}
        />
      );
    });

    const slice = renderedProblems.slice(offset, offset + perPage);
    const postData = slice.map((element, index) => (
      <div key={index}>{element}</div>
    ));

    setPageCount(Math.ceil(renderedProblems.length / perPage));
    setPostData(postData);
  };

  const handlePageClick = (selectedPage) => {
    const newOffset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(newOffset);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    receivedData();
  }, [
    offset,
    problemList,
    solvedProblems,
    selectedDifficulty,
    filteredProblems,
  ]);

  if (problemList.length === 0 && offset === 0) {
    return <LoadingIndicator />;
  }
  return (
    <div className="bg-gray-950 min-h-screen py-8 ">
      <div className="problem-bar flex flex-col md:flex-row justify-around items-center rounded-lg mx-4 md:mx-12 h-auto md:h-16 bg-white mb-8 md:mb-0 lg:ps-12 md:ps-8">
        <SearchBar onSearch={handleSearch} />
        <div className="flex items-center w-full justify-around">
          <Select
            options={difficultyOptions}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "difficulty")
            }
            value={
              selectedDifficulty
                ? { value: selectedDifficulty, label: selectedDifficulty }
                : null
            }
            placeholder="Difficulty"
            isClearable
            classNamePrefix="react-select"
            styles={{
              dropdownIndicator: (base) => ({
                ...base,
                display: selectedDifficulty ? "none" : "block",
                color: "gray",
              }),
            }}
          />
          <Select
            options={statusOptions}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "status")
            }
            value={
              selectedStatus
                ? { value: selectedStatus, label: selectedStatus }
                : null
            }
            placeholder="Status"
            isClearable
            classNamePrefix="react-select"
            styles={{
              dropdownIndicator: (base) => ({
                ...base,
                display: selectedStatus ? "none" : "block",
                color: "gray",
              }),
            }}
          />

          <div>
            <button
              className="p-4 text-[#484849] flex text-center rounded-md text-xl"
              onClick={(event) => handleOpenDialog(event)}
            >
              {selectedTag || "Tags"}{" "}
              <RiArrowDropDownLine className="text-3xl" />
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
      </div>
      <div className="problem__main flex flex-col-reverse md:flex-row justify-between mt-4 md:mt-12 ms-2 md:ms-8">
        <div className="md:w-4/6 flex flex-col">
          <div
            className={` problems mx-2 max-md:mr-4 max-md:mt-4 md:ms-2 lg:ms-4 md:pr-2 md:ps-4 `}
          >
            {postData}
          </div>

          <div className="pagination w-fit flex justify-center m-auto mt-[4%]">
            <ReactPaginate
              previousLabel={
                <MdOutlineKeyboardDoubleArrowLeft className="inline-block" />
              }
              nextLabel={
                <MdOutlineKeyboardDoubleArrowRight className="inline-block" />
              }
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={0}
              pageRangeDisplayed={0}
              onPageChange={(selectedPage) =>
                handlePageClick(selectedPage.selected)
              }
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              previousLinkClassName={`border px-4 py-2 ${
                currentPage === 0 ? "pointer-events-none opacity-50" : ""
              }`}
              nextLinkClassName={`border px-4 py-2 ${
                currentPage === pageCount - 1
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            />
          </div>
        </div>

        <div className="daily-problems mx-2 md:ms-0 md:mr-10 lg:mx-12 mt-2 md:mt-0 md:w-2/6">
          <ProblemRecommendation
            tagList={tagList}
            userSubmissionData={userSubmissionData}
            solvedProblems={solvedProblems}
            problemList={problemList}
          />
          <ReactToolTip />
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
