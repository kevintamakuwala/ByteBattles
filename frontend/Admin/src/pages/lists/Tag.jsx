import React, { useState, useEffect } from "react";
import "./Page.css";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  errorNotification,
  successNotification,
  customListSelectStyles,
} from "../../utils";
import { ToastContainer } from "react-toastify";
import TagUpdate from "../forms/updateForms/TagUpdate";
import Select from "react-select";
const Tag = () => {
  // Getting Tag details
  const [tagsData, setTagsData] = useState([]);

  const getTags = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/tags`, requestOption)
      .then((res) => res.json())
      .then((data) => setTagsData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTags();
  }, []);

  // Getting problem details
  const [problemData, setProblemData] = useState([]);

  useEffect(() => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/problems/`, requestOption)
      .then((res) => res.json())
      .then((data) => setProblemData(data))
      .catch((err) => console.log(err));
  }, []);

  // table header data
  const tableHeaders = ["Tag Id", "Name", "Action"];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = tagsData.length;

  const showMoreItems = () => {
    if (visible < length) {
      setVisible((prevValue) => prevValue + 10);
    } else {
      setShow(false);
    }
  };

  // Deleting Tag
  const deleteTag = (id) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/tags/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getTags();
        successNotification("Tag Deleted Successfully");
        window.location.reload()
      })
      .catch(() => errorNotification("Something went wrong"));
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

    const results = selectedProblemData?.tagList?.filter(
      (item) =>
        item.tagId
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };
  // useStates of update Tag
  const [updateTag, setUpdateTag] = useState(null);

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
              {selectedProblemData && selectedProblemData["tagList"] ? (
                (searchTerm.length !== 0
                  ? searchResults
                  : selectedProblemData["tagList"]
                ).map((tag, index) => (
                  <>
                    <tr key={index}>
                      <td>{tag.tagId}</td>
                      <td>{tag.name}</td>
                      <td>
                        <AiFillDelete
                          onClick={() => {
                            deleteTag(tag.tagId);
                          }}
                        />
                        &nbsp;&nbsp;
                        <FaEdit
                          onClick={() => {
                            setUpdateTag(index);
                          }}
                        />
                      </td>
                    </tr>
                    <div
                      className="showPhotos"
                      style={{
                        display: updateTag === index ? "block" : "none",
                      }}
                    >
                      <button
                        onClick={() => {
                          setUpdateTag(null);
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
                      <TagUpdate
                        data={tag}
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
              display:
                show && selectedProblemData.length > 10 ? "block" : "none",
            }}
          >
            <button onClick={showMoreItems}>View More</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tag;
