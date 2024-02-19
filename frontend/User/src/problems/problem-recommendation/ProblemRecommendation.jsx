import React, { useState, useEffect } from "react";
import { FaCalendarCheck } from "react-icons/fa6";
import LoadingIndicator from "../../common/LoadingIndicator";
import { useNavigate } from "react-router-dom";

const ProblemRecommendation = ({
  tagList,
  userSubmissionData,
  solvedProblems,
  problemList,
}) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  const recommendProblem = (
    tags,
    userSubmissions,
    solvedProblems,
    allProblems
  ) => {
    const tagAccuracy = {};

    // Initialize tagAccuracy object with tags
    tags?.forEach((tag) => {
      tagAccuracy[tag.name] = {
        totalSubmissionsUntilAC: 0,
        accuracy: 0,
      };
    });

    // Calculate accuracy for each tag based on user submissions
    userSubmissions?.forEach((submission) => {
      const matchingProblem = allProblems?.find((problem) =>
        problem.submissionList?.some(
          (s) => s.submissionId === submission.submissionId
        )
      );

      if (matchingProblem) {
        matchingProblem.tagList?.forEach((tag) => {
          tagAccuracy[tag.name].totalSubmissionsUntilAC += 1;

          if (submission.result === "AC") {
            tagAccuracy[tag.name].accuracy =
              (1 / tagAccuracy[tag.name].totalSubmissionsUntilAC) * 100;
          }
        });
      }
    });

    // Find problems with the lowest accuracy that the user has not solved
    let lowestAccuracy = Infinity,
      recommendedProblem = null;

    tags?.forEach((tag) => {
      const unsolvedProblems = allProblems.filter(
        (problem) =>
          !solvedProblems.includes(problem.problemId) &&
          problem.tagList.some((t) => t.name === tag.name)
      );

      const lowAccuracyProblem = unsolvedProblems.reduce(
        (lowestProblem, currentProblem) => {
          const currentAccuracy = tagAccuracy[tag.name].accuracy || 0;

          if (currentAccuracy < lowestAccuracy) {
            lowestAccuracy = currentAccuracy;
            return currentProblem;
          }

          return lowestProblem;
        },
        null
      );

      if (lowAccuracyProblem) {
        recommendedProblem = lowAccuracyProblem;
      }
    });

    return recommendedProblem;
  };

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const recommendedProblem = await recommendProblem(
          tagList,
          userSubmissionData,
          solvedProblems,
          problemList
        );
        setRecommendation(recommendedProblem);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [tagList, userSubmissionData, solvedProblems, problemList]);


  const navigate = useNavigate();

  const handleSolveClick = (problem) => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("id") !== undefined
    ) {
      // Replace spaces in the title with '-'
      const problemTitleSlug = problem.title
        .replace(/\s+/g, "-")
        .toLowerCase();
      const problemUrl = `/problems/${problemTitleSlug}/`;
      navigate(problemUrl, { state: { problem: problem} });
    } else {
      navigate("/login");
      window.scrollTo(0, 0);
    }
  };
  return (
    <div
      className="dailyProblem__main bg-slate-900 mr-[0.5rem] md:mr-0 rounded-lg p-4 md:p-8 flex flex-col items-center text-center text-white lg:h-[27rem] mb-2"
      style={{ boxShadow: "0 8px 17px 7px rgba(85 84 84 0.1)" }}
    >
      <div className="today-problem flex items-center gap-3 lg:gap-4 md:p-0 my-2 md:m-4 w-full justify-center">
        <FaCalendarCheck className="text-green-500 text-2xl  lg:text-3xl" />
        <h2 className="text-2xl md:text-xl font-bold font-sans pb-2 md:pb-0">
          Recommended Problem!!!
        </h2>
      </div>

      {!loading && recommendation ? (
        <>
          <div className="md:mt-4 mx-2 md:mx-10 text-lg md:text-base lg:text-lg ">
            <p className="md:w-[200px]">{recommendation.title}</p>
          </div>

          <div className="dailyProblem-details flex justify-around flex-col md:items-center md:justify-center md:pb-2 md:mt-4 lg:mx-20 text-lg md:text-lg">
            <>
              {recommendation.tagList.map((tag, index) => {
                return <span key={index}>{tag.name}</span>;
              })}
            </>
            <p>{recommendation.difficultyLevel}</p>
          </div>

          <div>
            <button
              className="daily-solveBtn border-2 border-red-600 rounded-2xl py-2 px-8 font-semibold transition duration-300 ease
              mt-5 hover:bg-red-700 hover:text-white text-lg md:text-xl"
              onClick={()=>handleSolveClick(recommendation)}
            >
              Solve
            </button>
          </div>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};

export default ProblemRecommendation;
