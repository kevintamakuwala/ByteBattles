import React, { useEffect, useState } from "react";
import "./Page.css";
import { Link } from "react-router-dom";

import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import SpaUpdate from "./forms/updateForms/SpaUpdate";
import Switch from "@mui/material/Switch";
import axios from "axios";

const Spa = () => {
  // update spa use state variables
  const [updatespatrigger, setUpdateSpaTrigger] = useState(null);
  const [updatespa, setUpdateSpa] = useState(null);

  // Getting spa details
  const [SpaData, setSpaData] = useState([]);

  const getSpa = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8080/api/v1/spas", requestOption)
      .then((res) => res.json())
      .then((data) => setSpaData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSpa();
  }, []);

  //  Deleting Spa Data
  const deleteSpa = (id) => {
    console.log("delete called");
    fetch(`http://localhost:8080/api/v1/spas/${id}`, {
      method: "DELETE",
    })
      .then(() => getSpa())
      .catch((err) => console.log(err));
  };

  // table header data
  const tableHeaders = [
    "Name",
    "Phone No.",
    "Address",
    "Landmark",
    "Close/Open",
    "More",
    "Verified",
    "Top Rated",
    "Premium",
    "Luxurious",
    "Action",
  ];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = SpaData.length;

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

    const results = SpaData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.landmark.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  // Handling the more button
  const [expandedRow, setExpandedRow] = useState(null);
  const [isDropdown, setIsDropdown] = useState(null);

  // PUT Requests for Switches!!!
  // Updating status button
  const statusSwitch = (id, currentStatus) => {
    axios
      .put(`http://localhost:8080/api/v1/spas/${id}`, {
        open: currentStatus,
      })
      .then((res) => {
        console.log(res.data);
        alert("updated Spa Status");
      })
      .then(() => getSpa())
      .catch((error) => {
        alert(JSON.stringify(error.response));
      });
  };

  // Updating verify button
  const verifySwitch = (id, currentStatus) => {
    axios
      .put(`http://localhost:8080/api/v1/spas/${id}`, {
        verified: currentStatus,
      })
      .then((res) => {
        console.log(res.data);
        alert("updated Verified Spa");
      })
      .then(() => getSpa())
      .catch((error) => {
        alert(JSON.stringify(error.response));
      });
  };

  // Updating topRated button
  const topRatedSwitch = (id, currentStatus) => {
    axios
      .put(`http://localhost:8080/api/v1/spas/${id}`, {
        topRated: currentStatus,
      })
      .then((res) => {
        console.log(res.data);
        alert("updated Top Rated Spa");
      })
      .then(() => getSpa())
      .catch((error) => {
        alert(JSON.stringify(error.response));
      });
  };

  // Updating premium button
  const premiumSwitch = (id, currentStatus) => {
    axios
      .put(`http://localhost:8080/api/v1/spas/${id}`, {
        premium: currentStatus,
      })
      .then((res) => {
        console.log(res.data);
        alert("Updated Premium Spa");
      })
      .then(() => getSpa())
      .catch((error) => {
        alert(JSON.stringify(error.response));
      });
  };

  // Updating luxurious button
  const luxuriousSwitch = (id, currentStatus) => {
    axios
      .put(`http://localhost:8080/api/v1/spas/${id}`, {
        luxurious: currentStatus,
      })
      .then((res) => {
        console.log(res.data);
        alert("Updated Luxurious Spa");
      })
      .then(() => getSpa())
      .catch((error) => {
        alert(JSON.stringify(error.response));
      });
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
            {(searchTerm.length !== 0 ? searchResults : SpaData)
              .slice(0, visible)
              .map((spa, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{spa.name}</td>
                      <td>{spa.mobileNumber}</td>
                      <td>{spa.address}</td>
                      <td>{spa.landmark}</td>
                      <td>
                        <Switch
                          checked={spa.open}
                          onChange={() => {
                            statusSwitch(spa._id, !spa.open);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </td>
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
                        <Switch
                          checked={spa.verified}
                          onChange={() => {
                            verifySwitch(spa._id, !spa.verified);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </td>
                      <td>
                        <Switch
                          checked={spa.topRated}
                          onChange={() => {
                            topRatedSwitch(spa._id, !spa.topRated);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </td>
                      <td>
                        <Switch
                          checked={spa.premium}
                          onChange={() => {
                            premiumSwitch(spa._id, !spa.premium);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </td>
                      <td>
                        <Switch
                          checked={spa.luxurious}
                          onChange={() => {
                            luxuriousSwitch(spa._id, !spa.luxurious);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </td>
                      <td>
                        <AiFillDelete onClick={() => deleteSpa(spa._id)} />
                        &nbsp;&nbsp;
                        {/* {console.log(spa._id)} */}
                        <FaEdit
                          onClick={() => {
                            setUpdateSpa(index);
                            setUpdateSpaTrigger(index);
                          }}
                        />
                      </td>
                    </tr>
                    <div
                      className="showPhotos"
                      style={{
                        display: updatespa === index ? "block" : "none",
                      }}
                    >
                      <button
                        onClick={() => {
                          setUpdateSpa(null);
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
                      <SpaUpdate data={spa} />
                    </div>

                    <div
                      className="more_spa_detail__container"
                      style={{
                        display: expandedRow === index ? "block" : "none",
                      }}
                    >
                      <div className="image__container">
                        <img src={spa.imgUrl} alt="" />
                        {/* <img src={spa.mulImgUrl[0]} alt="" />
                        <img src={spa.mulImgUrl[1]} alt="" />
                        <img src={spa.mulImgUrl[2]} alt="" /> */}
                        {spa.mulImgUrl.map((img, index) => {
                          return <img src={img} key={index} alt="img" />;
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
          </tbody>
        </table>

        <div
          className="view_more__button"
          style={{ display: show && SpaData.length > 10 ? "block" : "none" }}
        >
          <button onClick={showMoreItems}>View More</button>
        </div>
      </div>
    </div>
  );
};

export default Spa;
