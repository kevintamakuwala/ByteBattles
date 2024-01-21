import React, { useState, useEffect } from "react";
// import { CallNowData,BookNowData } from "../data/mockData.js";
import "./Dashboard.css";
import { BASE_URL, requestOption } from "../../utils";

const Dashboard = () => {
  const [ProblemData, setProblemData] = useState([]);
  const [submissionsData, setSubmissionsData] = useState([]);

  useEffect(() => {
    // Getting Problem details
    fetch(`${BASE_URL}/problems`, requestOption)
      .then((res) => res.json())
      .then((data) => setProblemData(data))
      .catch((err) => console.log(err));
    // Getting Submissions details
    fetch(`${BASE_URL}/submissions`, requestOption)
      .then((res) => res.json())
      .then((data) => setSubmissionsData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard__container">
      <div className="spa_data_labels">
        <div className="data__container">
          <p>No of Problems</p>
          <h1>{ProblemData.length}</h1>
        </div>

        <div className="data__container">
          <p>No of Contests</p>
        </div>

        <div className="data__container">
          <p>No of Submissions</p>
          <h1>{submissionsData.length}</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
