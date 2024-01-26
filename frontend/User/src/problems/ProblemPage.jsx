import React, { useState, useEffect } from "react";
import SearchBar from "./search/SearchBar";
import Dropdown from "./drop-down/DropDown";
import DailyProblem from "./daily-problem/DailyProblem";
import Problem from "./problem/Problem";
import FullScreenDialog from "./pop-up/PopUp";
import { RiArrowDropDownLine } from "react-icons/ri";
import ReactPaginate from 'react-paginate';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";


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

    // const renderedProblems = [];
    // for( let i=0; i<20; i++){
    //   if(i%2===0){
    //     renderedProblems.push(<Problem value="bg-slate-800" />);
    //     // renderedProblems.push(<hr />)
    //   }
    //   else{
    //     renderedProblems.push(<Problem value="bg-slate-700" />);
    //     // renderedProblems.push(<hr />)
    //   }

    // }


    // const [offset, setOffset] = useState(0);

    // // Number of items per page
    // const [perPage] = useState(10);

    // // current page number
    // const [currentPage, setCurrentPage] = useState(0);

    // // number of items per page
    // const [pageCount, setPageCount] = useState(0);

    // // posting data
    // const [postData, setPostData] = useState([]);

    // const receivedData = () => {

    //     const problemsPerPage = 10;
    //     const totalProblems = 105; // Assuming you have a total number of problems
    //     const [buttonClicked, setButtonClicked] = useState(false);

    //     const totalPages = Math.ceil(totalProblems / problemsPerPage);

    //     const renderedProblems = [];

    //     for (let i = (currentPage - 1) * problemsPerPage; i < currentPage * problemsPerPage && i < totalProblems; i++) {
    //         if (i % 2 === 0) {
    //             renderedProblems.push(<Problem key={i} value="bg-slate-800" />);
    //         } else {
    //             renderedProblems.push(<Problem key={i} value="bg-slate-700" />);
    //         }
    //     }
    //     const slice = data.slice(offset, offset + perPage);
    //     const postData = slice.map((element, index) => (
    //         <p key={index}>{element}</p>
    //     ));
    //     setPostData(postData);
    // }

    // const handlePageClick = (selectedPage) => {
    //     const newOffset = selectedPage * perPage;
    //     setCurrentPage(selectedPage);
    //     setOffset(newOffset);
    // };

    // useEffect(() => {
    //     receivedData();
    // }, [offset]);

    // const handlePageChange = (newPage) => {
    //     setCurrentPage(newPage);
    //     setButtonClicked(true);
    // };


    const [offset, setOffset] = useState(0);

    // Number of items per page
    const [perPage] = useState(10);

    // current page number
    const [currentPage, setCurrentPage] = useState(0);

    // number of items per page
    const [pageCount, setPageCount] = useState(0);

    // posting data
    const [postData, setPostData] = useState([]);

    const receivedData = () => {
        const length = 105;

        const renderedProblems = [];

        for (let i = 1; i <= length; i++) {
            if (i % 2 === 0) {
                renderedProblems.push(<Problem key={i} value="bg-gray-900" />);
                // renderedProblems.push(<hr />);
            } else {
                renderedProblems.push(<Problem key={i} value="bg-gray-800" />);
                // renderedProblems.push(<hr />);
            }
        }

        const slice = renderedProblems.slice(offset, offset + perPage);
        const postData = slice.map((element, index) => (
            <p key={index}>{element}</p>
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
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        receivedData();
    }, [offset]);



    return (
        <div className="bg-gray-950 min-h-screen py-8 ">
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
                <div className="md:w-4/6 flex flex-col">
                    <div className={`problems mx-2 max-md:mr-4 max-md:mt-4 md:ms-2 lg:ms-4 md:pr-2 md:ps-4 `}>
                        {/* overflow-y-scroll scroll-smooth md:h-[20.5rem] lg:h-[21.5rem] */}
                        {/* <Problem />
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
                        <Problem /> */}

                        {/* {renderedProblems} */}
                        {postData}
                    </div>
                    <div className="pagination w-fit flex justify-center m-auto mt-[4%]">
                        {/* {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index + 1} onClick={() => handlePageChange(index + 1)}
                                className={`mx-[4%] py-[4%] px-[14%] transition-all duration-300 ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}>
                                {index + 1}
                            </button>
                        ))} */}


                        <ReactPaginate
                            // Double click on Prev and Next Buttons will move to first and last page respectively.
                            previousLabel={<MdOutlineKeyboardDoubleArrowLeft className="inline-block" />                        }
                            nextLabel={<MdOutlineKeyboardDoubleArrowRight className="inline-block" />}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={(selectedPage) => handlePageClick(selectedPage.selected)}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </div>

                </div>

                <div className="daily-problems mx-2 md:ms-0 md:mr-10 lg:mx-12 mt-2 md:mt-0 md:w-2/6">
                    <DailyProblem />
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
