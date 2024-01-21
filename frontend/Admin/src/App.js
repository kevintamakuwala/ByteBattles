import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/lists/Dashboard.jsx";

import Problem from "./pages/lists/Problem.jsx";
import AddProblem from "./pages/forms/addForms/AddProblem.jsx";
// import ProblemUpdate from "./pages/forms/updateForms/ProblemUpdate";



import AddTestcase from "./pages/forms/addForms/AddTestcase.jsx";
import Testcase from "./pages/lists/Testcase.jsx";
import AddContest from "./pages/forms/addForms/AddContest.jsx";
import Contest from "./pages/lists/Contest.jsx";

import Submission from "./pages/lists/Submission.jsx";

import Signin from "./pages/forms/Signin";

import Tag from "./pages/lists/Tag.jsx";
import AddTag from "./pages/forms/addForms/AddTag.jsx";

function App() {
  // if loginState is true then only display Admin content else display login form.
  const [loginState, setLoginState] = useState(true);
  return (
    <BrowserRouter>
      {!loginState ? (
        <Signin />
      ) : (
        <>
          <Sidebar />
          <div className="main__container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/problems" element={<Problem />} />
              <Route path="/addproblem" element={<AddProblem />} />

              <Route path="/contests" element={<Contest />} />
              <Route path="/addcontest" element={<AddContest />} />

              <Route path="/testcases" element={<Testcase />} />
              <Route path="/addtestcase" element={<AddTestcase />} />

              <Route path="/tags" element={<Tag />} />
              <Route path="/addtag" element={<AddTag />} />

              <Route path="/submissions" element={<Submission />} />

              <Route path="*" element={<Dashboard />} />

            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}
export default App;
