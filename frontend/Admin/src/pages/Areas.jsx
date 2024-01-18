import React, { useState, useEffect } from "react";
import "./Page.css";

import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import { AreasData } from "../data/mockData";

const Areas = () => {
  // table header data
  const tableHeaders = ["Area Name", "City", "Priority" /*"Actions"*/];
 

  

  // Getting area list
  const [areaData, setareaData] = useState([{}]);
  const [allAreaList, setAllAreaList] = useState([{}]);
  let uniqueAreaData = [];

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cities", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        const cityList = data;

        cityList.map((city) => areaFunction(city));

        setareaData(allAreaList);
      })
      .catch((err) => console.log(err));
  }, []);

  const areaFunction = (city) => {
    fetch(`http://localhost:8080/api/v1/cities/${city._id}/areas`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((cityAreaList) => {
        cityAreaList.map((area) =>
          allAreaList.push({
            cityName: city.name,
            areaName: area.name,
            areaPriority: area.Priority,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  for (let i = 1; i < areaData.length / 2; i++) {
    uniqueAreaData[i - 1] = areaData[i];
  }
   // Handling view more button
   const [visible, setVisible] = useState(10);
   const [show, setShow] = useState(true);
   const length = uniqueAreaData.length;
 
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

    const results = uniqueAreaData.filter(
      (item) =>
        item.areaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cityName.toLowerCase().includes(searchTerm.toLowerCase())
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
            {(searchTerm.length !== 0 ? searchResults : uniqueAreaData)
              .slice(0, visible)
              .map((area, index) => {
                return (
                  <tr key={index}>
                    <td>{area.areaName}</td>
                    <td>{area.cityName}</td>
                    <td>{area.areaPriority}</td>
                  </tr>
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

export default Areas;
