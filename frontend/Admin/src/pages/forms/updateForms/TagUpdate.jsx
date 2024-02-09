import React, { useState } from "react";
import "../forms.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {
  errorNotification,
  successNotification,
} from "../../../utils";

const TagUpdate = (props) => {
  const [name, setName] = useState(props.data.name);
  // PUT Request Starts
  const PutRequest = (id) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/tags/${id}`, {
        name,
        problem: { problemId: props.problemId },
      })
      .then(() => {
        successNotification("Tag Updated Successfully");
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
            <h1>Update Tag</h1>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                autoComplete="off"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <button
              className="submit-btn"
              type="submit"
              onClick={() => PutRequest(props.data.tagId)}
            >
              Update Tag
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default TagUpdate;
