import React, { useEffect, useState } from "react";
import "./Page.css";
import { Link } from "react-router-dom";

import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import ProblemUpdate from "./forms/updateForms/ProblemUpdate";

const Problem = () => {
  // update Problem use state variables
  const [updateProblemtrigger, setUpdateProblemTrigger] = useState(null);
  const [updateProblem, setUpdateProblem] = useState(null);

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

  //  Deleting Problem
  const deleteProblem = (id) => {
    fetch(`http://localhost:8000/problems/${id}`, {
      method: "DELETE",
    })
      .then(() => getProblem())
      .catch((err) => console.log(err));
  };

  // table header data
  const tableHeaders = [
    "ProblemId",
    "Title",
    "Description",
    "Constraints",
    "Difficulty Level",
    "Action",
  ];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = ProblemData.length;

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

    const results = ProblemData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.difficultyLevel.toLowerCase().includes(searchTerm.toLowerCase())
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
            {(searchTerm.length !== 0 ? searchResults : ProblemData)
              .slice(0, visible)
              .map((problem, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{problem.problemId}</td>
                      <td>{problem.title}</td>
                      <td>{problem.description}</td>
                      <td>{problem.constraints}</td>
                      <td>{problem.difficultyLevel}</td>
                      <td>
                        <AiFillDelete
                          onClick={() => deleteProblem(problem.problemId)}
                        />
                        &nbsp;&nbsp;
                        <FaEdit
                          onClick={() => {
                            setUpdateProblem(index);
                            setUpdateProblemTrigger(index);
                          }}
                        />
                      </td>
                    </tr>
                    <div
                      className="showPhotos"
                      style={{
                        display: updateProblem === index ? "block" : "none",
                      }}
                    >
                      <button
                        onClick={() => {
                          setUpdateProblem(null);
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
                      <ProblemUpdate data={problem} />
                    </div>
                  </>
                );
              })}
          </tbody>
        </table>

        <div
          className="view_more__button"
          style={{
            display: show && ProblemData.length > 10 ? "block" : "none",
          }}
        >
          <button onClick={showMoreItems}>View More</button>
        </div>
      </div>
    </div>
  );
};

export default Problem;
