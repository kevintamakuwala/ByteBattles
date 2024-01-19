import React, { useEffect, useState } from "react";
import "./forms.css";
import { errorNotification, successNotification } from "../../utils";
import { ToastContainer } from "react-toastify";

const ProblemForm = () => {
  const [problemTitle, setProblemTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");

  // Post Request Starts
  const handleSubmit = async (event) => {
    event.preventDefault();

    const problemData = {
      title: problemTitle,
      description: description,
      constraints: constraints,
      difficultyLevel: difficultyLevel,
    };

    try {
      await fetch("http://localhost:8000/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(problemData),
      });
      successNotification("Problem uploaded successfully");
    } catch (error) {
      errorNotification("Error uploading Problem");
    }
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
              onChange={(e) => setProblemTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <input
              className="form-control"
              type="text"
              name="description"
              id="description"
              placeholder="Enter Problem Description"
              required
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="constraints">Constraints *</label>
            <textarea
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                fontSize: "14px",
                resize: "none",
                background: "white",
                borderRadius: "4px",
                border: "1px solid silver",
                margin: "10px 0 18px 0",
                padding: "0 10px",
              }}
              type="text"
              name="constraints"
              id="constraints"
              placeholder="Enter Problem Constraints"
              required
              rows={5}
              onChange={(e) => setConstraints(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="difficultyLevel">Difficulty Level *</label>
            <input
              className="form-control"
              type="dropdown"
              name="difficultyLevel"
              list="difficultyLevels"
              value={difficultyLevel}
              id="difficultyLevel"
              placeholder="Select difficulty Level"
              autoComplete="off"
              onChange={(e) => {
                setDifficultyLevel(e.target.value);
              }}
            />
            <datalist id="difficultyLevels">
              {["easy", "medium", "hard"].map((difficultyLevel, index) => {
                return (
                  <option key={index} value={difficultyLevel}>
                    {difficultyLevel}
                  </option>
                );
              })}
            </datalist>
          </div>

          <button className="submit-btn" onClick={handleSubmit} type="submit">
            Add Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProblemForm;
