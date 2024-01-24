import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { BASE_URL, requestOption } from "../../utils";

const Dashboard = () => {
  const [problemsData, setProblemsData] = useState([]);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [contestsData, setContestsData] = useState([]);

  useEffect(() => {
    // Getting Problem details
    fetch(`${BASE_URL}/problems`, requestOption)
      .then((res) => res.json())
      .then((data) => setProblemsData(data))
      .catch((err) => console.log(err));
    // Getting Submissions details
    fetch(`${BASE_URL}/submissions`, requestOption)
      .then((res) => res.json())
      .then((data) => setSubmissionsData(data))
      .catch((err) => console.log(err));
    // Getting Contests details
    fetch(`${BASE_URL}/contests`, requestOption)
      .then((res) => res.json())
      .then((data) => setContestsData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard__container">
      <div className="data_labels">
        <div className="data__container">
          <p>No of Users</p>
          <h1>{problemsData?.length}</h1>
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
    </div>
  );
};

export default Dashboard;
