import React, { useEffect, useState } from "react";
import "../forms.css";
import {
  errorNotification,
  successNotification,
  customSelectStyles,
} from "../../../utils";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

const AddProblem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [tagList, setTagList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Tab") {
      event.preventDefault();

      if (inputValue.trim() !== "") {
        const newTag = { value: inputValue, label: inputValue };

        if (!tagList.some((tag) => tag.value === newTag.value)) {
          setTagList((prevTags) => [...prevTags, newTag]);
        }
        setInputValue("");
      }
    }
  };

  const handleInputChange = (input) => {
    setInputValue(input);
  };

  useEffect(() => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/tags`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setTagList(data.map((e) => ({ value: e.name, label: e.name })));
      })
      .catch((err) => console.log(err));
  }, []);

  const ProblemPOSTRequest = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/problems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          constraints,
          difficultyLevel,
        }),
      });

      if (response.ok) {
        const problem = await response.json();
        successNotification("Problem uploaded successfully");
        return problem.problemId;
      } else {
        errorNotification("Error uploading Problem");
        return null;
      }
    } catch (error) {
      errorNotification("Error uploading Problem");
      return null;
    }
  };

  const ProblemPUTRequest = async (problemId) => {
    try {
      if (!problemId || !selectedTags) {
        return;
      }

      const tagObjects = selectedTags.map((tag) => ({ name: tag.value }));

      await fetch(`${process.env.REACT_APP_BASE_URL}/problems/${problemId}/tags`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: tagObjects }),
      });
    } catch (error) {
      errorNotification("Something Went Wrong");
    }
  };

  const handleTagChange = (selectedOptions, action) => {
    setSelectedTags(selectedOptions);

    // Check if the user is typing a new tag
    if (action.action === "input-change" && action.inputValue) {
      const newTag = { value: action.inputValue, label: action.inputValue };

      // Add the new tag to the tagList if not present
      if (!tagList.some((tag) => tag.value === newTag.value)) {
        setTagList((prevTags) => [...prevTags, newTag]);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !constraints || !difficultyLevel) {
      errorNotification("Add a problem");
      return;
    }

    const problemId = await ProblemPOSTRequest();
    ProblemPUTRequest(problemId);
  };

  return (
    <div className="main-container">
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <ToastContainer />
          <h1>Add Problem</h1>
          <div className="form-group">
            <label htmlFor="title">Problem Title *</label>
            <input
              className="form-control"
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title"
              required
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              id="description"
              placeholder="Enter Problem Description"
              required
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: "vertical", minHeight: "100px" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="constraints">Constraints *</label>
            <textarea
              className="form-control"
              type="text"
              name="constraints"
              id="constraints"
              placeholder="Enter Problem Constraints"
              required
              style={{ resize: "vertical", minHeight: "100px" }}
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
            <label htmlFor="tag">Select Tag:</label>
            <Select
              id="tag"
              value={selectedTags}
              isMulti
              options={tagList}
              styles={customSelectStyles}
              onChange={handleTagChange}
              onKeyDown={handleKeyDown}
              onInputChange={handleInputChange}
              isSearchable={true}
            />
          </div>

          <button className="submit-btn" type="submit">
            Add Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
