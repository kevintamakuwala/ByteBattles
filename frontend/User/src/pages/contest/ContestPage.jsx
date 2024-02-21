import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Problem from "../../problems/problem/Problem";
import Timer from "./Timer";

const ContestPage = () => {
  const [timerDisplayStatus, setTimerDisplayStatus] = useState(true);

  const location = useLocation();
  const attribute = location.state;
  console.log(location.state);
  let url = attribute?.url;

  const startTime = attribute.startTime;
  const endTime = attribute.endTime;

  const EndTime = new Date(endTime[0], endTime[1] - 1, endTime[2], endTime[3], endTime[4]);
  const StartTime = new Date(startTime[0], startTime[1] - 1, startTime[2], startTime[3], startTime[4]);

  if (!url) {
    const contestsIndex = window.location.href.indexOf("/contests");
    if (contestsIndex !== -1) {
      let afterContests = window.location.href.substring(
        contestsIndex + "/contests".length
      );
      afterContests = afterContests.replace(/^\//, "");
      const modifiedUrl = afterContests.replace(/-/g, " ");
      url = modifiedUrl;
    } else {
      console.log("'/contests' not found in the URL");
    }
  } else {
    console.log("URL from attribute:", url);
  }

  const [problems, setProblems] = useState([]);
  const [contestData, setContestData] = useState([]);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/contests/title/${url}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContestData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (url) {
      fetchContestData();
      if(StartTime < new Date() && EndTime <= new Date()){
        setTimerDisplayStatus(false);
      }
    }
  }, [url]);


  const problemList = contestData.problemSet;

  const receivedData = () => {
    const renderedProblems = problemList.map((problem, index) => {
      return (
        <Problem
          value={index % 2 === 0 ? "bg-[#1a232f]" : "bg-[#333b46]"}
          data={problem}
        />
      );
    });
    setProblems(renderedProblems);
  };

  useEffect(() => {
    if (contestData && contestData.problemSet) {
      receivedData();
    }
  }, [contestData]);

  return (
    <div
      className={`flex flex-col-reverse md:flex-row mt-16 justify-around ps-6 md:ps-16 bg-gray-950 mb-4`}
    >
      <div className="w-[100%] md:w-[60%] lg:w-[60%]">
        <div className="pt-10 text-xl md:text-2xl lg:text-3xl text-gray-300 underline underline-offset-[12px]">
          Problems:
        </div>

        <div className="mr-[5%] md:mr-[2%] mt-8 md:mt-6 pt-4 px-2">
          {problems}
        </div>
      </div>

      <div
        className={`${timerDisplayStatus ? "" : "hidden"} max-md:mr-[5%] max-md:mt-4 md:w-fit text-center mt-4`}
      >
        <Timer startTime={attribute?.startTime} endTime={attribute?.endTime} />
      </div>
    </div>
  );
};

export default ContestPage;
