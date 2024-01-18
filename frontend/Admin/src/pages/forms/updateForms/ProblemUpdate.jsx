import React, { useEffect, useState } from "react";
import "../forms.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { errorNotification, successNotification } from "../../../utils";
const ProblemUpdate = (props) => {
  const [problemTitle, setProblemTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  const [constraints, setConstraints] = useState(props.data.constraints);
  const [difficultyLevel, setDifficultyLevel] = useState(
    props.data.difficultyLevel
  );

  // PUT Request Starts
  const PutRequest = (id) => {
    axios
      .put(`http://localhost:8000/problems/${id}`, {
        title: problemTitle,
        description: description,
        constraints: constraints,
        difficultyLevel: difficultyLevel,
      })
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

            {/* <div className="form-group">
            <label htmlFor="timings">Timings *</label>
            <div className="time-container">
              <div className="from-time">
                <label htmlFor="fromTime">From</label>
                <input
                  className="form-control timings"
                  type="time"
                  name="timings"
                  id="timings"
                  placeholder="Enter Timings"
                  value={openTime}
                  autoComplete="off"
                  onChange={(e) => setOpenTime(e.target.value)}
                />
              </div>
              <div className="to-time">
                <label htmlFor="toTime">To</label>
                <input
                  className="form-control timings"
                  type="time"
                  name="timings"
                  id="timings"
                  placeholder="Enter Timings"
                  value={closeTime}
                  autoComplete="off"
                  onChange={(e) => setCloseTime(e.target.value)}
                />
              </div>
            </div>
          </div> */}

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

            {/* <div className="form-group">
            <label htmlFor="area">Area *</label>
            <input
              className="form-control"
              type="dropdown"
              name="area"
              list="areas"
              id="area"
              value={area}
              placeholder="Select Area"
              autoComplete="off"
              onChange={(e) => setArea(e.target.value)}
            />

            <datalist
              id="areas"
              onChange={(e) => {
                setArea(e.target.value);
              }}
            >
              <option value={area}>--select--</option>
              {areaList.map((area) => {
                return (
                  <>
                    <option value={area.name}>{area.name}</option>
                  </>
                );
              })}
            </datalist>
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug *</label>
            <input
              className="form-control"
              type="text"
              name="text"
              id="slug"
              value={slug}
              placeholder="Enter slug"
              autoComplete="off"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="aboutUs">About Us *</label>
            <input
              className="form-control"
              type="text"
              name="text"
              id="aboutUs"
              value={aboutUs}
              placeholder="Enter slug"
              autoComplete="off"
              onChange={(e) => setAboutUs(e.target.value)}
            />
          </div> */}

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
