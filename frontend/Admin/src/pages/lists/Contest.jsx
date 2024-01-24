import React, { useEffect, useState } from "react";
import "./Page.css";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BASE_URL, formatDate, requestOption } from "../../utils";
import ContestUpdate from "../forms/updateForms/ContestUpdate";

const Problem = () => {
  // update Contest use state variables
  const [updateContesttrigger, setUpdateContestTrigger] = useState(null);
  const [updateContest, setUpdateContest] = useState(null);

  // Getting Contest details
  const [contestData, setContestData] = useState([]);

  const getContest = () => {
    fetch(`${BASE_URL}/contests`, requestOption)
      .then((res) => res.json())
      .then((data) => setContestData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getContest();
  }, []);

  //  Deleting Contest
  const deleteContest = (id) => {
    fetch(`${BASE_URL}/contests/${id}`, {
      method: "DELETE",
    })
      .then(() => getContest())
      .catch((err) => console.log(err));
  };

  // table header data
  const tableHeaders = [
    "Contest Id",
    "Title",
    "Description",
    "Start Time",
    "End Time",
    "Problems",
    "Action",
  ];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = contestData.length;

  const showMoreItems = () => {
    if (visible < length) {
      setVisible((prevValue) => prevValue + 10);
    } else {
      setShow(false);
    }
  };

  // Handling Searchbar events
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const results = contestData.filter(
      (item) =>
        item.contestId
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.problemSet.some((problem) =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setSearchResults(results);
  };
  return (
    <div className="main_list__container">
      <div className="mini_navbar__container">
        <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="list__container">
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(searchTerm.length !== 0 ? searchResults : contestData)
              .slice(0, visible)
              .map((contest, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{contest.contestId}</td>
                      <td>{contest.title}</td>
                      <td>{contest.description}</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: formatDate(contest.startTime),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: formatDate(contest.endTime),
                        }}
                      ></td>

                      <td>
                        {contest.problemSet.map((problem, index) => {
                          return <div key={index}>{problem.title}</div>;
                        })}
                      </td>
                      <td>
                        <AiFillDelete
                          onClick={() => deleteContest(contest.contestId)}
                        />
                        &nbsp;&nbsp;
                        <FaEdit
                          onClick={() => {
                            setUpdateContest(index);
                            setUpdateContestTrigger(index);
                          }}
                        />
                      </td>
                    </tr>
                    <div
                      className="showPhotos"
                      style={{
                        display: updateContest === index ? "block" : "none",
                      }}
                    >
                      <button
                        onClick={() => {
                          setUpdateContest(null);
                        }}
                        style={{
                          padding: "0.7rem 1.2rem",
                          borderRadius: "10px",
                          color: "white",
                          backgroundColor: "#512DC8",
                        }}
                      >
                        Close
                      </button>
                      <ContestUpdate data={contest} />
                    </div>
                  </>
                );
              })}
          </tbody>
        </table>

        <div
          className="view_more__button"
          style={{
            display: show && contestData.length > 10 ? "block" : "none",
          }}
        >
          <button onClick={showMoreItems}>View More</button>
        </div>
      </div>
    </div>
  );
};

export default Problem;
