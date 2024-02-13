import React from "react";
import { useLocation } from "react-router-dom";
import Problem from "../../problems/problem/Problem";
import Timer from "./Timer";

const ContestPage = () => {
  const location = useLocation();
  const attribute = location.state;

  const renderedProblems = [];
  const totalProblems = 5;

  for (let i = 1; i <= totalProblems; i++) {
    if (i % 2 === 0) {
      renderedProblems.push(<Problem key={i} value="bg-gray-900" />);
    } else {
      renderedProblems.push(<Problem key={i} value="bg-gray-800" />);
    }
  }

  return (
    <div
      className={`flex flex-col-reverse md:flex-row mt-16 justify-around ps-6 md:ps-16 bg-gray-950 mb-4`}
    >
      <div className="w-[100%] md:w-[60%] lg:w-[60%]">
        <div className="pt-10 text-xl md:text-2xl lg:text-3xl text-gray-300 underline underline-offset-[12px]">
          Problems:
        </div>

        <div className="mr-[5%] md:mr-[2%] mt-8 md:mt-6 pt-4 px-2">
          {renderedProblems}
        </div>
      </div>

      <div
        className={`${attribute} max-md:mr-[5%] max-md:mt-4 md:w-fit text-center mt-4`}
      >
        <Timer />
      </div>
    </div>
  );
};

export default ContestPage;
