import React from "react";
import { useNavigate } from "react-router-dom";

const Problem = (props) => {
  const navigate = useNavigate();

  const handleSolveClick = () => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("id") !== undefined
    ) {
      // Replace spaces in the title with '-'
      const problemTitleSlug = props.data.title
        .replace(/\s+/g, "-")
        .toLowerCase();
      const problemUrl = `/problems/${problemTitleSlug}/`;
      navigate(problemUrl, { state: { problem: props.data } });
    } else {
      navigate("/login");
      window.scrollTo(0, 0);
    }
  };
  

  return (
    <div
      className={`problem__container flex flex-col min-[466px]:flex-row min-[505px]:text-lg text-base md:flex-row text-center justify-between items-center px-3 md:pe-5 lg:px-5 py-2 md:py-3 font-sans text-white md:items-center md:text-center md:align-middle md:justify-between mb-[2px] md:min-w-840px md:max-w-999px md:text-lg lg:text-xl ${
        props.value !== "hidden" ? props.value : ""
      }`}
    >
      <div className="problem-heading flex justify-start overflow-hidden">
        {/* <span className='pt-1'>100.</span> */}
        <span className="pt-1 md:whitespace-nowrap whitespace-normal overflow-ellipsis">
          {props.data?.title}
        </span>
      </div>
      <div
        className={`problem-difficulty font-sans pt-1 md:pt-0 md:pl-3 ${
          props.value === "hidden" ? props.value : ""
        }`}
      >
        {props.data?.difficultyLevel}
      </div>
      <div className="problem-status font-sans pt-1 md:pt-0 md:pl-3">
        {props.status}
      </div>
      <div className="mt-2 md:mt-0">
        <button
          className="start-problem bg-red-600 rounded-3xl px-3 lg:px-6 py-1 font-semibold font-system-ui transition duration-300 hover:bg-red-800 md:w-full ml-2"
          onClick={handleSolveClick}
        >
          Solve
        </button>
      </div>
    </div>
  );
};

export default Problem;
