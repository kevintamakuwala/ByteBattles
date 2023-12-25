import React, { useEffect, useState } from "react";
import "./Page.css";

import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const Therapy = () => {
  // Getting Therapy Data
  const [TherapyData, setTherapyData] = useState([]);

  const getTherapy = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8080/api/v1/therapy", requestOption)
      .then((res) => res.json())
      .then((data) => setTherapyData(data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTherapy();
  }, []);

  // Deleting Therapy Data
  const deleteTherapy = (id) => {
    console.log("delete called");
    fetch(`http://localhost:8080/api/v1/therapy/${id}`, {
      method: "DELETE"
    })
      .then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
        });
      })
      .catch((err) => console.log(err));
      getTherapy();
  };

  // table header data
  const tableHeaders = ["Name", "Priority", "Slug", "More", "Actions"];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = TherapyData.length;

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

    const results = TherapyData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  // Handling the more button
  const [expandedRow, setExpandedRow] = useState(null);
  const [isDropdown, setIsDropdown] = useState(null);

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
            {(searchTerm.length !== 0 ? searchResults : TherapyData)
              .slice(0, visible)
              .map((therapy, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{therapy.Name}</td>
                      <td>{therapy.Priority}</td>
                      <td>{therapy.Slug}</td>
                      <td>
                        {isDropdown === null ? (
                          <IoIosArrowDropdown
                            onClick={() => {
                              setExpandedRow(index);
                              setIsDropdown(index);
                            }}
                          />
                        ) : (
                          <IoIosArrowDropup
                            onClick={() => {
                              setExpandedRow(null);
                              setIsDropdown(null);
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <AiFillDelete
                          onClick={() => deleteTherapy(therapy._id)}
                          style={{
                            cursor: "pointer",
                          }}
                        />
                        &nbsp;&nbsp;
                        <FaEdit />
                      </td>
                    </tr>

                    <div
                      className="more_spa_detail__container"
                      style={{
                        display: expandedRow === index ? "block" : "none",
                      }}
                    >
                      <div className="image__container">
                        {/* <img src={require(`../assets/${therapy.Image}`)} alt="" /> */}
                        Here image will appear
                      </div>
                    </div>
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

export default Therapy;
