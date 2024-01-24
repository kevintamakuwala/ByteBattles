import React, { useEffect, useState } from "react";
import "../forms.css";
import {
  BASE_URL,
  errorNotification,
  successNotification,
  customSelectStyles,
  minMaxTime,
} from "../../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

const AddContest = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [problemList, setProblemList] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);

  const [startTimeFormatted, setStartTimeFormatted] = useState();
  const [endTimeFormatted, setEndTimeFormatted] = useState();

  useEffect(() => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}/problems`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setProblemList(data.map((e) => ({ value: e.title, label: e.title })));
      })
      .catch((err) => console.log(err));
  }, []);

  const ContestPOSTRequest = async () => {
    if (startTime <= new Date() || endTime <= new Date()) {
      setStartTime(new Date());
      setEndTime(new Date());
      errorNotification("Enter a Valid Time");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/contests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          startTime: startTimeFormatted,
          endTime: endTimeFormatted,
        }),
      });

      if (response.ok) {
        const contest = await response.json();
        successNotification("Contest uploaded successfully");
        return contest.contestId;
      } else {
        errorNotification("Error uploading Contest");
        return null;
      }
    } catch (error) {
      errorNotification("Error uploading Contest");
      return null;
    }
  };

  const ContestPUTRequest = async (contestId) => {
    try {
      if (!contestId || !selectedProblems) {
        return;
      }

      let problemObjects = [];
      problemObjects = selectedProblems.map((problem) => ({
        title: problem.value,
      }));

      await fetch(`${BASE_URL}/contests/${contestId}/problems/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problems: problemObjects }),
      });
    } catch (error) {
      errorNotification("Something Went Wrong");
    }
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
  
  const handleProblemChange = (selectedOptions) => {
    setSelectedProblems(selectedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !startTime || !endTime) {
      errorNotification("Add a Contest");
      return;
    }

    const contestId = await ContestPOSTRequest();
    ContestPUTRequest(contestId);
  };

  return (
    <div className="main-container">
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <ToastContainer />
          <h1>Add Contest</h1>
          <div className="form-group">
            <label htmlFor="title">Contest Title *</label>
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
            <input
              className="form-control"
              type="text"
              name="description"
              id="description"
              placeholder="Enter Contest Description"
              required
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

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

          <div className="form-group" style={{ margin: "1rem 0" }}>
            <label htmlFor="problem">Select Problem:</label>
            <Select
              id="problem"
              value={selectedProblems}
              isMulti
              options={problemList}
              styles={customSelectStyles}
              onChange={handleProblemChange}
            />
          </div>

          <button className="submit-btn" type="submit">
            Add Contest
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContest;
