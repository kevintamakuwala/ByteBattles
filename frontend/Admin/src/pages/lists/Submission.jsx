import React, { useState, useEffect } from "react";
import "./Page.css";
import { AiFillDelete } from "react-icons/ai";
import {
  errorNotification,
  formatDate,
  successNotification,
  customListSelectStyles,
} from "../../utils";
import Select from "react-select";

import { ToastContainer } from "react-toastify";

const Submission = () => {
  // Getting Submissions details
  const [submissionsData, setSubmissionsData] = useState([]);

  const getSubmissions = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/submissions`, requestOption)
      .then((res) => res.json())
      .then((data) => setSubmissionsData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  // Getting problem details
  const [problemData, setProblemData] = useState([]);

  const getProblem = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/problems/`, requestOption)
      .then((res) => res.json())
      .then((data) => setProblemData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProblem();
  }, []);

  //  Deleting Submission
  const deleteSubmission = (id) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/submissions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        successNotification("Submission Deleted Successfully");
        getProblemById(selectedProblemId);
      })
      .catch(() => errorNotification("Something Went Wrong"));
  };

  // table header data
  const tableHeaders = [
    "Submission Id",
    "Language",
    "Result",
    "Submission Date",
    "Action",
  ];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = submissionsData.length;

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
    fetch(`${process.env.REACT_APP_BASE_URL}/problems/${id}`, requestOption)
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

    const results = selectedProblemData.submissionList.filter(
      (item) =>
        item.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.result.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

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
            {selectedProblemData && selectedProblemData["submissionList"] ? (
              (searchTerm.length !== 0
                ? searchResults
                : selectedProblemData["submissionList"]
              )
                .slice(0, visible)
                .map((submission, index) => (
                  <>
                    <tr key={index}>
                      <td>{submission.submissionId}</td>
                      <td>{submission.language}</td>
                      <td>{submission.result}</td>

                      <td
                        dangerouslySetInnerHTML={{
                          __html: formatDate(submission.submissionDate),
                        }}
                      ></td>
                      <td>
                        <AiFillDelete
                          onClick={() => {
                            deleteSubmission(submission.submissionId);
                          }}
                        />
                        &nbsp;&nbsp;
                      </td>
                    </tr>
                    <div
                      className="view_more__button"
                      style={{
                        display:
                          show && selectedProblemData.length > 10
                            ? "block"
                            : "none",
                      }}
                    >
                      <button onClick={showMoreItems}>View More</button>
                    </div>
                  </>
                ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Submission;
