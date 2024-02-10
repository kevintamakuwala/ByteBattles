import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactToolTip } from "react-tooltip";
const Problem = (props) => {
  const navigate = useNavigate();
  const [hoveredTitle, setHoveredTitle] = useState("");

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
  let difficultyClass = "";
  if (props.data.difficultyLevel === "easy") {
    difficultyClass = "text-[#00eefd] brightness-125"; // You can adjust this color as needed
  }
  if (props.data.difficultyLevel === "medium") {
    difficultyClass = "text-[#f6d50b]"; // You can adjust this color as needed
  }
  if (props.data.difficultyLevel === "hard") {
    difficultyClass = "text-[rgb(255,55,95)]"; // You can adjust this color as needed
  }
  

  const handleMouseEnter = (title) => {
    setHoveredTitle(title);
  };

  const handleMouseLeave = () => {
    setHoveredTitle("");
  };
  return (
    <div
      className={`problem__container flex flex-col max-[466px]:text-center max-[466px]:justify-between max-[466px]:items-center items-center min-[466px]:grid min-[466px]:grid-cols-5 min-[505px]:text-lg text-base md:flex-row pl-[6%] md:pl-[3%] xl:pl-[5%] pr-[2%] md:pe-6 py-1 md:py-3 font-sans text-white  mb-[2px] md:min-w-840px md:max-w-999px md:text-lg lg:text-xl ${props.value !== "hidden" ? props.value : ""
        }`}
    >
      <div className="problem-heading col-span-2 justify-start truncate overflow-ellipsis" onMouseLeave={handleMouseLeave}>
        <span
          className="pt-1"
          data-tooltip-id='problem-title'
          onMouseEnter={() => handleMouseEnter(props.data?.title)}
        >
          {props.data?.title}
        </span>
        <ReactToolTip
          id='problem-title'
          place='top'
          // variant='info'
          effect="solid"
          content={hoveredTitle}
        />
        {/* <ReactToolTip
          id={`${props.index}`}
          effect="solid"
          content={props.data?.title}
          delayShow={500} // Adjust delay as needed
        /> */}
      </div>
      <div
        className={`problem-difficulty font-sans font-thin pt-1 md:pt-0 md:pl-3 min-[466px]:ml-[12%] md:ml-0 truncate overflow-ellipsis ${difficultyClass} ${props.value === "hidden" ? props.value : ""
          }`}
      >
        {/* {props.data?.difficultyLevel} */}
        {props.data?.difficultyLevel.charAt(0).toUpperCase() + props.data?.difficultyLevel.slice(1)}
      </div>
      <div className="problem-status font-sans pt-1 md:pt-0 md:pl-3">
        {props.status}
      </div>
      <div className="mt-2 md:mt-0 md:pl-[10%] ">
        <button
          className="start-problem bg-red-600 rounded-3xl px-4 lg:px-4 py-1 font-semibold font-system-ui transition duration-300 hover:bg-red-800 ml-2"
          onClick={handleSolveClick}
        >
          Solve
        </button>
      </div>
    </div>
  );
};
export default Problem;
