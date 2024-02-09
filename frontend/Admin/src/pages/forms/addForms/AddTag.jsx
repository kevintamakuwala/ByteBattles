import React, { useState, useEffect } from "react";
import {
  errorNotification,
  successNotification,
  customSelectStyles
} from "../../../utils";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

const AddTag = () => {
  // State for form fields
  const [selectedProblem, setSelectedProblem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState();
  const [problemData, setProblemData] = useState([{}]);
  const [problemNames, setProblemNames] = useState([]);

  // Sample list of existing tags and problems
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

    fetch(`${process.env.REACT_APP_BASE_URL}/problems`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setProblemData(data);
        setProblemNames(data.map((e) => e.title));
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedTags.length === 0) {
      errorNotification("Add a Tag");
      return;
    }

    if (!selectedProblem) {
      await Promise.all(
        selectedTags.map(async (tag) => {
          await TagPOSTRequest(tag.value);
        })
      );
    } else {
      await ProblemPUTRequest(await getProblemId(selectedProblem));
    }
  };

  const TagPOSTRequest = async (name) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (response.ok) {
        await response.json();
        successNotification("Tag uploaded successfully");
      } else {
        errorNotification("Error uploading Tag");
      }
    } catch (error) {
      errorNotification("Error uploading Tag");
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
      successNotification("Tag (s) added to the problem");

    } catch (error) {
      errorNotification("Something Went Wrong");
    }
  };

  const getProblemId = (selectedProblem) => {
    const foundProblem = problemData.find((e) => e.title === selectedProblem);
    if (foundProblem) {
      setSelectedProblemId(foundProblem.problemId);
      return foundProblem.problemId;
    }
    return null;
  };
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

  return (
    <div className="main-container">
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <ToastContainer />
          <h1>Add Tag</h1>

          <div className="form-group" style={{ margin: "1rem 0" }}>
            <label htmlFor="problem">Select Problem *</label>
            <Select
              id="problem"
              value={{ value: selectedProblem, label: selectedProblem }}
              options={problemNames.map((problem) => ({
                value: problem,
                label: problem,
              }))}
              onChange={(problem) => {
                setSelectedProblem(problem.value);
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
            Add Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTag;
