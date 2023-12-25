import React, { useState, useEffect} from "react";
import "./forms.css";

const AreaForm = () => {
  const [Name, setName] = useState("");
  const [Priority, setPriority] = useState(0);
  const [city, setCity] = useState("")
  const [cityId, setCityId] = useState(0)


  const addArea = async (event) => {
    event.preventDefault();

    let data = {
      name: Name,
      Priority: Priority,
      city: city,
    };
    try {
      console.log(cityId)
      console.log(data)
      await fetch(`http://localhost:8080/api/v1/cities/${cityId}/areas`, {
        method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data),
      });

      alert("Area uploaded successfully");
    } catch (error) {
      console.error("Error occured", error);
    }
  };

  
  // Getting city list
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cities", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => setCityList(data))
      .catch((err) => console.log(err));
  }, []);

  const cityData = cityList.map((data) => data.name);

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form method="post" onSubmit={addArea}>
            <h1>Add Area</h1>

            <div className="form-group">
              <label htmlFor="name">Area Name *</label>
              <input
                className="form-control"
                type="text"
                name="areaname"
                id="areaname"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              className="form-control"
              type="dropdown"
              name="city"
              list="cities"
              id="areacity"
              placeholder="Select City"
              required
              autoComplete="off"
              onChange={(e) => {
                const city = e.target.value;
                setCity(city);

                // Find the selected city object from the cities list
                const selectedCityObj = cityList.find((c) => c.name === city);

                // Set the areas for the selected city
                setCityId(selectedCityObj._id);
              }}
            />

            <datalist id="cities">
              <option value="">--select--</option>
              {cityData.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </datalist>
          </div>



            <div className="form-group">
              <label htmlFor="priority">Priority *</label>
              <input
                className="form-control"
                type="number"
                name="priority"
                id="areapriority"
                placeholder="Enter Prioriy"
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>


            <button className="submit-btn" type="submit" onSubmit={addArea}>
              Add Area
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AreaForm;
