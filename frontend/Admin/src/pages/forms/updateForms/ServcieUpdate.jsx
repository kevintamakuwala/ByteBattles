import React, { useEffect, useState } from "react";
import "../forms.css";
import axios from "axios";

const ServiceUpdate = (props) => {
  const [selectSpa, setSelectSpa] = useState(props.data.select_spa);
  const [serviceName, setServiceName] = useState(props.data.service_name);
  const [serviceTime, setServiceTime] = useState(props.data.service_time);
  const [description, setDescription] = useState(props.data.description);
  const [price, setPrice] = useState(props.data.price);
  const [discount, setDiscount] = useState(props.data.discount);
  const [therapy, setTherapy] = useState(props.data.therapies);

  // Get therapies
  const [therapyList, setTherapyList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/therapy", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTherapyList(data.data))
      .catch((err) => console.log(err));
  }, []);
  const therapyName = therapyList.map((data) => data.Name);

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

  // PUT Request
  const patchRequest = (id) => {
    axios
      .put(`http://localhost:8080/api/v1/services/${id}`, {
        select_spa: selectSpa,
        service_name: serviceName,
        service_time: serviceTime,
        description: description,
        price: price,
        discount: discount,
        therapies: therapy,
      })
      .then((res) => {
        console.log(res.data);
        alert("Service Updated Successfully");
        
      })
      .catch((error) => {
        alert(JSON.stringify(error.response));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchRequest(props.data._id);
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Services</h1>

            <div className="form-group">
              <label htmlFor="spa">Select Spa *</label>
              <input
                className="form-control"
                type="dropdown"
                name="name"
                list="spa"
                id="name"
                placeholder="Select Spa"
                autoComplete="off"
                value={selectSpa}
                onChange={(e) => setSelectSpa(e.target.value)}
              />
              <datalist id="spa">
                <option value={""}>--select--</option>
                {SpaData.map((spa, index) => {
                  return (
                    <option key={index} value={spa.name}>
                      {spa.name}
                    </option>
                  );
                })}
              </datalist>
            </div>

            <div className="form-group">
              <label htmlFor="name">Service Name *</label>
              <input
                className="form-control"
                type="text"
                name="text"
                id="service"
                placeholder="Enter Service Name"
                autoComplete="off"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Service Time *</label>
              <input
                className="form-control"
                type="dropdown"
                list="servicetime"
                name="text"
                id="time"
                placeholder="Select Service time"
                required
                autoComplete="off"
                value={serviceTime}
                onChange={(e) => setServiceTime(e.target.value)}
              />
              <datalist id="servicetime">
                <option value="30 min" />
                <option value="45 min" />
                <option value="60 min" />
                <option value="90 min" />
                <option value="120 min" />
                <option value="180 min" />
              </datalist>
            </div>

            <div className="form-group">
              <label htmlFor="name">Description *</label>
              <input
                className="form-control"
                type="text"
                name="text"
                id="description"
                placeholder="Enter Description"
                autoComplete="off"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                className="form-control"
                type="text"
                name="text"
                id="text"
                placeholder="Enter Price"
                required
                autoComplete="off"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Discount *</label>
              <input
                className="form-control"
                type="text"
                name="discount"
                id="discount"
                placeholder="Enter Discount"
                autoComplete="off"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="therapies">Therapies (Category) *</label>
              <input
                className="form-control"
                type="dropdown"
                name="therapy"
                list="therapies"
                id="therapy"
                placeholder="Select Therapy"
                required
                autoComplete="off"
                value={therapy}
                onChange={(e) => setTherapy(e.target.value)}
              />
              <datalist id="therapies">
                <option value="">--select--</option>
                {therapyName.map((therapyname, index) => {
                  return (
                    <option value={therapyname} key={index}>
                      {therapyname}
                    </option>
                  );
                })}
              </datalist>
            </div>

            <button className="submit-btn" type="submit" onClick={handleSubmit}>
              Update Service
            </button>
            {console.log(props.data._id)}
          </form>
        </div>
      </div>
    </>
  );
};

export default ServiceUpdate;
