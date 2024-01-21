import React, { useEffect, useState } from "react";
import "../forms.css";
import {
  BASE_URL,
  errorNotification,
  successNotification,
  customSelectStyles,
} from "../../../utils";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

const AddTestcase = () => {
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  const [selectedProblemTitle, setSelectedProblemTitle] = useState("");

  // Getting Problems
  const [problemData, setProblemData] = useState([]);
  useEffect(() => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}/problems`, requestOption)
      .then((res) => res.json())
      .then((data) => setProblemData(data))
      .catch((err) => console.log(err));
  }, []);

  // Post Request Starts
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch(`${BASE_URL}/testcases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
          expectedOutput,
          problem: {
            problemId: problemData.find(
              (problem) => problem?.title === selectedProblemTitle
            )?.problemId,
          },
        }),
      });
      successNotification("Testcase uploaded successfully");
    } catch (error) {
      errorNotification("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form method="post" onSubmit={handleSubmit}>
            <ToastContainer />
            <h1>Add Testcase</h1>

            <div className="form-group">
              <label htmlFor="problem">Select Problem *</label>
              <Select
                id="problem"
                value={
                  selectedProblemTitle
                    ? {
                        value: selectedProblemTitle,
                        label: selectedProblemTitle,
                      }
                    : null
                }
                options={problemData.map((problem) => ({
                  value: problem.title,
                  label: problem.title,
                }))}
                onChange={(selectedOption) => {
                  setSelectedProblemTitle(selectedOption.value);
                }}
                styles={customSelectStyles}
              />
            </div>
            <div className="form-group">
              <label htmlFor="input">Input *</label>
              <textarea
                className="form-control"
                name="input"
                id="input"
                placeholder="Enter Input"
                style={{ resize: "vertical", minHeight: "100px" }} // Example inline CSS
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expectedOutput">Expected Output *</label>
              <textarea
                className="form-control"
                name="expectedOutput"
                id="expectedOutput"
                placeholder="Enter Expected Output"
                style={{ resize: "vertical", minHeight: "100px" }} // Example inline CSS
                onChange={(e) => setExpectedOutput(e.target.value)}
              />
            </div>

            <button
              className="submit-btn"
              onSubmit={handleSubmit}
              type="submit"
            >
              Add Testcase
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTestcase;
