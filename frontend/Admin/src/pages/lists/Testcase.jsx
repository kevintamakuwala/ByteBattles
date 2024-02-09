import React, { useState, useEffect } from "react";
import "./Page.css";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import {
  errorNotification,
  successNotification,
  customListSelectStyles,
} from "../../utils";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import TestcaseUpdate from "../forms/updateForms/TestcaseUpdate.jsx";

const Testcase = () => {
  const [testcasesData, setTestcasesData] = useState([]);
  const [problemData, setProblemData] = useState([]);
  const [selectedProblemData, setSelectedProblemData] = useState({});

  // Getting problems and testcases details
  useEffect(() => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/testcases`, requestOption)
      .then((res) => res.json())
      .then((data) => setTestcasesData(data))
      .catch((err) => console.log(err));

    fetch(`${process.env.REACT_APP_BASE_URL}/problems/`, requestOption)
      .then((res) => res.json())
      .then((data) => setProblemData(data))
      .catch((err) => console.log(err));
  }, []);

  //  Deleting Testcase
  const deleteTestcase = (id) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/testcases/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        window.location.reload();
        successNotification("Testcase Deleted Successfully");
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

  // Handling Searchbar events
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const results = selectedProblemData?.testCaseList?.filter(
      (item) =>
        item.testCaseId
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
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
        <ToastContainer />
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

        <div className="form-group" style={{ margin: "1rem 0" }}>
          <label htmlFor="problem">Select Problem *</label>
          <Select
            id="problem"
            value={
              selectedProblemData
                ? {
                    value: selectedProblemData.title,
                    label: selectedProblemData.title,
                  }
                : null
            }
            options={problemData.map((problem) => ({
              value: problem.title,
              label: problem.title,
            }))}
            onChange={(selectedOption) => {
              const selectedProblem = problemData.find(
                (problem) => problem.title === selectedOption.value
              );
              setSelectedProblemData(selectedProblem);
            }}
            styles={customListSelectStyles}
          />
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
                    <td>
                      {testcase.input.split("\n").map((line, index) => (
                        <li key={index}>
                          {line}
                          <br />
                        </li>
                      ))}
                    </td>
                    <td>
                      {testcase.expectedOutput
                        .split("\n")
                        .map((line, index) => (
                          <li key={index}>
                            {line}
                            <br />
                          </li>
                        ))}
                    </td>
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
                    <TestcaseUpdate
                      data={testcase}
                      problemId={selectedProblemData.problemId}
                    />
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
