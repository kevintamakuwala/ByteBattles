import React, { useEffect, useState } from "react";
import "./Page.css";

import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const Offer = () => {
  // Getting offer data
  const [offersData, setOffersData] = useState([]);
  const getOffer = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8080/api/v1/offer", requestOption)
      .then((res) => res.json())
      .then((data) => setOffersData(data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOffer();
  }, []);

  // Deleting Offers Data
  const deleteOffer = (id) => {
    console.log("delete called");
    fetch(`http://localhost:8080/api/v1/Offer/${id}`, {
      method: "DELETE",
    })
      .then(() => getOffer())
      .catch((err) => console.log(err));
  };

  // table header data
  const tableHeaders = [
    "Offer Name",
    "Spa Name",
    "Priority",
    "Slug",
    // "Active",
    "More",
    "Action",
  ];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = offersData.length;

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

    const results = offersData.filter(
      (item) =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Select_Spa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  // Handling the more button
  const [expandedRow, setExpandedRow] = useState(null);
  const [isDropdown, setIsDropdown] = useState(null);

  return (
    <div className="main_list__container">
      <div className="mini_navbar__container">
        <form class="d-flex" onSubmit={(e) => e.preventDefault()}>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button class="btn btn-outline-success" type="submit">
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
            {(searchTerm.length !== 0 ? searchResults : offersData)
              .slice(0, visible)
              .map((spa, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{spa.Name}</td>
                      <td>{spa.Select_Spa}</td>
                      <td>{spa.Priority}</td>
                      <td>{spa.Slug}</td>
                      {/* <td>
                        <div class="form-check form-switch">
                          <label
                            class="form-check-label"
                            for="flexSwitchCheckDefault"
                          ></label>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </td> */}
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
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => deleteOffer(spa._id)}
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
                        <img src={spa.imageUrl} alt="spaImage" />
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

export default Offer;
