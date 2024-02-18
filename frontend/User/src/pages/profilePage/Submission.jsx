import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Submission = (props) => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    setBackground(props.background);
  }, [props.background]);

  const calculateTimeDifference = (submissionDetails) => {
    const [year, month, day, hours, minutes, seconds, milliseconds] =
      submissionDetails.submissionDate;

    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    date.setMilliseconds(milliseconds / 1000);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    const timeDifference = new Date() - date;

    const secondsDiff = Math.floor(timeDifference / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff > 0) {
      return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
    } else if (hoursDiff > 0) {
      return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    } else if (minutesDiff > 0) {
      return `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <div
      className={`grid max-[466px]:grid-rows-4 items-center min-[466px]:grid-cols-5 gap-[4%] px-[3%] py-[1%] mb-[3px] text-md md:text-xl ${background} text-white font-light `}
    >
      <div
        className="truncate overflow-ellipsis min-[466px]:col-span-2 "
        data-tooltip-id={`submission-name-${props.submissionDetails?.submissionId}-${props.problemDetails?.problemId}`}
      >
        {props.problemDetails?.title}
      </div>
      <ReactTooltip
        id={`submission-name-${props.submissionDetails?.submissionId}-${props.problemDetails?.problemId}`}
        place="top"
        variant="light"
        content={props.problemDetails?.title}
      />

      <div
        className="truncate overflow-ellipsis"
        data-tooltip-id={`submission-time-diff-${props.submissionDetails?.submissionId}`}
      >
        {calculateTimeDifference(props?.submissionDetails)}
      </div>
      <ReactTooltip
        id={`submission-time-diff-${props.submissionDetails?.submissionId}`}
        place="top"
        variant="light"
        content={calculateTimeDifference(props?.submissionDetails)}
      />

      <div
        className="truncate overflow-ellipsis"
        data-tooltip-id={`submission-language-${props.submissionDetails?.submissionId}`}
      >
        {props.submissionDetails?.language}
      </div>
      <ReactTooltip
        id={`submission-language-${props.submissionDetails?.submissionId}`}
        place="top"
        variant="light"
        content={props.submissionDetails?.language}
      />
      <div className="truncate overflow-ellipsis text-base md:text-lg">
        {props.submissionDetails?.result}
      </div>
    </div>
  );
};

export default Submission;
