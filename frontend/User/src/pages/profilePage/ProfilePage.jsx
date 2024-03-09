import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import Submission from "./Submission";
import { BsCodeSlash } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import axios from "axios";
import LoadingIndicator from "../../common/LoadingIndicator";
import BarChart from "../../charts/BarChart";
import PieChart from "../../charts/PieChart";
const CHART_COLORS = {
  easy: "rgb(17, 179, 66,.5)",
  medium: "rgb(179, 171, 17,.5)",
  hard: "rgb(207, 47, 47,.5)",
  pieColors: [
    "rgb(17, 179, 66,.5)",
    "rgb(207, 47, 47,.5)",
    "rgb(179, 171, 17,.5)",
  ],
};

const ProfilePage = () => {
  const [user, setUser] = useState({});

  const [userId, setUserId] = useState(
    localStorage.getItem("id") !== null &&
      localStorage.getItem("id") !== undefined
      ? localStorage.getItem("id")
      : "-1"
  );

  const [loading, setLoading] = useState(true);
  const [problemsData, setProblemsData] = useState([{}]);

  const [userSubmissions, setuserSubmissions] = useState([]);
  const [userProblems, setUserProblems] = useState([]);

  const [ACProblems, setACProblems] = useState([]);

  // usestates for charts

  // pie chart for AC problems solved based on difficultyLevel
  const [difficultyLevelBarChartData, setDifficultyLevelBarChartData] =
    useState({
      labels: ["Easy", "Medium", "Hard"],
      datasets: [
        {
          label: "No. of Problems",
          data: [0, 0, 0],
          backgroundColor: [
            CHART_COLORS.easy,
            CHART_COLORS.medium,
            CHART_COLORS.hard,
          ],
          borderColor: "black",
          borderWidth: 1.1,
        },
      ],
    });

  // pie chart for submissions
  const [submissionResultPieChartData, setSubmissionResultPieChartData] =
    useState({
      labels: [],
      datasets: [
        {
          label: "No. of Submissions",
          data: [0, 0, 0],
          backgroundColor: CHART_COLORS.pieColors,
          borderColor: "black",
          borderWidth: 1.1,
        },
      ],
    });

  useEffect(() => {
    const getUser = async () => {
      if (userId !== "-1") {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${userId}`
          );
          setUser(response.data);
          setuserSubmissions(response.data.submissionList);

          setLoading(false);
        } catch (error) {
        }
      }
    };

    const getUserProblems = async () => {
      const submissionIds = userSubmissions.map((s) => s.submissionId);

      const uniqueProblems = await getProblems();

      const problems = uniqueProblems.filter((problem) =>
        problem.submissionList.some((submission) =>
          submissionIds.includes(submission.submissionId)
        )
      );

      const acProblems = uniqueProblems.filter((problem) =>
        problem.submissionList.some(
          (submission) =>
            submissionIds.includes(submission.submissionId) &&
            submission.result === "AC"
        )
      );

      setUserProblems(problems);

      const resultCounts = {
        AC: 0,
        WA: 0,
        RE: 0,
      };

      userSubmissions.forEach((submission) => {
        const result = submission.result;
        if (resultCounts.hasOwnProperty(result)) {
          resultCounts[result]++;
        }
      });

      const dataPoints = Object.values(resultCounts);

      setSubmissionResultPieChartData((prevChartData) => ({
        ...prevChartData,
        labels: ["Accepted", "Wrong Answer", "Runtime Error"],
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: dataPoints,
          },
        ],
      }));

      setACProblems(acProblems);
      setDifficultyLevelBarChartData({
        labels: ["Easy", "Medium", "Hard"],
        datasets: [
          {
            label: "No. of Problems",
            data: [
              acProblems.filter((problem) => problem.difficultyLevel === "easy")
                .length,
              acProblems.filter(
                (problem) => problem.difficultyLevel === "medium"
              ).length,
              acProblems.filter((problem) => problem.difficultyLevel === "hard")
                .length,
            ],
            backgroundColor: [
              CHART_COLORS.easy,
              CHART_COLORS.medium,
              CHART_COLORS.hard,
            ],
            borderColor: "black",
            borderWidth: 1.1,
          },
        ],
      });
    };

    async function getProblems() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/problems`
        );
        setProblemsData(response.data);
        return response.data;
      } catch (error) {
        return [];
      }
    }

    getUser();

    // Fetch user problems only if there are submissions
    if (userSubmissions.length > 0) {
      getUserProblems();
    }
  }, [userId, userSubmissions.length]);

  const [offset, setOffset] = useState(0);

  // Number of items per page
  const [perPage] = useState(10);

  // current page number
  const [currentPage, setCurrentPage] = useState(0);

  // number of items per page
  const [pageCount, setPageCount] = useState(0);

  // posting data
  const [postData, setPostData] = useState([]);
  const renderedSubmission = [];

  const getAllProblemsForAllSubmissions = () => {
    const allProblems = [];

    userSubmissions.forEach((submission) => {
      const submissionId = submission.submissionId;

      // Find the corresponding problem for the submission
      const correspondingProblem = problemsData.find((problem) =>
        problem?.submissionList?.some(
          (sub) => sub.submissionId === submissionId
        )
      );

      if (correspondingProblem) {
        // Collecting the problem for the submission
        allProblems.push({
          problem: correspondingProblem,
          submission,
        });
      }
    });

    return allProblems;
  };

  const receivedData = () => {
    const allProblems = getAllProblemsForAllSubmissions();
    allProblems.sort((a, b) => {
      const dateA = new Date(...a?.submission?.submissionDate.slice(0, 6));
      const dateB = new Date(...b?.submission?.submissionDate.slice(0, 6));
      return dateB - dateA;
    });
    for (let i = 0; i < allProblems?.length; i++) {
      if (i & 1) {
        renderedSubmission.push(
          <Submission
            key={i}
            submissionDetails={allProblems[i]?.submission}
            problemDetails={allProblems[i]?.problem}
            background="bg-gray-800"
          />
        );
      } else {
        renderedSubmission.push(
          <Submission
            key={i}
            submissionDetails={allProblems[i]?.submission}
            problemDetails={allProblems[i]?.problem}
            background="bg-gray-700"
          />
        );
      }
    }

    const slice = renderedSubmission.slice(offset, offset + perPage);
    const postData = slice.map((element, index) => (
      <p key={index}>{element}</p>
    ));
    setPageCount(Math.ceil(renderedSubmission.length / perPage));
    setPostData(postData);
  };

  const handlePageClick = (selectedPage) => {
    const newOffset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(newOffset);
    scrollToElement("submission-list");
  };
  const scrollToElement = (classname) => {
    const element = document.querySelector(`.${classname}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    receivedData();
  }, [loading, offset, problemsData]);

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="mt-16 mb-10 bg-[gray-950] flex flex-col md:flex-row md:ml-[2%] ">
            <div className="w-[95%] md:w-[27%] ml-[1%] md:ml-6 mt-2">
              <UserProfile
                username={user.username}
                name={user.name}
                email={user.email}
                problems={ACProblems}
              />
            </div>
            <div className="w-[95%] md:w-[64%] flex flex-col  ml-[3%] ">
              <div className="h-fit mt-[1%] grid grid-cols-1 lg:grid-cols-2 gap-[2%]  py-4 ">
              <div
                  style={{
                    width:370,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto", // Center horizontally
                  }}
                  className="w-full lg:w-auto bg-[#151b2d94] border border-[#151b2d94] p-3 text-white rounded-md shadow-lg shadow-[#14171e]"
                >
                  <BarChart chartData={difficultyLevelBarChartData} />{" "}
                </div>
                <div
                  style={{
                    width:370,
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto", // Center horizontally
                  }}
                  className="w-full lg:w-auto bg-[#151b2d94] border border-[#151b2d94] p-3 text-white rounded-md shadow-lg shadow-[#14171e]"
                >
                  <PieChart chartData={submissionResultPieChartData} />
                </div>
              </div>
              <div className="mt-2 w-full border border-[#151b2d94] p-1 bg-[#151b2d94] rounded-md shadow-lg shadow-[#14171e]">
                <div className="border border-transparent rounded-md my-[1%] text-xl px-3 py-1 bg-[#181f29] shadow-sm shadow-[#31343b] inline-flex items-center mb-4 ml-2">
                  <BsCodeSlash className="pr-1 text-2xl text-green-400" />
                  <span className="pl-1 text-gray-300">Submissions</span>
                </div>
                <div className="mx-[1%] submission-list ">{postData}</div>
                <div className="pagination w-fit flex justify-center m-auto my-[2%]">
                  <ReactPaginate
                    // Double click on Prev and Next Buttons will move to first and last page respectively.
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
