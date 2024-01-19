import React, { useState, useEffect } from "react";
import "./Page.css";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BASE_URL, errorNotification, successNotification } from "../utils";
import { ToastContainer } from "react-toastify";
import TestcaseUpdate from "./forms/updateForms/TestcaseUpdate";

const Testcase = () => {

  // Getting Testcase details
  const [testcasesData, setTestcasesData] = useState([]);

  const getTestcases = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}/testcases`, requestOption)
      .then((res) => res.json())
      .then((data) => setTestcasesData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTestcases();
  }, []);

  // Getting problem details
  const [problemData, setProblemData] = useState([]);

  const getProblem = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}/problems/`, requestOption)
      .then((res) => res.json())
      .then((data) => setProblemData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProblem();
  }, []);

  //  Deleting Testcase
  const deleteTestcase = (id) => {
    fetch(`${BASE_URL}/testcases/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        successNotification("Testcase Deleted Successfully");
        getProblemById(selectedProblemId);
      })
      .catch(() => errorNotification("Something Went Wrong"));
  };

  // table header data
  const tableHeaders = ["Testcase Id", "Input", "Expected Output", "Action"];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = testcasesData.length;

  const showMoreItems = () => {
    if (visible < length) {
      setVisible((prevValue) => prevValue + 10);
    } else {
      setShow(false);
    }
  };

  const [selectedProblemId, setSelectedProblemId] = useState("");

  const handleChange = (event) => {
    setSelectedProblemId(event.target.value);
    getProblemById(event.target.value);
  };

  //   Getting Problem By Id
  const [selectedProblemData, setSelectedProblemData] = useState({});

  const getProblemById = (id) => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:8000/problems/${id}`, requestOption)
      .then((res) => res.json())
      .then((data) => setSelectedProblemData(data))
      .catch(() => errorNotification("Something Went Wrong"));
  };

  // Handling Searchbar events
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const results = selectedProblemData.testCaseList.filter(
      (item) =>
        item.testCaseId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.input.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.expectedOutput.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };
  // useStates of update Testcase
  const [updateTestcase, setUpdateTestcase] = useState(null);

  return (
    <div className="main_list__container">
      <div className="mini_navbar__container">
        <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        <ToastContainer />
        <div className="form-group">
          <select
            placeholder="Select Problems"
            value={selectedProblemId}
            onChange={handleChange}
            style={{
              width: "10rem",
            }}
          >
            <option value={""}>--select--</option>
            {problemData.map((problem) => {
              return (
                <option key={problem.problemId} value={problem.problemId}>
                  {problem.title}
                </option>
              );
            })}
          </select>
          <p>Selected Option: {selectedProblemData.title}</p>
        </div>
      </div>

      <div className="list__container">
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {selectedProblemData && selectedProblemData["testCaseList"] ? (
              (searchTerm.length !== 0
                ? searchResults
                : selectedProblemData["testCaseList"]
              ).map((testcase, index) => (
                <>
                  <tr key={index}>
                    <td>{testcase.testCaseId}</td>
                    <td>{testcase.input}</td>
                    <td>{testcase.expectedOutput}</td>
                    <td>
                      <AiFillDelete
                        onClick={() => {
                          deleteTestcase(testcase.testCaseId);
                        }}
                      />
                      &nbsp;&nbsp;
                      <FaEdit
                        onClick={() => {
                          setUpdateTestcase(index);
                        }}
                      />
                    </td>
                  </tr>
                  <div
                    className="showPhotos"
                    style={{
                      display: updateTestcase === index ? "block" : "none",
                    }}
                  >
                    <button
                      onClick={() => {
                        setUpdateTestcase(null);
                      }}
                      style={{
                        padding: "0.7rem 1.2rem",
                        borderRadius: "10px",
                        color: "white",
                        backgroundColor: "#512DC8",
                      }}
                    >
                      Close
                    </button>
                    <TestcaseUpdate data={testcase} problemId={selectedProblemData.problemId}/>
                  </div>
                </>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>

        <div
          className="view_more__button"
          style={{
            display: show && selectedProblemData.length > 10 ? "block" : "none",
          }}
        >
          <button onClick={showMoreItems}>View More</button>
        </div>
      </div>
    </div>
  );
};
export default Testcase;
