import React, { useContext, useEffect, useState } from "react";
import { BASE_URL, requestOption } from "../../utils";
import AdminContext from "../../context/AdminContext";
import "./Dashboard.css";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";

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

const Dashboard = () => {
  // Usestates definition starts --------------

  const { loginState } = useContext(AdminContext);
  const [usersData, setUsersData] = useState([]);
  const [problemsData, setProblemsData] = useState([]);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [contestsData, setContestsData] = useState([]);
  const [
    submissionsperProblemsBarChartData,
    setSubmissionsperProblemsBarChartData,
  ] = useState({
    labels: [],
    datasets: [
      {
        label: "No. of Submissions",
        data: [],
        backgroundColor: [],
        borderColor: "black",
        borderWidth: 1.1,
      },
    ],
  });
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
  const [usersInContestsChartData, setUsersInContestsChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "No. of Users",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 1.4,
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "black",
        pointRadius: 5,
      },
    ],
  });

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
  // Usestates definition ends--------------

  // loginState Dependency Injection
  useEffect(() => {
    if (loginState) {
      // Use Promise.all to fetch data concurrently
      Promise.all([
        fetch(`${BASE_URL}/users`, requestOption).then((res) => res.json()),
        fetch(`${BASE_URL}/problems`, requestOption).then((res) => res.json()),
        fetch(`${BASE_URL}/submissions`, requestOption).then((res) =>
          res.json()
        ),
        fetch(`${BASE_URL}/contests`, requestOption).then((res) => res.json()),
      ])
        .then(([users, problems, submissions, contests]) => {
          setUsersData(users);
          setProblemsData(problems);
          setSubmissionsData(submissions);
          setContestsData(contests);
        })
        .catch((err) => console.log(err));
    }
  }, [loginState]);

  useEffect(() => {
    if (problemsData?.length > 0) {
      setDifficultyLevelBarChartData({
        labels: ["Easy", "Medium", "Hard"],
        datasets: [
          {
            label: "No. of Problems",
            data: countProblems(),
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
    }

    if (submissionsData?.length > 0) {
      const resultCounts = {
        Accepted: 0,
        "Wrong Answer": 0,
        "Runtime Error": 0,
      };

      submissionsData.forEach((submission) => {
        const result = submission.result;
        if (resultCounts.hasOwnProperty(result)) {
          resultCounts[result]++;
        }
      });

      const dataPoints = Object.values(resultCounts);

      setSubmissionResultPieChartData((prevChartData) => ({
        ...prevChartData,
        labels: Object.keys(resultCounts),
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: dataPoints,
          },
        ],
      }));
    }

    if (problemsData?.length > 0 && submissionsData?.length > 0) {
      const submissionsCount = problemsData.map((problem) =>
        problem.submissionList ? problem.submissionList.length : 0
      );

      const distinctColors = generateDistinctColors(submissionsCount.length);

      setSubmissionsperProblemsBarChartData({
        labels: problemsData.map((problem) => problem.title),
        datasets: [
          {
            ...submissionsperProblemsBarChartData.datasets[0],
            data: submissionsCount,
            backgroundColor: distinctColors,
          },
        ],
      });
    }
  }, [problemsData, submissionsData]);

  // Count users in each contest for line chart
  useEffect(() => {
    if (contestsData && usersData) {
      const chartData = contestsData.map((contest) => {
        if (!contest || !contest.applicationUserSet) {
          return {
            contestTitle: "Unknown Contest",
            usersCount: 0,
          };
        }

        const usersInContest = contest.applicationUserSet.length;
        return {
          contestTitle: contest.title,
          usersCount: usersInContest,
        };
      });

      const labels = chartData.map((data) => data.contestTitle);
      const dataPoints = chartData.map((data) => data.usersCount);

      setUsersInContestsChartData({
        labels,
        datasets: [
          {
            label: "No. of Users per contest",
            data: dataPoints,
            fill: false,
            borderColor: "black",
            tension: 0.1,
            borderWidth: 1.4,
            pointBackgroundColor: "rgb(75, 192, 192)",
            pointBorderColor: "black",
            pointRadius: 5,
          },
        ],
      });
    }
  }, [contestsData, usersData]);

  const countProblems = () => {
    if (!problemsData) return [0, 0, 0];

    return [
      problemsData.filter((problem) => problem.difficultyLevel === "easy")
        .length,
      problemsData.filter((problem) => problem.difficultyLevel === "medium")
        .length,
      problemsData.filter((problem) => problem.difficultyLevel === "hard")
        .length,
    ];
  };

  const generateDistinctColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * (360 / count)) % 360;
      const color = `hsla(${hue}, 70%, 50%, 0.5)`;
      colors.push(color);
    }
    return colors;
  };

  return loginState ? (
    <div className="dashboard__container">
      <div className="data_labels">
        <div className="data__container">
          <p>No of Users</p>
          <h1>{usersData?.length}</h1>
        </div>
        <div className="data__container">
          <p>No of Problems</p>
          <h1>{problemsData?.length}</h1>
        </div>
        <div className="data__container">
          <p>No of Contests</p>
          <h1>{contestsData?.length}</h1>
        </div>
        <div className="data__container">
          <p>No of Submissions</p>
          <h1>{submissionsData?.length}</h1>
        </div>
      </div>
      <div className="chart__container">
        <div style={{ width: 500 }}>
          <BarChart chartData={difficultyLevelBarChartData} />
        </div>
        <div style={{ width: 500, height: 300 }}>
          <PieChart chartData={submissionResultPieChartData} />
        </div>
      </div>
      <div className="chart__container">
        <div style={{ width: 500 }}>
          <LineChart chartData={usersInContestsChartData} />
        </div>
        <div style={{ width: 500 }}>
          <BarChart chartData={submissionsperProblemsBarChartData} />
        </div>
      </div>
    </div>
  ) : null;
};

export default Dashboard;
