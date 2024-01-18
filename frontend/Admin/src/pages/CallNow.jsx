import React, { useEffect, useState } from "react";
import "./Page.css";
import { AiFillDelete } from "react-icons/ai";


const CallNow = () => {
  // table header data
  const tableHeaders = [
    "Spa Name",
    "Url Slug",
    "Time",
    "Service",
    "Action"
  ];

  // Getting call logs data
  const [CallNowData, setCallNowData] = useState([{}])
  const getLogs = () => {
    fetch('http://localhost:8080/api/v1/logs', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => setCallNowData(data))
    .catch(err => console.log(err))
  }
  useEffect(() => {
    getLogs();
  }, [])
  

  // Delete logs
  const deleteLog = (id) => {
    fetch(`http://localhost:8080/api/v1/logs/${id}`, {
      method: 'DELETE'
    })
    .then(() => getLogs())
    .catch(err => console.log(err))
  }


  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = CallNowData.length;

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

    const results = CallNowData.filter(
      (item) =>
        item.spaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.urlSlug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    setSearchResults(results);
  };

  // Handling the more button

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
            {(searchTerm.length !== 0 ? searchResults : CallNowData)
              .slice(0, visible)
              .map((callnow, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{callnow.spaName}</td>
                      <td>{callnow.urlSlug}</td>
                      <td>{callnow.date}</td>
                      <td>{callnow.service}</td>
                      <td>
                      <AiFillDelete
                          onClick={() => deleteLog(callnow._id)}
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>

        <div
          className="view_more__button"
          style={{ display: show ? "block" : "none" }}
        >
          <button onClick={showMoreItems}>View More</button>
        </div>
      </div>
    </div>
  );
};

export default CallNow;
