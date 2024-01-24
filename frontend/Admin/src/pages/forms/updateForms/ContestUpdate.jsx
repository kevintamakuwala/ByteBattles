import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BASE_URL,
  customSelectStyles,
  errorNotification,
  minMaxTime,
  requestOption,
  successNotification,
} from "../../../utils";

const ContestUpdate = ({ data }) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [startTimeFormatted, setStartTimeFormatted] = useState(data.startTime);
  const [endTimeFormatted, setEndTimeFormatted] = useState(data.endTime);
  const [startTime, setStartTime] = useState(new Date(...startTimeFormatted));
  const [endTime, setEndTime] = useState(new Date(...endTimeFormatted));
  const [selectedProblemTitles, setSelectedProblemTitles] = useState(
    data.problemSet.map((problem) => problem.title)
  );
  const [allProblemTitles, setAllProblemTitles] = useState([]);
  const [problemData, setProblemData] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = () => {
    fetch(`${BASE_URL}/problems`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setProblemData(data);
        setAllProblemTitles(data.map((problem) => problem.title));
      })
      .catch((err) => console.log(err));
  };

  const handleProblemChange = (selectedOptions) => {
    setSelectedProblemTitles(selectedOptions.map((option) => option.value));
  };

  const handleProblemRemove = (removedTitle) => {
    setAllProblemTitles((prevTitles) => [...prevTitles, removedTitle]);
    setSelectedProblemTitles((prevSelected) =>
      prevSelected.filter((title) => title !== removedTitle)
    );
  };

  const PutRequest = (id) => {
    const filteredProblemData = problemData.filter((problem) =>
      selectedProblemTitles.includes(problem.title)
    );
    const data = {
      title,
      description,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
      problemSet: filteredProblemData.length > 0 ? filteredProblemData : null,
    };

    axios
      .put(`${BASE_URL}/contests/${id}`, data)
      .then(() => {
        successNotification("Contest Updated Successfully");
      })
      .catch(() => {
        errorNotification("Something Went Wrong");
      });
  };

  const handleDateTimeChange = (date, setter, formatter) => {
    const formattedDate = [
      date?.getFullYear(),
      date?.getMonth() + 1,
      date?.getDate(),
      date?.getHours(),
      date?.getMinutes(),
    ];
    setter(formattedDate);
    formatter(date);
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
                value={description}
                placeholder="Enter Description"
                autoComplete="off"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time *</label>
              <br />
              <DatePicker
                selected={startTime}
                onChange={(date) =>
                  handleDateTimeChange(date, setStartTimeFormatted, setStartTime)
                }
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
                onChange={(date) =>
                  handleDateTimeChange(date, setEndTimeFormatted, setEndTime)
                }
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
              <label htmlFor="problem">Select Problems:</label>
              <Select
                id="problem"
                value={selectedProblemTitles.map((title) => ({
                  value: title,
                  label: title,
                }))}
                isMulti
                options={allProblemTitles.map((title) => ({
                  value: title,
                  label: title,
                }))}
                styles={customSelectStyles}
                onChange={handleProblemChange}
                isSearchable={true}
                onRemove={handleProblemRemove}
              />
            </div>

            <button
              className="submit-btn"
              type="submit"
              onClick={() => PutRequest(data.contestId)}
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
