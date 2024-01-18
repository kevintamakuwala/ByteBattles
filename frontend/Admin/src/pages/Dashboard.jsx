import React,{useState,useEffect} from "react";
// import { CallNowData,BookNowData } from "../data/mockData.js";
import "./Dashboard.css";

const Dashboard = () => {
    // Getting Problem details
    const [ProblemData, setProblemData] = useState([]);
    const getProblem = () => {
      const requestOption = {
        method: "GET",
        header: { "Content-Type": "application/json" },
      };
      fetch("http://localhost:8000/problems", requestOption)
        .then((res) => res.json())
        .then((data) => setProblemData(data))
        .catch((err) => console.log(err));
    };  
    useEffect(() => {
      getProblem();
    }, []);

  //   // Getting city list
  // const [cityList, setCityList] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/v1/cities", {
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => setCityList(data))
  //     .catch((err) => console.log(err));
  // }, []);
  
  return (
    <div className="dashboard__container">
      <div className="spa_data_labels">
        <div className="data__container">
          <p>No of Problems</p>
          <h1>{ProblemData.length}</h1>
        </div>

        <div className="data__container">
          <p>No of Cities Covered</p>
          {/* <h1>{cityList.length}</h1> */}
        </div>

        <div className="data__container">
          <p>Inquiries</p>
          {/* <h1>{CallNowData.length + BookNowData.length}</h1> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
