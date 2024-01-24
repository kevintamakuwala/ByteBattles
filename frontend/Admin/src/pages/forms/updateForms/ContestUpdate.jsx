import React, { useEffect, useState } from "react";
import "../forms.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {
  BASE_URL,
  errorNotification,
  minMaxTime,
  successNotification,
} from "../../../utils";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContestUpdate = (props) => {
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);
  

  const [startTimeFormatted, setStartTimeFormatted] = useState(props.data.startTime);
  const [endTimeFormatted, setEndTimeFormatted] = useState(props.data.endTime);
  const [startTime, setStartTime] = useState(new Date(...startTimeFormatted));
  const [endTime, setEndTime] = useState(new Date(...endTimeFormatted));
  
  // PUT Request Starts
  const PutRequest = (id) => {
    axios
      .put(`${BASE_URL}/contests/${id}`, {
        title,
        description,
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
      })
      .then(() => {
        successNotification("Contest Updated Successfully");
      })
      .catch(() => {
        errorNotification("Something Went Wrong");
      });
  };

  const handleStartTimeChange = (date) => {
    const startTime = [
      date?.getFullYear(),
      date?.getMonth() + 1,
      date?.getDate(),
      date?.getHours(),
      date?.getMinutes(),
    ];
    setStartTimeFormatted(startTime);
    setStartTime(date);
  };

  const handleEndTimeChange = (date) => {
    const endTime = [
      date?.getFullYear(),
      date?.getMonth() + 1,
      date?.getDate(),
      date?.getHours(),
      date?.getMinutes(),
    ];
    setEndTimeFormatted(endTime);
    setEndTime(date);
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form>
            <ToastContainer />
            <h1>Contest</h1>
            <div className="form-group">
              <label htmlFor="title">Contest Title *</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                autoComplete="off"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
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
            {/* 
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
            </div> */}
            <div className="form-group">
              <label htmlFor="startTime">Start Time *</label>
              <br />
              <DatePicker
                selected={startTime}
                onChange={handleStartTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                minDate={new Date()}
                minTime={minMaxTime(startTime)[0]}
                maxTime={minMaxTime(startTime)[1]}
                isValidDate={(selectedDate) => selectedDate >= new Date()}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endTime">End Time *</label>
              <br />
              <DatePicker
                selected={endTime}
                onChange={handleEndTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                minDate={new Date()}
                minTime={minMaxTime(endTime)[0]}
                maxTime={minMaxTime(endTime)[1]}
                isValidDate={(selectedDate) => selectedDate >= new Date()}
              />
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={() => PutRequest(props.data.contestId)}
            >
              Update Contest
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContestUpdate;
