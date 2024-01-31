import React, { useState } from "react";
import "../forms.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {
  errorNotification,
  successNotification,
  BASE_URL,
} from "../../../utils";

const TestcaseUpdate = (props) => {
  const [input, setInput] = useState(props.data.input);
  const [expectedOutput, setExpectedOutput] = useState(
    props.data.expectedOutput
  );

  // PUT Request Starts
  const PutRequest = (id) => {
    axios
      .put(`${BASE_URL}/testcases/${id}`, {
        input,
        expectedOutput,
        problem: { problemId: props.problemId },
      })
      .then(() => {
        successNotification("Testcase Updated Successfully");
      })
      .catch((err) => {
        alert(err);
        errorNotification("Something Went Wrong");
      });
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form>
            <ToastContainer />
            <h1>Testcase</h1>
            <div className="form-group">
              <label htmlFor="input">Input *</label>
              <textarea
                className="form-control"
                name="input"
                id="input"
                value={input}
                placeholder="Enter Input"
                style={{ resize: "vertical", minHeight: "100px" }} 
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expectedOutput">ExpectedOutput *</label>
              <textarea
                className="form-control"
                type="text"
                name="expectedOutput"
                id="expectedOutput"
                value={expectedOutput}
                placeholder="Enter Expected Output"
                autoComplete="off"
                style={{ resize: "vertical", minHeight: "100px" }} 
                onChange={(e) => setExpectedOutput(e.target.value)}
              />
            </div>

            <button
              className="submit-btn"
              type="submit"
              onClick={() => PutRequest(props.data.testCaseId)}
            >
              Update Testcase
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default TestcaseUpdate;
