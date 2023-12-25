import React, { useEffect, useState } from "react";
import "./forms.css";

const OffersForm = () => {
  const [name, setName] = useState("");
  const [Slug, setSlug] = useState("");
  const [Priority, setPriority] = useState(null);
  const [spa, setspa] = useState("");
  const [Image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Post Request Starts
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Image) {
      console.log("Please select a file");
      return;
    }

    const offerModel = new FormData();
    offerModel.append("Name", name);
    offerModel.append("Slug", Slug);
    offerModel.append("Select_Spa", spa);
    offerModel.append("Priority", Priority);
    offerModel.append("imageUrl", Image);

    try {
      await fetch("http://localhost:8080/api/v1/Offer", {
        method: "POST",
        body: offerModel,
      });

      alert("Offer uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  // Post Request Ends

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

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form method="post" onSubmit={handleSubmit}>
            <h1>Offer</h1>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                className="form-control"
                type="text"
                name="text"
                id="name"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="slug">Slug *</label>
              <input
                className="form-control"
                type="text"
                name="text"
                id="slug"
                placeholder="Enter slug"
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Select Spa(s) *</label>
              <select
                name="spa"
                style={{ height: "fit-content" }}
                className="form-control"
                id="spas"
                onChange={(e) => setspa(e.target.value)}
                // multiple
              >
                <option disabled selected value>
                  {" "}
                  -- select a Spa --{" "}
                </option>
                {SpaData.map((spa, index) => {
                  return (
                    <option key={index} value={spa.name}>
                      {spa.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority *</label>
              <input
                className="form-control"
                type="number"
                name="number"
                id="priority"
                placeholder="Enter Priority"
                onChange={(e) => setPriority(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image *</label>
              <input
                className="form-control"
                style={{ padding: "0.5rem" }}
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
                required
              />
            </div>

            <button
              className="submit-btn"
              type="submit"
              onSubmit={handleSubmit}
            >
              Add Offer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default OffersForm;
