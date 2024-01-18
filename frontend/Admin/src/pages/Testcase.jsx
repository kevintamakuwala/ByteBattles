import React, { useState, useEffect } from "react";
import "./Page.css";

import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import ServiceUpdate from "./forms/updateForms/ServcieUpdate";

const Services = () => {
  // Getting services details
  const [servicesData, setServicesData] = useState([]);

  const getServices = () => {
    const requestOption = {
      method: "GET",
      header: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8080/api/v1/services", requestOption)
      .then((res) => res.json())
      .then((data) => setServicesData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getServices();
  }, []);

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

  //  Deleting Services Data starts
  const deleteServices = (id) => {
    console.log("delete called");
    fetch(`http://localhost:8080/api/v1/services/${id}`, {
      method: "DELETE",
    })
      .then(() => getServices())
      .catch((err) => console.log(err));
  };
  // delete services ends

  // table header data
  const tableHeaders = [
    "Service Name",
    "category",
    "price",
    "time",
    "discount",
    "description",
    "Action",
  ];

  // Handling view more button
  const [visible, setVisible] = useState(10);
  const [show, setShow] = useState(true);
  const length = servicesData.length;

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

    const results = SpaServices.filter(
      (item) =>
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  // handling dropdown list of spa name
  const [SpaServices, setSpaServices] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const spaNames = SpaData.map((spa) => spa.name);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // useStates of update spa
  const [updatespa, setUpdatespa] = useState(null);

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

        <div className="form-group">
          <select
            placeholder="Select Spa"
            value={selectedOption}
            onChange={handleChange}
            style={{
              width: "10rem",
            }}
          >
            <option value={""}>--select--</option>
            {/* {console.log(spaNames)} */}
            {spaNames.map((name, index) => {
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          <p>Selected Option: {selectedOption}</p>
        </div>
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
            {(searchTerm.length !== 0 ? searchResults : servicesData)
              .slice(0, visible)
              .map((service, index) => {
                return (
                  <>
                    {/* {console.log(service)} */}
                    {service.select_spa === selectedOption ? (
                      <>
                        <tr key={index}>
                          <td>{service.service_name}</td>
                          <td>{service.therapies}</td>
                          <td>{service.price}</td>
                          <td>{service.service_time}</td>
                          <td>{service.discount}</td>
                          <td>{service.description}</td>
                          <td>
                            <AiFillDelete
                              onClick={() => {
                                deleteServices(service._id);
                              }}
                            />
                            &nbsp;&nbsp;
                            <FaEdit
                              onClick={() => {
                                setUpdatespa(index);
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
                              setUpdatespa(null);
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
                          <ServiceUpdate data={service} />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>

        <div
          className="view_more__button"
          style={{
            display: show && SpaServices.length > 10 ? "block" : "none",
          }}
        >
          <button onClick={showMoreItems}>View More</button>
        </div>
      </div>
    </div>
  );
};
export default Services;
