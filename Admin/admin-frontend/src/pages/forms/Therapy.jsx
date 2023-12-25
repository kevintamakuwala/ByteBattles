import React, { useState } from "react";
import "./forms.css";

const TherapyForm = () => {
  const [Name, setName] = useState("");
  const [Slug, setSlug] = useState("");
  const [Priority, setPriority] = useState(0);
  const [Image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Post Request Starts
  const addTherapy = async (event) => {
    event.preventDefault();

    if (!Image) {
      console.log("Please select a file");
      return;
    }

    const therapyModel = new FormData();
    therapyModel.append("Name", Name);
    therapyModel.append("Slug", Slug);
    therapyModel.append("Priority", Priority);
    therapyModel.append("imageUrl", Image);

    try {
      await fetch("http://localhost:8080/api/v1/Therapy", {
        method: "POST",
        body: therapyModel,
      });

      alert("Therapy uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  // Post Request Ends

  return (
    <>
      <div className="main-container">
        <div className="container">
          <form method="post" encType="multipart/form-data">
            <h1>Add Therapy (Category)</h1>

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority *</label>
              <input
                className="form-control"
                type="number"
                name="text"
                id="text"
                placeholder="Enter Prioriy"
                onChange={(e) => setPriority(e.target.value)}
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
                multiple="multiple"
                onChange={handleFileChange}
                accept="image/*"
              />
              <div
                className="image_preview"
                style={{
                  margin: "1rem 0",
                }}
              >
                {Image === "" || Image === null ? (
                  ""
                ) : (
                  <img
                    src={Image}
                    alt=""
                    style={{
                      width: "50%",
                    }}
                  />
                )}
              </div>
            </div>

            <button className="submit-btn" type="submit" onClick={addTherapy}>
              Add Therapy
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TherapyForm;
