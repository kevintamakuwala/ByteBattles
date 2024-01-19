// import React, { useEffect, useState } from "react";
// import "./forms.css";
// import { BASE_URL, errorNotification, successNotification } from "../../utils";
// import { ToastContainer } from "react-toastify";

// const TestcaseForm = () => {
//   const [input, setInput] = useState("");
//   const [expectedOutput, setExpectedOutput] = useState("");
//   //   const [difficultyLevel, setDifficultyLevel] = useState("");


//   // Getting problem details
//   const [problemData, setProblemData] = useState([]);

//   const getProblem = () => {
//     const requestOption = {
//       method: "GET",
//       header: { "Content-Type": "application/json" },
//     };
//     fetch(`${BASE_URL}/problems/`, requestOption)
//       .then((res) => res.json())
//       .then((data) => setProblemData(data))
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     getProblem();
//   }, []);

//   // Post Request Starts
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const problemData = {
//       input,
//       expectedOutput,
//     };

//     try {
//       await fetch(`${BASE_URL}/problems`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(problemData),
//       });
//       successNotification("Problem uploaded successfully");
//     } catch (error) {
//       errorNotification("Error uploading Problem");
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="container">
//         <form method="post" onSubmit={handleSubmit}>
//           <ToastContainer />
//           <h1>Add Testcase</h1>
//           <div className="form-group">
//             <label htmlFor="input">Input *</label>
//             <input
//               className="form-control"
//               type="text"
//               name="input"
//               id="input"
//               placeholder="Enter Input"
//               required
//               autoComplete="off"
//               onChange={(e) => setInput(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="expectedOutput">Expected Output *</label>
//             <input
//               className="form-control"
//               type="text"
//               name="expectedOutput"
//               id="expectedOutput"
//               placeholder="Enter Expected Output"
//               required
//               autoComplete="off"
//               onChange={(e) => setExpectedOutput(e.target.value)}
//             />
//           </div>

//           <button className="submit-btn" onClick={handleSubmit} type="submit">
//             Add Testcase
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TestcaseForm;
import React from 'react'

const TestcaseForm = () => {
  return (
    <div>TestcaseForm</div>
  )
}

export default TestcaseForm