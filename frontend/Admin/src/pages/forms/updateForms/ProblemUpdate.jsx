import React, { useEffect, useState } from "react";
import "../forms.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {
  BASE_URL,
  errorNotification,
  customSelectStyles,
  successNotification,
  requestOption,
} from "../../../utils";
import Select from "react-select";

const ProblemUpdate = (props) => {
  const [problemTitle, setProblemTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [constraints, setConstraints] = useState(props.data.constraints);
  const [difficultyLevel, setDifficultyLevel] = useState(
    props.data.difficultyLevel
  );

  const [selectedTagNames, setSelectedTagNames] = useState(
    props.data.tagList.map((tag) => tag.name)
  );
  const [allTagNames, setAllTagNames] = useState([]);
  const [tagData, setTagData] = useState([]);

  // Fetching all tags
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = () => {
    fetch(`${BASE_URL}/tags`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setTagData(data);
        setAllTagNames(data.map((tag) => tag.name));
      })
      .catch((err) => console.log(err));
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTagNames(selectedOptions.map((option) => option.value));
  };

  const handleTagRemove = (removedTitle) => {
    setAllTagNames((prevTitles) => [...prevTitles, removedTitle]);
    setSelectedTagNames((prevSelected) =>
      prevSelected.filter((title) => title !== removedTitle)
    );
  };

  // PUT Request Starts
  const PutRequest = (id) => {
    const filteredTagData = tagData.filter((tag) =>
      selectedTagNames.includes(tag.name)
    );
    const data = {
      title: problemTitle,
      description,
      constraints,
      difficultyLevel,
      tagList: filteredTagData.length > 0 ? filteredTagData : null,
    };
    axios
      .put(`${BASE_URL}/problems/${id}`, data)
      .then(() => {
        successNotification("Problem Updated Successfully");
      })
      .catch(() => {
        errorNotification("Something Went Wrong");
      });
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form>
            <ToastContainer />
            <h1>Problem</h1>
            <div className="form-group">
              <label htmlFor="title">Problem Title *</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                autoComplete="off"
                value={problemTitle}
                onChange={(e) => {
                  setProblemTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <input
                className="form-control"
                type="text"
                name="description"
                id="description"
                value={description}
                placeholder="Enter Description"
                autoComplete="off"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="constraints">Constraints *</label>
              <input
                className="form-control"
                type="text"
                name="constraints"
                id="constraints"
                value={constraints}
                placeholder="Enter Constraints"
                autoComplete="off"
                onChange={(e) => setConstraints(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ margin: "1rem 0" }}>
              <label htmlFor="difficultyLevel">Difficulty Level *</label>
              <Select
                id="difficultyLevel"
                value={{ value: difficultyLevel, label: difficultyLevel }}
                options={["easy", "medium", "hard"].map((difficultyLevel) => ({
                  value: difficultyLevel,
                  label: difficultyLevel,
                }))}
                onChange={(selectedDifficultyLevel) => {
                  setDifficultyLevel(selectedDifficultyLevel.value);
                }}
                styles={customSelectStyles}
              />
            </div>
            
            <div className="form-group" style={{ margin: "1rem 0" }}>
              <label htmlFor="tag">Select Tags:</label>
              <Select
                id="tag"
                value={selectedTagNames.map((name) => ({
                  value: name,
                  label: name,
                }))}
                isMulti
                options={allTagNames.map((name) => ({
                  value: name,
                  label: name,
                }))}
                styles={customSelectStyles}
                onChange={handleTagChange}
                isSearchable={true}
                onRemove={handleTagRemove}
              />
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={() => PutRequest(props.data.problemId)}
            >
              Update Problem
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ProblemUpdate;
